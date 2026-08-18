import styles from "@/app/page.module.css";
import EpisodePreview from "../shows/episode-preview";

export default function ShowsProgress() {
  return (
    <section className={styles.showsProgress}>
      <h4>Continue Watching</h4>
      <EpisodePreview isUserProgress={true}></EpisodePreview>
    </section>
  );
}
