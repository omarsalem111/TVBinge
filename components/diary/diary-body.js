"use client";

import { useMemo } from "react";
import { BookOpen } from "lucide-react";
import { useDiary } from "../../context/diary-context";
import DiaryEntries from "./diary-entry-group";
import styles from "./diary.module.css";

// const SHORT_WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function formatDateKey(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

export default function DiaryBody({ watchMap }) {
  const { selectedDate, setSelectedDate } = useDiary();

  // Build the days array for the current month
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();
  const todayKey = formatDateKey(now);

  // const daysInMonth = useMemo(() => {
  //   const count = new Date(currentYear, currentMonth + 1, 0).getDate();
  //   const days = [];
  //   for (let d = 1; d <= count; d++) {
  //     const date = new Date(currentYear, currentMonth, d);
  //     const dateKey = formatDateKey(date);
  //     const weekday = SHORT_WEEKDAYS[date.getDay()];
  //     const entriesCount = daysMap[dateKey]?.length || 0;
  //     days.push({
  //       day: d,
  //       dateKey,
  //       weekday,
  //       entriesCount,
  //       isToday: dateKey === todayKey,
  //     });
  //   }
  //   return days;
  // }, [currentYear, currentMonth, todayKey, daysMap]);

  // const monthLabel = new Date(currentYear, currentMonth).toLocaleString(
  //   "en-US",
  //   { month: "short" },
  // );

  // Filter entries for the right column
  const filteredEntries = useMemo(() => {
    if (!selectedDate) {
      return watchMap;
    }
    return { [selectedDate]: watchMap[selectedDate] };
  }, [selectedDate, watchMap]);

  console.log("Filtered Entries", filteredEntries);

  const dateLabel = useMemo(() => {
    if (!selectedDate) return "Recent Entries";
    const [y, m, d] = selectedDate.split("-").map(Number);
    return new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    }).format(new Date(y, m - 1, d));
  }, [selectedDate]);

  return (
    <div className={styles.body}>
      {/* Left — Day Squares
      <div className={styles.daysColumn}>
        <div className={styles.daysColumnHeader}>{monthLabel}</div>
        {daysInMonth.map((dayInfo) => {
          const isSelected = dayInfo.dateKey === selectedDate;
          const hasEntries = dayInfo.entriesCount > 0;

          const classNames = [styles.daySquare];
          if (hasEntries) classNames.push(styles.daySquareHasEntries);
          if (isSelected) classNames.push(styles.daySquareSelected);
          if (dayInfo.isToday) classNames.push(styles.daySquareToday);

          return (
            <button
              key={dayInfo.dateKey}
              type="button"
              className={classNames.join(" ")}
              onClick={() =>
                setSelectedDate(isSelected ? null : dayInfo.dateKey)
              }
              title={`${dayInfo.weekday}, ${monthLabel} ${dayInfo.day}`}
            >
              <span className={styles.dayNumber}>{dayInfo.day}</span>
              <span className={styles.dayWeekday}>{dayInfo.weekday}</span>
              {hasEntries && (
                <span className={styles.entryCountBadge}>
                  {dayInfo.entriesCount}
                </span>
              )}
            </button>
          );
        })}
      </div> */}

      {/* Right — Diary Entries */}
      <div className={styles.entriesColumn}>
        {/* <div className={styles.entriesDateLabel}>{dateLabel}</div> */}
        {selectedDate && !filteredEntries[selectedDate] ? (
          <div className={styles.entriesEmpty}>
            <BookOpen size={32} />
            <p>No entries for this day</p>
          </div>
        ) : (
          Object.entries(filteredEntries).map(
            ([entryDate, showEpisodes]) => {
              console.log(entryDate, showEpisodes);
              return (
                <DiaryEntries
                  key={`${entryDate}`}
                  entryDate={entryDate}
                  showsPerEntry={showEpisodes}
                />
              );
            },
            // <DiaryEntries
            //   key={`${entryDate}`}
            //   entryDate={entryDate}
            //   showsPerEntry={showEpisodes}
            // />
          )
        )}
      </div>
    </div>
  );
}
