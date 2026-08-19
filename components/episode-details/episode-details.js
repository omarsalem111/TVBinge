import ShowPlot from "@/components/show-details/show-plot";
import { fetchEpisodeDetails, fetchTMDBConfiguration } from "@/lib/api/tmdb";
import styles from "@/app/shows/[showName]/[...episode]/page.module.css";
import ShowHeader from "@/components/show-details/show-header";

export default async function EpisodeDetails({ params }) {
  const { showName, episode } = await params;
  const showID = showName.split("-").pop();
  const { baseUrl, posterSizes } = await fetchTMDBConfiguration();
  const episodeData = await fetchEpisodeDetails(showID, episode[0], episode[1]);
  console.log(episodeData);
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <ShowHeader
          isEpisode
          bannerImg={baseUrl + posterSizes[6] + episodeData.still_path}
          logo={episodeData.logo_path}
          name={episodeData.name}
        ></ShowHeader>
        <ShowPlot plot={episodeData.overview}></ShowPlot>
      </main>
    </div>
  );
}
