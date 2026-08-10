"use client";

import { LogIn } from "lucide-react";
import styles from "./header.module.css";

export default function HomeHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.intro}>
        <h4>Hello, Omar</h4>
        <p>Explore new stuff and track your comfort shows.</p>
      </div>
      <button type="button" className={styles.primaryButton}>
        <LogIn size={16} strokeWidth={3}></LogIn>
        Login
      </button>
    </header>
  );
}
