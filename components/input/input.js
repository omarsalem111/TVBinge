import styles from "./input.module.css";

export default function Input({ label, name, type, state, placeholder }) {
  return (
    <div className={styles.inputGroup}>
      {label && <label htmlFor={name}>{label}</label>}
      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        required
      ></input>
      {state && <p className={styles.errorMsg}>{state}</p>}
    </div>
  );
}
