import ShowPoster from "@/components/shows/show-poster";
import styles from "@/app/shows/page.module.css";
import { fetchPopularShows, fetchTMDBConfiguration } from "@/lib/api/tmdb";

export default async function PopularShows() {
  const { baseUrl, posterSizes } = await fetchTMDBConfiguration();
  const shows = await fetchPopularShows(1);

  return (
    <div className={styles.sectionRow}>
      <h4>Popular Shows</h4>
      <div className={styles.postersRow}>
        {/* <div className={styles.overlay}></div> */}
        {shows.results.map((show) => (
          <ShowPoster
            key={show.id}
            imagePath={baseUrl + posterSizes[6] + show.poster_path}
            showName={show.original_name}
            showID={show.id}
          ></ShowPoster>
        ))}
      </div>
    </div>
  );
}
