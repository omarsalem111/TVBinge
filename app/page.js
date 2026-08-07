import Image from "next/image";
import styles from "./page.module.css";
import FeaturedShow from "@/components/home/featured";
import ShowsProgress from "@/components/home/progress-overview";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.intro}>
          <h4>Hello, Omar</h4>
          <p>Explore new stuff and track your comfort shows.</p>
        </div>
        <FeaturedShow></FeaturedShow>
        <ShowsProgress></ShowsProgress>
      </main>
    </div>
  );
}
