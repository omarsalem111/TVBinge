"use client";

import { useAuth } from "@/context/auth-context";
import Modal from "../modal/modal";
import styles from "./auth.module.css";
import AuthModalHeader from "./auth-modal-header";
import AuthModalChanger from "./auth-modal-changer";
import AuthForm from "./auth-form";

export default function AuthModal() {
  const { isOpen, setIsOpen, authMode, setAuthMode } = useAuth();

  function changeAuthForm() {
    if (authMode === "login") {
      setAuthMode("signup");
    } else {
      setAuthMode("login");
    }
  }

  function closeModal() {
    setIsOpen(false);
  }
  return (
    <Modal open={isOpen}>
      <div className={styles.main}>
        <AuthModalHeader
          authMode={authMode}
          onClose={closeModal}
        ></AuthModalHeader>
        <AuthForm authMode={authMode}></AuthForm>
        {/* <div className={styles.divider}>
          <hr />
          <h5>OR</h5>
          <hr />
        </div> */}
        <AuthModalChanger
          authMode={authMode}
          changeAuthForm={changeAuthForm}
        ></AuthModalChanger>
      </div>
    </Modal>
  );
}
