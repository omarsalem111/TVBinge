import episodeImage from "@/assets/episode-image.jpg";
import Image from "next/image";
import styles from "@/app/page.module.css";
import { Ellipsis, Eye } from "lucide-react";

export default function EpisodePreview({
  isUserProgress,
  isDiaryEntry,
  episodeNumber,
  showName,
  seasonNumber,
  episodeName,
  episodeOverview,
  imgPath,
  episodesCount,
  userEpisodesCount,
}) {
  return (
    <div className={styles.episodePreview}>
      <div className={styles.imageContainer}>
        <Image
          src={imgPath ? imgPath : episodeImage}
          alt="Episode Preview"
          width={400}
          height={144}
        ></Image>
      </div>
      <div className={styles.showData}>
        {isUserProgress || isDiaryEntry ? (
          <div className={styles.showDetails}>
            <h5>{showName}</h5>
            <p>{`Season ${seasonNumber}: Episode ${episodeNumber} — ${episodeName}`}</p>
          </div>
        ) : (
          <div className={styles.showDetails}>
            <h6>{`Episode ${episodeNumber} — ${episodeName}`}</h6>
            <p className={styles.overview}>{episodeOverview}</p>
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
