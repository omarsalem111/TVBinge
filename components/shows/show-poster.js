"use client";

import Image from "next/image";
import styles from "@/app/shows/page.module.css";
import { redirect } from "next/navigation";
import { useState } from "react";

export default function ShowPoster({
  imagePath,
  showName,
  showID,
  isSeason,
  isActive,
  seasonNumber,
  handleSeasonClick,
}) {
  const [imgError, setImgError] = useState(false);
  const classes = isActive
    ? `${styles.poster} ${styles.active}`
    : `${styles.poster}`;
  function viewFallbackImage() {
    setImgError(true);
  }
  function navigateToShowDetails() {
    const updatedShowName = showName.toLowerCase().replaceAll(" ", "-");
    const url = updatedShowName + "-" + showID;
    redirect(`shows/${url}`, "push");
  }
  return imgError ? (
    <div className={styles.fallbackImg}>
      <p>{isSeason ? `Season ${seasonNumber}` : showName}</p>
    </div>
  ) : (
    <Image
      src={imagePath}
      alt="Show Poster"
      width={144}
      height={216}
      className={classes}
      onClick={
        !isSeason
          ? navigateToShowDetails
          : () => handleSeasonClick(seasonNumber)
      }
      onError={viewFallbackImage}
    ></Image>
  );
}
