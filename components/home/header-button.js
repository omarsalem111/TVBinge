"use client";

import { useAuth } from "@/context/auth-context";
import styles from "./header.module.css";
import { LogIn, LogOut } from "lucide-react";

export default function HeaderButton({ auth, logOut }) {
  const { setIsOpen } = useAuth();

  function openModal() {
    setIsOpen(true);
  }

  return auth ? (
    <button onClick={logOut} className={styles.primaryButton}>
      <LogOut size={16} strokeWidth={3}></LogOut>
      Log Out
    </button>
  ) : (
    <button onClick={openModal} className={styles.primaryButton}>
      <LogIn size={16} strokeWidth={3}></LogIn>
      Login
    </button>
  );
}
