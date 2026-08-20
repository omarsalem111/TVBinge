"use client";

import styles from "./seasons.module.css";
import ShowPoster from "../shows/show-poster";
import EpisodeList from "./episodes";
import { useState } from "react";
import SeasonsFilter from "./seasons-filter";

export default function Seasons({ showID, seasonsCount, seasons }) {
  const [seasonClicked, setSeasonClicked] = useState(null);
  const [seasonFilter, setSeasonFilter] = useState(null);

  function handleSeasonClick(seasonNumber) {
    if (seasonNumber === seasonClicked) {
      setSeasonClicked(null);
    } else {
      setSeasonClicked(seasonNumber);
    }
  }

  function handleSeasonFilter(value) {
    setSeasonFilter(parseInt(value));
  }
  return (
    <>
      <div className={styles.seasons}>
        <div className={styles.sectionHeader}>
          <h5> SEASONS ({seasonsCount})</h5>
          <SeasonsFilter
            seasons={seasons}
            seasonsCount={seasonsCount}
            isFiltered={seasonFilter}
            onSeasonFilter={handleSeasonFilter}
          ></SeasonsFilter>
        </div>

        <div className={styles.postersRow}>
          {seasons
            .filter(
              (season) =>
                seasonFilter === null ||
                seasonFilter === 0 ||
                season.season_number === seasonFilter,
            )
            .map(
              (season) =>
                season.episode_count > 0 && (
                  <ShowPoster
                    key={season.id}
                    imagePath={season.poster_path}
                    isSeason={true}
                    seasonNumber={season.season_number}
                    isActive={seasonClicked === season.season_number}
                    handleSeasonClick={handleSeasonClick}
                  ></ShowPoster>
                ),
            )}
        </div>
      </div>
      <div className={styles.seasons}>
        {seasonClicked && (
          <EpisodeList id={showID} seasonNumber={seasonClicked}></EpisodeList>
        )}
      </div>
    </>
  );
}
