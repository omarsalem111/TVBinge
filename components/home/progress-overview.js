import styles from "@/app/page.module.css";
import ShowPreview from "../shows/show-preview";

export default function ShowsProgress() {
  return (
    <section className={styles.showsProgress}>
      <h4>Continue Watching</h4>
      <ShowPreview></ShowPreview>
    </section>
  );
}
