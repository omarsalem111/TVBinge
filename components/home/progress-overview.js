import styles from "@/app/page.module.css";
import EpisodePreview from "../shows/episode-preview";
import { getUserbyID } from "@/lib/db/user";
import { getWatchedShows } from "@/lib/db/tracking";
import { fetchEpisodeDetails } from "@/lib/api/tmdb";
import Link from "next/link";

export default async function ShowsProgress() {
  const { id: userId } = await getUserbyID();
  const watchedShows = userId && (await getWatchedShows(userId));
  async function deduceUpcomingEpisodes() {
    const nextEpisodes = [];
    if (!watchedShows) return;
    for (const show of watchedShows) {
      if (show.watchedEpisodes.length > 0) {
        let lastSeasonWatched = 1;
        let lastEpisodeWatched = 1;
        show.watchedEpisodes.forEach((watched) => {
          if (
            watched.episode.seasonNumber <= lastSeasonWatched &&
            watched.episode.episodeNumber <= lastEpisodeWatched
          ) {
            return;
          } else {
            lastSeasonWatched = watched.episode.seasonNumber;
            lastEpisodeWatched = watched.episode.episodeNumber;
          }
        });
        const currentEpisode = await fetchEpisodeDetails(
          show.showId,
          lastSeasonWatched,
          lastEpisodeWatched,
        );
        const isFinal =
          currentEpisode.episode_number ===
            currentEpisode.season_episodes_count &&
          currentEpisode.season_number < currentEpisode.number_of_seasons;
        if (!isFinal) {
          const nextEpisode = await fetchEpisodeDetails(
            show.showId,
            lastSeasonWatched,
            lastEpisodeWatched + 1,
          );
          nextEpisode.refShowData.userWatchedEpisodes =
            show.watchedEpisodes.length;
          nextEpisodes.push(nextEpisode);
        }
      }
    }
    return nextEpisodes;
  }
  const nextEpisodes = await deduceUpcomingEpisodes();
  return (
    <section className={styles.showsProgress}>
      <h4>Continue Watching</h4>
      <div className={styles.postersRow}>
        {nextEpisodes &&
          nextEpisodes.map((episode, index) => (
            <Link
              key={index}
              href={`shows/${episode.refShowData.name.toLowerCase().replaceAll(" ", "-")}-${episode.refShowData.id}/${episode.season_number}/${episode.episode_number}`}
            >
              <EpisodePreview
                isUserProgress
                imgPath={episode.still_path}
                showName={episode.refShowData.name}
                episodeName={episode.name}
                seasonNumber={episode.season_number}
                episodeNumber={episode.episode_number}
                episodesCount={episode.refShowData.episodeCount}
                userEpisodesCount={episode.refShowData.userWatchedEpisodes}
              />
            </Link>
          ))}
      </div>
    </section>
  );
}
