import { getWatchHistory } from "@/lib/db/tracking";
import { getUserbyID } from "@/lib/db/user";
import EpisodePreview from "../shows/episode-preview";

export default async function DiaryContents() {
  const { id: userId, username } = await getUserbyID();
  const watchHistory = await getWatchHistory(userId);
  console.log(watchHistory);
  return (
    <>
      {userId && <h4>{`${username}'s Diary`}</h4>}
      {watchHistory.map((entry, index) => (
        <EpisodePreview
          key={index}
          isDiaryEntry
          imgPath={entry.episode.stillPath}
          showName={entry.episode.show.name}
          episodeName={entry.episode.name}
          seasonNumber={entry.episode.seasonNumber}
          episodeNumber={entry.episode.episodeNumber}
        ></EpisodePreview>
      ))}
    </>
  );
}
