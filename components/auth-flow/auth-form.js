import styles from "./auth.module.css";

export default function AuthForm({ authMode }) {
  return (
    <form className={styles.form}>
      <div className={styles.formInputs}>
        {authMode === "signup" && (
          <div className={styles.inputGroup}>
            <label>Username</label>
            <input type="text"></input>
          </div>
        )}
        <div className={styles.inputGroup}>
          <label>Email</label>
          <input type="email"></input>
        </div>
        <div className={styles.inputGroup}>
          <label>Password</label>
          <input type="password"></input>
        </div>
        {authMode === "signup" && (
          <div className={styles.inputGroup}>
            <label>Confirm Password</label>
            <input type="password"></input>
          </div>
        )}
      </div>
      <div className={styles.actionGroup}>
        {/* <button type="reset" className={styles.secondaryButton}>
            google login later
          </button> */}
        <button type="button">{authMode}</button>
      </div>
    </form>
  );
}
