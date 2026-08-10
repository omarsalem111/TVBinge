import styles from "./auth.module.css";

export default function AuthModalChanger({ authMode, changeAuthForm }) {
  return (
    <div className={styles.otherOption}>
      {authMode === "login" ? (
        <>
          <p className={styles.subtitle}>Don't have an account?</p>
          <button onClick={changeAuthForm} className={styles.secondaryButton}>
            Signup
          </button>
        </>
      ) : (
        <>
          <p className={styles.subtitle}>Already have an account?</p>
          <button onClick={changeAuthForm} className={styles.secondaryButton}>
            Login
          </button>
        </>
      )}
    </div>
  );
}
