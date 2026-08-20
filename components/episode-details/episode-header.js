import styles from "./episode.module.css";
import Image from "next/image";
import EpisodeActions from "./episode-actions";

export default async function EpisodeHeader({ episodeData }) {
  return (
    <article className={styles.featured}>
      <Image
        src={episodeData.still_path}
        alt="Backdrop Image"
        className={styles.backdrop}
        fill
      ></Image>
      <div className={styles.overlay}>
        <div className={styles.headerContent}>
          <div className={styles.episodeInfo}>
            <h6>{`Season ${episodeData.season_number} — Episode ${episodeData.episode_number}`}</h6>
            <h3>{episodeData.name}</h3>
          </div>
          {episodeData.logo_path ? (
            <Image
              src={episodeData.logo_path}
              alt="Show Logo"
              width={144}
              height={144}
              className={styles.logo}
            ></Image>
          ) : (
            <h2>{episodeData.name}</h2>
          )}
        </div>
        <EpisodeActions episodeData={episodeData}></EpisodeActions>
      </div>
    </article>
  );
}
