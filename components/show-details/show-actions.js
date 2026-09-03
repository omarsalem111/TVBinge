"use client";

import { Heart, Plus } from "lucide-react";
import styles from "@/components/episode-actions/episode-actions.module.css";
import DropdownElement from "../UI Elements/dropdown/dropdown";
import { useState } from "react";

export default function ShowActions({ showStatus }) {
  const [showState, setShowState] = useState(showStatus);
  async function handleShowControls(action) {}
  return (
    <div className={styles.episodeActions}>
      <div className={styles.actionGroup}>
        <DropdownElement
          action={handleShowControls}
          state={showState}
        ></DropdownElement>
        <div
          className={
            showState === "FAVORITE"
              ? `${styles.action} ${styles[showState.toLowerCase()]}`
              : styles.action
          }
        >
          <span className={styles.actionLabel}>
            {showState === "FAVORITE"
              ? "Remove from favorites"
              : "Add to Favorites"}
          </span>
          {showState ? <Heart /> : <Heart />}
        </div>
        <div
          className={
            showState === "WATCHLISTED"
              ? `${styles.action} ${styles[showState.toLowerCase()]}`
              : styles.action
          }
        >
          <span className={styles.actionLabel}>
            {showState === "WATCHLISTED"
              ? "Remove from Watchlist"
              : "Add to Watchlist"}
          </span>
          {showState ? <Plus /> : <Plus />}
        </div>
      </div>
    </div>
  );
}
