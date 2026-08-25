import styles from "./page.module.css";
import { Suspense } from "react";
import DiaryContents from "@/components/diary/diary-contents";

export default async function DiaryPage() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Suspense>
          <DiaryContents></DiaryContents>
        </Suspense>
      </main>
    </div>
  );
}
