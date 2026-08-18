import ShowPlot from "@/components/show-details/show-plot";
import { fetchShowDetails, fetchTMDBConfiguration } from "@/lib/api/tmdb";
import styles from "./page.module.css";
import ShowHeader from "@/components/show-details/show-header";
import Seasons from "@/components/show-details/seasons";

export default async function ShowPage({ params }) {
  const { showName } = await params;
  const { baseUrl, posterSizes } = await fetchTMDBConfiguration();
  const urlArray = showName.split("-");
  const showID = urlArray[urlArray.length - 1];
  const showData = await fetchShowDetails(showID);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <ShowHeader
          bannerImg={showData.backdrop_path}
          logo={showData.logo_path}
          showName={showData.original_name}
          tagline={showData.tagline}
        ></ShowHeader>
        <ShowPlot plot={showData.overview}></ShowPlot>
        <Seasons
          showID={showData.id}
          seasonsCount={showData.number_of_seasons}
          seasons={showData.seasons}
          imgPath={baseUrl + posterSizes[6]}
        ></Seasons>
      </main>
    </div>
  );
}
