import styles from "./seasons.module.css";
import { SelectElement, SelectItem } from "../select/select";

export default function SeasonsFilter({
  seasons,
  seasonsCount,
  isFiltered,
  onSeasonFilter,
}) {
  const seasonsArray = Array(seasonsCount).fill(0);
  return (
    <form className={styles.filters}>
      <SelectElement
        name="season"
        id="season"
        defaultValue={"0"}
        onChange={onSeasonFilter}
      >
        <SelectItem value={"0"}>All Seasons</SelectItem>
        {seasonsArray.map((value, index) => (
          <SelectItem
            value={`${index + 1}`}
            key={index + 1}
          >{`Season ${index + 1}`}</SelectItem>
        ))}
      </SelectElement>
      <SelectElement
        name="episode"
        id="episode"
        defaultValue={"0"}
        disabled={isFiltered ? false : true}
      >
        <SelectItem value={"0"}>All Episodes</SelectItem>
        {seasons
          .filter((season) => season.season_number === isFiltered)
          .map((season) => {
            const episodesArray = Array(season.episode_count).fill(0);
            console.log(episodesArray);
            return episodesArray.map((value, index) => (
              <SelectItem
                value={`${index + 1}`}
                key={index + 1}
              >{`Episode ${index + 1}`}</SelectItem>
            ));
          })}
      </SelectElement>
    </form>
  );
}
