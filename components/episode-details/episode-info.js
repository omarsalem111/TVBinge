import styles from "./episode.module.css";
import { Calendar, Clock } from "lucide-react";

export default function EpisodeInfo({ date, runtime }) {
  return (
    <div className={styles.infoContent}>
      <div className={styles.metadata}>
        <div className={styles.infoRow}>
          <Calendar size={14} />
          <h6>{date}</h6>
        </div>
        <div className={styles.infoRow}>
          <Clock size={14} />
          <h6>{`${runtime} Minutes`}</h6>
        </div>
      </div>
    </div>
  );
}
