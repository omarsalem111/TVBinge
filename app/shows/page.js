import PopularShows from "@/components/shows/popular-shows";
import styles from "./page.module.css";
import { Search } from "lucide-react";

export default function showsPage() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.header}>
          {/* <h4>Explore Shows</h4> */}
          <div className={styles.searchField}>
            <Search size={20}></Search>
            <p>Find any TV Show you want. e.g... Breaking Bad.</p>
          </div>
        </div>
        <PopularShows></PopularShows>
      </main>
    </div>
  );
}
