"use client";

import { fetchSeasonEpisodes } from "@/lib/api/tmdb";
import { useEffect, useState } from "react";
import EpisodePreview from "../shows/episode-preview";
import styles from "./seasons.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { checkSeasonEpisodesWatched } from "@/app/actions/tracking-actions";

export default function EpisodeList({ id, seasonNumber, episodeFilter }) {
  const [seasonEpisodes, setSeasonEpisodes] = useState(null);
  const pathname = usePathname();

  useEffect(() => {
    async function fetchEpisodeList() {
      const { episodes } = await fetchSeasonEpisodes(id, seasonNumber);
      const episodesWatched = await checkSeasonEpisodesWatched(episodes);
      console.log(episodesWatched);
      setSeasonEpisodes(episodesWatched);
    }
    fetchEpisodeList();
  }, [seasonNumber]);
  return (
    seasonEpisodes && (
      <>
        <h5> EPISODES ({seasonEpisodes.length})</h5>
        <div className={styles.postersRow}>
          {seasonEpisodes
            .filter((episode) => {
              if (episodeFilter)
                return episode.episode_number === parseInt(episodeFilter);
              return episode;
            })
            .map((episode) => (
              <Link
                href={`${pathname}/${seasonNumber}/${episode.episode_number}`}
                key={episode.id}
              >
                <EpisodePreview
                  episodeNumber={episode.episode_number}
                  episodeName={episode.name}
                  episodeOverview={episode.overview}
                  episodeAirDate={episode.air_date}
                  imgPath={episode.still_path}
                  isWatched={episode.is_watched}
                ></EpisodePreview>
              </Link>
            ))}
        </div>
      </>
    )
  );
}
