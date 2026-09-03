"use client";

import styles from "./diary.module.css";
import DiaryEntry from "./diary-entry";

export default function DiaryEntries({ entryDate, showsPerEntry }) {
  return (
    <div className={styles.entry}>
      <div className={styles.entriesDateLabel}>{entryDate}</div>
      {Object.entries(showsPerEntry).map(([showId, episodes]) => (
        <DiaryEntry key={showId} episodes={episodes} />
      ))}
    </div>
  );
}
