"use client";

import { createContext, useContext, useState } from "react";

const DiaryContext = createContext(null);

export function DiaryProvider({ children }) {
  const [selectedDate, setSelectedDate] = useState(null); // null = show all / "today" view

  return (
    <DiaryContext.Provider value={{ selectedDate, setSelectedDate }}>
      {children}
    </DiaryContext.Provider>
  );
}

export function useDiary() {
  const context = useContext(DiaryContext);
  if (!context) {
    throw new Error("useDiary must be used within a DiaryProvider");
  }
  return context;
}
