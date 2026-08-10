"use client";

import { useAuth } from "@/context/auth-context";
import styles from "./auth.module.css";
import { X } from "lucide-react";

export default function AuthModalHeader({ authMode }) {
  const { setIsOpen } = useAuth();

  function closeModal() {
    setIsOpen(false);
  }
  return (
    <header>
      {authMode === "login" ? (
        <div className={styles.intro}>
          <h4>Login</h4>
          <p className={styles.subtitle}>to track your shows progress.</p>
        </div>
      ) : (
        <div className={styles.intro}>
          <h4>Sign Up</h4>
          <p className={styles.subtitle}>and start tracking your tv shows.</p>
        </div>
      )}
      <button onClick={closeModal} className={styles.secondaryButton}>
        <X></X>
      </button>
    </header>
  );
}
