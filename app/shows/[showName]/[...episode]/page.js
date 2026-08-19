import EpisodeDetails from "@/components/episode-details/episode-details";
import { Suspense } from "react";

export default async function EpisodePage({ params }) {
  return (
    <Suspense>
      <EpisodeDetails params={params}></EpisodeDetails>
    </Suspense>
  );
}
