import episodeImage from "@/assets/episode-image.jpg";
import Image from "next/image";
import styles from "@/app/page.module.css";
import { Ellipsis, Eye } from "lucide-react";

export default function EpisodePreview({
  isUserProgress,
  episodeNumber,
  episodeName,
  episodeOverview,
  imgPath,
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
        {isUserProgress ? (
          <div className={styles.showDetails}>
            <h5>Ted Lasso</h5>
            <p>Season 4: Episode 1 — Home</p>
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
              <p>34 / 44</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
