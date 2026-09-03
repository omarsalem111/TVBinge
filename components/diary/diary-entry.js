import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Eye, ArrowRight } from "lucide-react";
import episodeImageFallback from "@/assets/episode-image.jpg";
import styles from "./diary.module.css";

export default function DiaryEntry({ episodes }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [imgError, setImgError] = useState(false);
  return (
    <div className={styles.entryWrapper}>
      {/* Main slice */}
      <article
        className={
          isExpanded
            ? `${styles.sliceContainer} ${styles.active}`
            : styles.sliceContainer
        }
      >
        <Image
          src={
            !imgError
              ? episodes[0].episode.show.backdropPath
              : episodeImageFallback
          }
          alt={`${episodes[0].episode.show.name}`}
          fill
          sizes="(max-width: 1200px) 100vw, 800px"
          className={styles.bgImage}
          onError={() => setImgError(true)}
        />

        <div className={styles.overlay}>
          <div className={styles.sliceRow}>
            <div className={styles.infoGroup}>
              <Image
                src={
                  !imgError
                    ? episodes[0].episode.show.logoPath
                    : episodeImageFallback
                }
                alt={`${episodes[0].episode.show.name} logo`}
                width={144}
                height={144}
                className={styles.image}
              ></Image>
            </div>
            <button
              type="button"
              className={styles.sliceIconBtn}
              onClick={() => setIsExpanded((prev) => !prev)}
              aria-expanded={isExpanded}
              aria-label={isExpanded ? "Collapse" : "Expand"}
            >
              <ChevronDown
                size={16}
                className={
                  isExpanded ? styles.chevronIconRotated : styles.chevronIcon
                }
              />
            </button>
          </div>
        </div>
      </article>
      {/* Drawer below the entry */}
      <div
        className={`${styles.drawer} ${isExpanded ? styles.drawerOpen : ""}`}
      >
        <div className={styles.drawerContent}>
          {episodes.map((episodeEntry) => {
            // console.log("Logging Episode", episodeEntry);
            return (
              <div key={episodeEntry.episodeId} className={styles.drawerRow}>
                <div className={styles.expandedDetails}>
                  <Image
                    src={
                      !imgError
                        ? episodeEntry.episode.stillPath
                        : episodeImageFallback
                    }
                    alt={`${episodes[0].episode.show.name} logo`}
                    width={244}
                    height={80}
                    className={styles.stillImage}
                  ></Image>
                  <div className={styles.expandedInfo}>
                    <span>{`Season ${episodeEntry.episode.seasonNumber}: Episode ${episodeEntry.episode.episodeNumber}`}</span>
                    <p>{episodeEntry.episode.name}</p>
                  </div>
                </div>
                <div className={styles.expandedActions}>
                  <div className={styles.metaItem}>
                    <Eye size={16} />
                  </div>
                  <Link href={"episodeUrl"} className={`${styles.actionLink}`}>
                    <span>View Episode</span>
                    <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
