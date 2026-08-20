"use client";

import { ArrowRight } from "lucide-react";
import styles from "./episode.module.css";
import { redirect, useParams } from "next/navigation";

export default function EpisodeActions({ episodeData }) {
  const { showName } = useParams();
  const currentEpisode = episodeData.episode_number;
  const currentSeason = episodeData.season_number;
  const episodesCount = episodeData.season_episodes_count;
  const seasonsCount = episodeData.number_of_seasons;
  const isFinal =
    currentEpisode === episodesCount && currentSeason < seasonsCount;

  function toNextEpisode() {
    if (isFinal) {
      redirect(`/shows/${showName}/${currentSeason + 1}/1`);
    }
    redirect(`/shows/${showName}/${currentSeason}/${currentEpisode + 1}`);
  }
  return (
    <div className={styles.episodeActions}>
      <div className={styles.episodeNav} onClick={toNextEpisode}>
        {isFinal ? (
          <p>Season {currentSeason + 1}</p>
        ) : (
          <p>Episode {currentEpisode + 1}</p>
        )}
        <ArrowRight />
      </div>
    </div>
  );
}
