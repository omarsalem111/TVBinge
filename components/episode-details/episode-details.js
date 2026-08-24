import ShowPlot from "@/components/show-details/show-plot";
import { fetchEpisodeDetails } from "@/lib/api/tmdb";
import styles from "@/app/shows/[showName]/[...episode]/page.module.css";
import EpisodeHeader from "./episode-header";
import ShowCast from "../show-details/show-cast";
import EpisodeInfo from "./episode-info";

export default async function EpisodeDetails({ params }) {
  const { showName, episode } = await params;
  const showID = showName.split("-").pop();
  const episodeData = await fetchEpisodeDetails(showID, episode[0], episode[1]);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <EpisodeHeader episodeData={episodeData}></EpisodeHeader>
        <div className={styles.content}>
          <div className={styles.left}>
            <ShowPlot plot={episodeData.overview}></ShowPlot>
            <ShowCast credits={episodeData.credits}></ShowCast>
          </div>
          <div className={styles.right}>
            <EpisodeInfo
              date={episodeData.air_date}
              runtime={episodeData.runtime}
            ></EpisodeInfo>
          </div>
        </div>
      </main>
    </div>
  );
}
