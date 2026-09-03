"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./diary.module.css";

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1).getDay();
}

function formatDateKey(year, month, day) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

export default function DiaryCalendar({
  isOpen,
  onClose,
  onSelectDate,
  selectedDate,
  daysWithEntries,
}) {
  const now = new Date();
  const [viewYear, setViewYear] = useState(now.getFullYear());
  const [viewMonth, setViewMonth] = useState(now.getMonth());
  const popupRef = useRef(null);

  // useEffect(() => {
  //   function handleClickOutside(e) {
  //     if (popupRef.current && !popupRef.current.contains(e.target)) {
  //       onClose();
  //     }
  //   }
  //   if (isOpen) {
  //     document.addEventListener("mousedown", handleClickOutside);
  //   }
  //   return () => document.removeEventListener("mousedown", handleClickOutside);
  // }, [isOpen, onClose]);

  if (!isOpen) return null;
  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth);

  // Previous month trailing days
  const prevMonthDays = getDaysInMonth(
    viewMonth === 0 ? viewYear - 1 : viewYear,
    viewMonth === 0 ? 11 : viewMonth - 1,
  );

  const todayKey = formatDateKey(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
  );

  const monthName = new Date(viewYear, viewMonth).toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });

  function prevMonth() {
    if (viewMonth === 0) {
      setViewYear((y) => y - 1);
      setViewMonth(11);
    } else {
      setViewMonth((m) => m - 1);
    }
  }

  function nextMonth() {
    if (viewMonth === 11) {
      setViewYear((y) => y + 1);
      setViewMonth(0);
    } else {
      setViewMonth((m) => m + 1);
    }
  }

  function handleDayClick(day) {
    const dateKey = formatDateKey(viewYear, viewMonth, day);
    onSelectDate(dateKey);
  }

  // Build calendar cells
  const cells = [];

  // Previous month trailing
  for (let i = firstDay - 1; i >= 0; i--) {
    const day = prevMonthDays - i;
    cells.push({ day, type: "other" });
  }

  // Current month
  for (let d = 1; d <= daysInMonth; d++) {
    const dateKey = formatDateKey(viewYear, viewMonth, d);
    cells.push({
      day: d,
      type: "current",
      dateKey,
      hasEntries: daysWithEntries.includes(dateKey),
      isToday: dateKey === todayKey,
      isSelected: dateKey === selectedDate,
    });
  }

  // Next month leading
  const remaining = 7 - (cells.length % 7);
  if (remaining < 7) {
    for (let d = 1; d <= remaining; d++) {
      cells.push({ day: d, type: "other" });
    }
  }

  return (
    <div className={styles.calendarPopup} ref={popupRef}>
      <div className={styles.calendarHeader}>
        <button
          type="button"
          className={styles.calendarNavBtn}
          onClick={prevMonth}
          aria-label="Previous month"
        >
          <ChevronLeft size={16} />
        </button>
        <span className={styles.calendarTitle}>{monthName}</span>
        <button
          type="button"
          className={styles.calendarNavBtn}
          onClick={nextMonth}
          aria-label="Next month"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      <div className={styles.calendarWeekdays}>
        {WEEKDAYS.map((wd) => (
          <span key={wd} className={styles.calendarWeekday}>
            {wd}
          </span>
        ))}
      </div>

      <div className={styles.calendarDays}>
        {cells.map((cell, i) => {
          if (cell.type === "other") {
            return (
              <span
                key={`other-${i}`}
                className={`${styles.calendarDay} ${styles.calendarDayOtherMonth}`}
              >
                {cell.day}
              </span>
            );
          }

          const classNames = [styles.calendarDay];
          if (cell.hasEntries) classNames.push(styles.calendarDayHasEntries);
          if (cell.isSelected) classNames.push(styles.calendarDaySelected);
          if (cell.isToday) classNames.push(styles.calendarDayToday);

          return (
            <button
              key={cell.dateKey}
              type="button"
              className={classNames.join(" ")}
              onClick={() => handleDayClick(cell.day)}
            >
              {cell.day}
            </button>
          );
        })}
      </div>
    </div>
  );
}
