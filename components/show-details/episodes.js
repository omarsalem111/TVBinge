"use client";

import { fetchSeasonEpisodes } from "@/lib/api/tmdb";
import { useEffect, useState } from "react";
import EpisodePreview from "../shows/episode-preview";
import styles from "./show-details.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function EpisodeList({ id, seasonNumber, baseUrl, sizes }) {
  const [seasonEpisodes, setSeasonEpisodes] = useState(null);
  const pathname = usePathname();

  useEffect(() => {
    async function fetchEpisodeList() {
      const episodes = await fetchSeasonEpisodes(id, seasonNumber);
      console.log(episodes);
      setSeasonEpisodes(episodes);
    }
    fetchEpisodeList();
  }, [seasonNumber]);
  return (
    seasonEpisodes && (
      <>
        <h5> EPISODES ({seasonEpisodes.episodes.length})</h5>
        <div className={styles.postersRow}>
          {seasonEpisodes.episodes.map((episode) => (
            <Link href={`${pathname}/${episode.id}`} key={episode.id}>
              <EpisodePreview
                episodeNumber={episode.episode_number}
                episodeName={episode.name}
                episodeOverview={episode.overview}
                imgPath={baseUrl + sizes[6] + episode.still_path}
              ></EpisodePreview>
            </Link>
          ))}
        </div>
      </>
    )
  );
}
