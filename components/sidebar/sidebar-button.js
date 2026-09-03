"use client";

import { useAuth } from "@/context/auth-context";
import styles from "./sidebar.module.css";
import { LogIn, LogOut } from "lucide-react";

export default function SidebarButton({ auth, logOut }) {
  const { setIsOpen } = useAuth();

  function openModal() {
    setIsOpen(true);
  }

  return auth.id ? (
    <button onClick={logOut} className={styles.secondaryButton}>
      <LogOut size={16} strokeWidth={3}></LogOut>
    </button>
  ) : (
    <button onClick={openModal} className={styles.primaryButton}>
      Login <LogIn size={16} strokeWidth={3}></LogIn>
    </button>
  );
}
