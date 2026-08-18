"use client";
import { Search } from "lucide-react";
import styles from "./search.module.css";
import { searchShowByName } from "@/lib/api/tmdb";
import { useEffect, useState } from "react";
import ShowPoster from "../shows/show-poster";

export default function SearchField({ baseUrl, posterSizes }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [results, setResults] = useState(null);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500);

    return () => clearTimeout(timeOut);
  }, [searchQuery]);

  useEffect(() => {
    async function fetchSearchResults() {
      if (debouncedQuery) {
        const fetchedShows = await searchShowByName(debouncedQuery);
        console.log(fetchedShows);
        setResults(fetchedShows);
      } else {
        setResults(null);
      }
    }

    fetchSearchResults();
  }, [debouncedQuery]);

  function handleSearch(event) {
    setSearchQuery(event.target.value);
  }

  return (
    <div className={styles.searchResults}>
      <form className={styles.searchField}>
        <Search size={20}></Search>
        <input
          name="showName"
          id="showName"
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Find any TV Show you want. e.g... Breaking Bad."
        />
        {/* <button type="submit">Search</button> */}
      </form>
      {results && (
        <div className={styles.sectionRow}>
          <h4>{`You searched for: ${debouncedQuery}`}</h4>
          <div className={styles.postersRow}>
            {/* <div className={styles.overlay}></div> */}
            {results.results.map((show) => (
              <ShowPoster
                key={show.id}
                imagePath={baseUrl + posterSizes[6] + show.poster_path}
                showName={show.original_name}
                showID={show.id}
              ></ShowPoster>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
