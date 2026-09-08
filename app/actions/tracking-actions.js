"use server";

import {
  addEpisodes,
  addOrUpdateEpisode,
  addOrUpdateShow,
} from "@/lib/db/shows";
import {
  addEpisodeToWatched,
  deleteUserEpisodeEntry,
  deleteUserShow,
  getWatchedState,
  markShowCompleted,
} from "@/lib/db/tracking";
import { getUserbyID } from "@/lib/db/user";
import { fetchSeasonEpisodes } from "@/lib/api/tmdb";

export async function markEpisodeAsWatched(
  id,
  seasonNumber,
  episodeNumber,
  name,
  stillPath,
  showData,
) {
  const { id: userID } = await getUserbyID();

  if (!userID) {
    return;
  }

  const showUpsert = await addOrUpdateShow(showData);

  if (!showUpsert) {
    return;
  }

  const episodeUpsert = await addOrUpdateEpisode(
    id,
    showData.id,
    seasonNumber,
    episodeNumber,
    name,
    stillPath,
  );

  if (!episodeUpsert) {
    return;
  }

  const episodeWatched = await addEpisodeToWatched(userID, showData.id, id);

  if (!episodeWatched) {
    return;
  }

  return true;
}

export async function removeEpisodeFromWatched(id, showId) {
  const { id: userID } = await getUserbyID();

  if (!userID) {
    return;
  }

  await deleteUserEpisodeEntry(userID, showId, id);
}

export async function removeShowFromWatched(userId, showId) {
  await deleteUserShow(userId, showId);
}

export async function checkSeasonEpisodesWatched(episodes) {
  const { id: userID } = await getUserbyID();

  if (!userID) {
    return;
  }

  const watchedEpisodes = [];

  for (const episode of episodes) {
    const isWatched = await getWatchedState(
      userID,
      episode.show_id,
      episode.id,
    );
    watchedEpisodes.push({ ...episode, is_watched: isWatched ? true : false });
  }

  return watchedEpisodes;
}

export async function markShowAsCompleted(userId, showId, showData) {
  const showUpsert = await addOrUpdateShow({
    id: showId,
    name: showData.name,
    posterPath: showData.poster_path,
    logoPath: showData.logo_path,
    backdropPath: showData.backdrop_path,
  });

  if (!showUpsert) {
    return;
  }

  const seasonsData = await Promise.all(
    showData.seasons.map((season) =>
      fetchSeasonEpisodes(showId, season.season_number),
    ),
  );

  const episodesToInsert = [];
  for (const seasonData of seasonsData) {
    for (const ep of seasonData.episodes) {
      episodesToInsert.push({
        id: ep.id,
        showId,
        seasonNumber: ep.season_number,
        episodeNumber: ep.episode_number,
        name: ep.name,
        stillPath: ep.still_path,
      });
    }
  }

  await addEpisodes(episodesToInsert);

  const episodeIds = episodesToInsert.map((ep) => ep.id);

  await markShowCompleted(userId, showId, episodeIds);

  return true;
}
