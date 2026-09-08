"use client";

import episodeImage from "@/assets/episode-image.jpg";
import Image from "next/image";
import styles from "@/app/page.module.css";
import { Ellipsis, Eye } from "lucide-react";
import { useState } from "react";

export default function EpisodePreview({
  isUserProgress,
  isDiaryEntry,
  isWatched,
  episodeNumber,
  showName,
  seasonNumber,
  episodeName,
  episodeAirDate,
  episodeOverview,
  imgPath,
  episodesCount,
  userEpisodesCount,
}) {
  const episodeDate = new Date(episodeAirDate);
  const todayDate = new Date();
  const notAiredYet = episodeDate >= todayDate;
  const altDescription =
    notAiredYet || !episodeOverview || episodeOverview === "";
  const [imgError, setImgError] = useState(false);
  function viewFallbackImage() {
    setImgError(true);
  }
  return (
    <div className={styles.episodePreview}>
      <div className={styles.imageContainer}>
        {imgError ? (
          <div className={styles.fallbackImg}></div>
        ) : (
          <Image
            src={imgPath ? imgPath : episodeImage}
            alt="Episode Preview"
            className={isWatched ? styles.greyedOut : undefined}
            width={400}
            height={144}
            onError={viewFallbackImage}
          ></Image>
        )}
      </div>
      <div className={styles.showData}>
        {isUserProgress || isDiaryEntry ? (
          <div className={styles.showDetails}>
            <h5>{showName}</h5>
            <p>{`Season ${seasonNumber}: Episode ${episodeNumber} — ${episodeName}`}</p>
          </div>
        ) : (
          <div className={styles.showDetails}>
            <div className={styles.episodeTitle}>
              <h6>{`Episode ${episodeNumber} — ${episodeName}`}</h6>
              {isWatched && <Eye size={16}></Eye>}
            </div>
            <p className={styles.overview}>
              {altDescription ? `Airing on ${episodeAirDate}` : episodeOverview}
            </p>
          </div>
        )}
        {isUserProgress && (
          <div className={styles.showActions}>
            <Ellipsis size={20}></Ellipsis>
            <div className={styles.episodeCount}>
              <Eye size={16}></Eye>
              <p>
                {userEpisodesCount} / {episodesCount}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
