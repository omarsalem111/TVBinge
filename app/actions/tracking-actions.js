"use server";

import { addOrUpdateEpisode, addOrUpdateShow } from "@/lib/db/shows";
import { addToWatched, deleteUserEpisodeEntry } from "@/lib/db/tracking";
import { getUserbyID } from "@/lib/db/user";

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

  const episodeWatched = await addToWatched(userID, id);

  if (!episodeWatched) {
    return;
  }

  return true;
}

export async function removeEpisodeFromWatched(id) {
  const { id: userID } = await getUserbyID();

  if (!userID) {
    return;
  }

  await deleteUserEpisodeEntry(userID, id);
}
