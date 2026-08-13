"use client";

import { authUser } from "@/app/actions/auth-actions";
import styles from "./auth.module.css";
import { useActionState } from "react";
import Input from "../input/input";

export default function AuthForm({ authMode }) {
  const authAction = authUser.bind(null, authMode);
  const [state, formAction, pending] = useActionState(authAction, {
    errors: "",
  });
  return (
    <form className={styles.form} action={formAction}>
      <div className={styles.formInputs}>
        {authMode === "signup" && (
          <Input
            label={"Username"}
            name={"username"}
            type={"text"}
            state={state?.errors?.username}
          ></Input>
        )}
        <Input
          label={"Email"}
          name={"email"}
          type={"email"}
          state={state?.errors?.email}
        ></Input>
        <Input
          label={"Password"}
          name={"password"}
          type={"password"}
          state={state?.errors?.password}
        ></Input>
        {authMode === "signup" && (
          <Input
            label={"Confirm Password"}
            name={"confirmPassword"}
            type={"password"}
            state={state?.errors?.confirmPassword}
          ></Input>
        )}
      </div>
      <div className={styles.actionGroup}>
        <button type="submit">{authMode}</button>
      </div>
    </form>
  );
}
