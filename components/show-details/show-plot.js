import styles from "./show-details.module.css";

export default function ShowPlot({ plot }) {
  return (
    <div className={styles.infoContent}>
      <h5>PLOT</h5>
      <p>{plot}</p>
    </div>
  );
}
