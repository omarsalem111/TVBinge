import styles from "./page.module.css";
import FeaturedShow from "@/components/home/featured";
import HomeHeader from "@/components/home/header";
import ShowsProgress from "@/components/home/progress-overview";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <HomeHeader></HomeHeader>
        <FeaturedShow></FeaturedShow>
        <ShowsProgress></ShowsProgress>
      </main>
    </div>
  );
}
