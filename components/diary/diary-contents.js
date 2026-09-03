import { getWatchHistory } from "@/lib/db/tracking";
import { getUserbyID } from "@/lib/db/user";
import { DiaryProvider } from "../../context/diary-context";
import DiaryHeader from "./diary-header";
import DiaryBody from "./diary-body";
import DiaryStats from "./diary-stats";
import styles from "./diary.module.css";

function formatDateKey(date) {
  const d = new Date(date);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function computeStreaks(watchHistory) {
  if (watchHistory.length === 0) {
    return { currentStreak: 0, longestStreak: 0 };
  }

  const dateSet = new Set();
  watchHistory.forEach((entry) => dateSet.add(formatDateKey(entry.watchedAt)));

  const sortedDates = [...dateSet].sort();

  let longestStreak = 1;
  let currentRun = 1;

  for (let i = 1; i < sortedDates.length; i++) {
    const prev = new Date(sortedDates[i - 1]);
    const curr = new Date(sortedDates[i]);
    const diffDays = Math.round((curr - prev) / (1000 * 60 * 60 * 24));
    if (diffDays === 1) {
      currentRun++;
      longestStreak = Math.max(longestStreak, currentRun);
    } else {
      currentRun = 1;
    }
  }

  // Compute current streak (from today backwards)
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  let currentStreak = 0;
  let checkDate = new Date(today);

  // Also check today
  while (true) {
    const key = formatDateKey(checkDate);
    if (dateSet.has(key)) {
      currentStreak++;
      checkDate.setDate(checkDate.getDate() - 1);
    } else {
      break;
    }
  }

  return { currentStreak, longestStreak };
}

function buildDaysMap(watchHistory) {
  const map = {};
  watchHistory.forEach((entry) => {
    const key = formatDateKey(new Date(entry.watchedAt));
    if (!map[key]) {
      map[key] = [];
    }
    map[key].push(entry);
  });
  const mapEntries = Object.entries(map);
  const mappedArray = mapEntries.map(([key, value]) => {
    const valueObject = { ...Object.groupBy(value, ({ showId }) => showId) };
    return [key, valueObject];
  });
  const daysShowsMap = Object.fromEntries(mappedArray);
  return daysShowsMap;
}

export default async function DiaryContents() {
  const { id: userId, username } = await getUserbyID();
  const watchHistory = await getWatchHistory(userId);
  const totalEntries = watchHistory.length;
  const { currentStreak, longestStreak } = computeStreaks(watchHistory);
  const daysShowsMap = buildDaysMap(watchHistory);
  const daysWithEntriesArray = Object.keys(daysShowsMap);
  console.log(daysWithEntriesArray);

  return (
    <DiaryProvider>
      <div className={styles.diaryLayout}>
        <DiaryHeader
          username={username}
          daysWithEntriesArray={daysWithEntriesArray}
        />
        <DiaryBody watchMap={daysShowsMap} />
        {/* <DiaryStats
          currentStreak={currentStreak}
          longestStreak={longestStreak}
        /> */}
      </div>
    </DiaryProvider>
  );
}
