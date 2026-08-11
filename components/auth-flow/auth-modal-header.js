"use client";

import styles from "./auth.module.css";
import { X } from "lucide-react";

export default function AuthModalHeader({ authMode, onClose }) {
  return (
    <header>
      {authMode === "login" ? (
        <div className={styles.intro}>
          <h4>Login</h4>
          <p className={styles.subtitle}>to track your shows progress.</p>
        </div>
      ) : (
        <div className={styles.intro}>
          <h4>Create an Account</h4>
          <p className={styles.subtitle}>and start tracking your tv shows.</p>
        </div>
      )}
      <button onClick={onClose} className={styles.secondaryButton}>
        <X></X>
      </button>
    </header>
  );
}
