import ShowPoster from "@/components/shows/show-poster";
import styles from "@/app/shows/page.module.css";
import { fetchPopularShows } from "@/lib/api/tmdb";

export default async function PopularShows() {
  const shows = await fetchPopularShows(1);

  return (
    <div className={styles.sectionRow}>
      <h4>Popular Shows</h4>
      <div className={styles.postersRow}>
        {shows.results.map((show) => (
          <ShowPoster
            key={show.id}
            imagePath={show.poster_path}
            showName={show.original_name}
            showID={show.id}
          ></ShowPoster>
        ))}
      </div>
    </div>
  );
}
