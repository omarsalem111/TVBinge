"use client";

import { useAuth } from "@/context/auth-context";
import Modal from "../modal/modal";
import LoginPage from "./login";
import { useState } from "react";
import SignupPage from "./signup";

export default function AuthModal() {
  const { isOpen } = useAuth();
  const [authMode, setAuthMode] = useState("login");

  function changeAuthForm() {
    if (authMode === "login") {
      setAuthMode("signup");
    } else {
      setAuthMode("login");
    }
  }
  return (
    <Modal open={isOpen}>
      {authMode === "login" ? (
        <LoginPage
          authMode={authMode}
          changeAuthForm={changeAuthForm}
        ></LoginPage>
      ) : (
        <SignupPage
          authMode={authMode}
          changeAuthForm={changeAuthForm}
        ></SignupPage>
      )}
    </Modal>
  );
}
