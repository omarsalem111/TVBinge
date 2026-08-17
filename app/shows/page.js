import PopularShows from "@/components/shows/popular-shows";
import styles from "./page.module.css";
import SearchField from "@/components/search-field/search-field";
import { fetchTMDBConfiguration } from "@/lib/api/tmdb";

export default async function showsPage() {
  const { baseUrl, posterSizes } = await fetchTMDBConfiguration();
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.header}>
          <SearchField baseUrl={baseUrl} posterSizes={posterSizes} />
        </div>
        <PopularShows></PopularShows>
      </main>
    </div>
  );
}
