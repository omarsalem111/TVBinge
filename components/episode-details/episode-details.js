import ShowPlot from "@/components/show-details/show-plot";
import { fetchEpisodeDetails, fetchShowDetails } from "@/lib/api/tmdb";
import styles from "@/app/shows/[showName]/[...episode]/page.module.css";
import EpisodeHeader from "./episode-header";
import ShowCast from "../show-details/show-cast";

export default async function EpisodeDetails({ params }) {
  const { showName, episode } = await params;
  const showID = showName.split("-").pop();
  const showData = await fetchShowDetails(showID);
  const episodeData = await fetchEpisodeDetails(showID, episode[0], episode[1]);
  episodeData.number_of_seasons = showData.number_of_seasons;
  episodeData.season_episodes_count = showData.seasons.filter(
    (season) => season.season_number === parseInt(episode[0]),
  )[0].episode_count;
  episodeData.next_season = showData.seasons.filter(
    (season) => season.season_number === parseInt(episode[0]) + 1,
  )[0];
  console.log("Printed in Episode Details", showData);
  console.log("Printed in Episode Details", episodeData);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <EpisodeHeader episodeData={episodeData}></EpisodeHeader>
        <ShowPlot plot={episodeData.overview}></ShowPlot>
        <ShowCast credits={episodeData.credits}></ShowCast>
      </main>
    </div>
  );
}
