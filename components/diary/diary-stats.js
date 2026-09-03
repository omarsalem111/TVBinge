import { Flame, Trophy } from "lucide-react";
import styles from "./diary.module.css";

export default function DiaryStats({ currentStreak, longestStreak }) {
  const stats = [
    {
      icon: <Flame />,
      label: "Current Streak",
      value: currentStreak,
    },
    {
      icon: <Trophy />,
      label: "Longest Streak",
      value: longestStreak,
    },
  ];

  return (
    <div className={styles.statsRow}>
      {stats.map((stat) => (
        <div key={stat.label} className={styles.statCard}>
          <h6>{stat.label}</h6>
          <div className={styles.statInfo}>
            <div className={styles.statIcon}>{stat.icon}</div>
            <span className={styles.statValue}>{stat.value}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
