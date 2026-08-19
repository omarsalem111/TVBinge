import { Suspense } from "react";
import ShowDetails from "@/components/show-details/show-details";

export default async function ShowPage({ params }) {
  return (
    <Suspense>
      <ShowDetails params={params}></ShowDetails>
    </Suspense>
  );
}
