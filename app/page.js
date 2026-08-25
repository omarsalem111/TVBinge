import styles from "./page.module.css";
import FeaturedShow from "@/components/home/featured";
import HomeHeader from "@/components/home/header";
import ShowsProgress from "@/components/home/progress-overview";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Suspense fallback={<p>Please Wait...</p>}>
          <HomeHeader></HomeHeader>
          <FeaturedShow></FeaturedShow>
          <ShowsProgress></ShowsProgress>
        </Suspense>
      </main>
    </div>
  );
}
