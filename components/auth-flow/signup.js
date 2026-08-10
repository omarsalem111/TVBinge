import styles from "./auth.module.css";
import { Mail } from "lucide-react";
import AuthModalHeader from "./auth-modal-header";
import AuthModalChanger from "./auth-modal-changer";

export default function SignupPage({ authMode, changeAuthForm }) {
  return (
    <div className={styles.main}>
      <AuthModalHeader authMode={authMode}></AuthModalHeader>
      <form className={styles.form}>
        <div className={styles.formInputs}>
          <div className={styles.inputGroup}>
            <label>Email</label>
            <input type="email"></input>
          </div>
          <div className={styles.inputGroup}>
            <label>Password</label>
            <input type="password"></input>
          </div>
        </div>
        <div className={styles.actionGroup}>
          <button type="reset" className={styles.secondaryButton}>
            Reset
          </button>
          <button type="button">Signup</button>
        </div>
      </form>
      <div className={styles.divider}>
        <hr />
        <h5>OR</h5>
        <hr />
      </div>
      <AuthModalChanger
        authMode={authMode}
        changeAuthForm={changeAuthForm}
      ></AuthModalChanger>
      {/* <button>
        <Mail></Mail>Continue Using Google "later"
      </button> */}
    </div>
  );
}
