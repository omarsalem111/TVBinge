"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import styles from "./modal.module.css";
import { useAuth } from "@/context/auth-context";

export default function Modal({ children, open }) {
  const dialog = useRef();
  const { setIsOpen } = useAuth();

  useEffect(() => {
    if (open) {
      dialog.current.showModal();
    } else {
      dialog.current.close();
    }
  }, [open]);

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <dialog ref={dialog} onClose={closeModal} className={styles.modal}>
      {children}
    </dialog>
  );
}
