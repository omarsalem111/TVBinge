import ShowPlot from "@/components/show-details/show-plot";
import { fetchShowDetails } from "@/lib/api/tmdb";
import styles from "@/app/shows/[showName]/page.module.css";
import ShowHeader from "@/components/show-details/show-header";
import Seasons from "@/components/seasons/seasons";

export default async function ShowDetails({ params }) {
  const { showName } = await params;
  const showID = showName.split("-").pop();
  const showData = await fetchShowDetails(showID);
  console.log(showData);
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <ShowHeader
          bannerImg={showData.backdrop_path}
          logo={showData.logo_path}
          showName={showData.original_name}
        ></ShowHeader>
        <ShowPlot plot={showData.overview}></ShowPlot>
        <Seasons
          showID={showData.id}
          seasonsCount={showData.number_of_seasons}
          seasons={showData.seasons}
        ></Seasons>
      </main>
    </div>
  );
}
