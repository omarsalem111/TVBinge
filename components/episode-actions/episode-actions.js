"use client";

import { ArrowRight, EyeClosed, Eye, Heart, Plus } from "lucide-react";
import styles from "./episode-actions.module.css";
import { redirect, useParams } from "next/navigation";
import {
  markEpisodeAsWatched,
  removeEpisodeFromWatched,
} from "@/app/actions/tracking-actions";
import { useState } from "react";
import DropdownElement from "../UI Elements/dropdown/dropdown";

export default function EpisodeActions({ episodeData, watched }) {
  const { showName } = useParams();
  const [isWatched, setIsWatched] = useState(watched ? true : false);
  const currentEpisode = episodeData.episode_number;
  const currentSeason = episodeData.season_number;
  const episodesCount = episodeData.season_episodes_count;
  const seasonsCount = episodeData.number_of_seasons;
  const isFinal =
    currentEpisode === episodesCount && currentSeason < seasonsCount;

  async function markWatched() {
    setIsWatched((prevState) => !prevState);
    if (!isWatched) {
      await markEpisodeAsWatched(
        episodeData.id,
        currentSeason,
        currentEpisode,
        episodeData.name,
        episodeData.still_path,
        episodeData.refShowData,
      );
    } else {
      await removeEpisodeFromWatched(
        episodeData.id,
        episodeData.refShowData.id,
      );
    }
  }

  function toNextEpisode() {
    if (isFinal) {
      redirect(`/shows/${showName}/${currentSeason + 1}/1`);
    }
    redirect(`/shows/${showName}/${currentSeason}/${currentEpisode + 1}`);
  }
  return (
    <div className={styles.episodeActions}>
      <div className={styles.actionGroup}>
        <div
          className={
            isWatched ? `${styles.action} ${styles.watched}` : styles.action
          }
          onClick={markWatched}
        >
          <span className={styles.actionLabel}>
            {isWatched ? "Remove from Watched" : "Mark as Watched"}
          </span>
          {isWatched ? <Eye /> : <EyeClosed />}
        </div>
        {/* <DropdownElement
          action={markWatched}
          activeIcon={<Eye />}
          inactiveIcon={<EyeClosed />}
          state={isWatched}
        ></DropdownElement> */}
        {/* <DropdownElement
          action={markWatched}
          activeIcon={<Heart />}
          inactiveIcon={<Heart />}
        ></DropdownElement> */}
        {/* <DropdownElement
          action={markWatched}
          activeIcon={<Plus />}
          inactiveIcon={<Plus />}
        ></DropdownElement> */}
      </div>
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
