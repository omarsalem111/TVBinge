"use client";

import { useState } from "react";
import { CalendarDays, RotateCcw } from "lucide-react";
import { useDiary } from "../../context/diary-context";
import DiaryCalendar from "./diary-calendar";
import styles from "./diary.module.css";

export default function DiaryHeader({ username, daysWithEntriesArray }) {
  const { selectedDate, setSelectedDate } = useDiary();
  const [calendarOpen, setCalendarOpen] = useState(false);

  function handleSelectDate(dateKey) {
    setSelectedDate(dateKey);
  }

  function handleToday() {
    setSelectedDate(null);
    setCalendarOpen(false);
  }

  return (
    <div className={styles.header}>
      <h4>{`${username}'s Diary`}</h4>
      <div className={styles.headerActions}>
        {selectedDate && (
          <button
            type="button"
            className={styles.textButton}
            onClick={handleToday}
            aria-label="Reset to recent"
          >
            Reset View
            <RotateCcw size={14} />
          </button>
        )}
        <div className={styles.calendarWrapper}>
          <button
            type="button"
            className={
              selectedDate
                ? `${styles.iconButton} ${styles.active}`
                : styles.iconButton
            }
            onClick={() => setCalendarOpen((prev) => !prev)}
            aria-label="Open calendar"
          >
            <CalendarDays size={18} />
          </button>
          <DiaryCalendar
            isOpen={calendarOpen}
            onClose={() => setCalendarOpen(false)}
            onSelectDate={handleSelectDate}
            selectedDate={selectedDate}
            daysWithEntries={daysWithEntriesArray}
          />
        </div>
      </div>
    </div>
  );
}
