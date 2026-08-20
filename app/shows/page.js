import PopularShows from "@/components/shows/popular-shows";
import styles from "./page.module.css";
import SearchField from "@/components/search-field/search-field";

export default async function showsPage() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.header}>
          <SearchField />
        </div>
        <PopularShows></PopularShows>
      </main>
    </div>
  );
}
