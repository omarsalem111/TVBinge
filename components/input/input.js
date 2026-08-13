import styles from "./input.module.css";

export default function Input({ label, name, type, state }) {
  return (
    <div className={styles.inputGroup}>
      <label htmlFor={name}>{label}</label>
      <input type={type} id={name} name={name} required></input>
      {state && <p className={styles.errorMsg}>{state}</p>}
    </div>
  );
}
