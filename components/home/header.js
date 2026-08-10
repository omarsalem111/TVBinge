"use client";

import { LogIn } from "lucide-react";
import styles from "./header.module.css";
import { useAuth } from "@/context/auth-context";

export default function HomeHeader() {
  const { setIsOpen } = useAuth();

  function openModal() {
    setIsOpen(true);
  }
  return (
    <header className={styles.header}>
      <div className={styles.intro}>
        <h4>Hello, Omar</h4>
        <p>Explore new stuff and track your comfort shows.</p>
      </div>
      <button onClick={openModal} className={styles.primaryButton}>
        <LogIn size={16} strokeWidth={3}></LogIn>
        Login
      </button>
    </header>
  );
}
