const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZmU4MDgyZTM4ZjgwYzI2OGM4MjY5NjMzMTliYWJiNCIsIm5iZiI6MTczMjM4NDYxMi41MDIsInN1YiI6IjY3NDIxNzY0MWNkOGMyNDNlNmJlOTAxNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Yo-EiPRFuwpFZs9EVsIVsNDKWIV9osAYJzEcScYhhtM",
  },
};

export async function fetchTMDBConfiguration() {
  const response = await fetch(
    "https://api.themoviedb.org/3/configuration",
    options,
  );
  const config = await response.json();

  return {
    baseUrl: config.images.secure_base_url,
    posterSizes: config.images.poster_sizes,
  };
}

export async function searchShowByName(searchQuery) {
  const response = await fetch(
    `https://api.themoviedb.org/3/search/tv?query=${searchQuery}&include_adult=false&language=en-US&page=1`,
    options,
  );
  const searchResults = await response.json();

  console.log(searchResults);

  return searchResults;
}

export async function fetchShowDetails(id) {
  const { baseUrl, posterSizes } = await fetchTMDBConfiguration();
  const response = await fetch(
    `https://api.themoviedb.org/3/tv/${id}?language=en-US`,
    options,
  );
  const showData = await response.json();
  const customShowData = { ...showData };

  const logosResponse = await fetch(
    `https://api.themoviedb.org/3/tv/${id}/images?language=en-US`,
    options,
  );
  const imagesData = await logosResponse.json();

  const castResponse = await fetch(
    `https://api.themoviedb.org/3/tv/${id}/aggregate_credits?language=en-US`,
    options,
  );

  const creditsData = await castResponse.json();

  customShowData.logo_path =
    imagesData.logos[0] &&
    baseUrl + posterSizes[3] + imagesData.logos[0].file_path;
  customShowData.backdrop_path =
    baseUrl + posterSizes[6] + showData.backdrop_path;
  customShowData.cast = creditsData.cast.slice(0, 5);

  customShowData.seasons = customShowData.seasons.filter(
    (season) => season.season_number !== 0 && season.episode_count > 0,
  );

  customShowData.number_of_seasons = customShowData.seasons.length;

  console.log(customShowData);

  return customShowData;
}

export async function fetchSimilarShows(id) {
  const response = await fetch(
    `https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`,
    options,
  );
  const similarShows = await response.json();

  console.log(similarShows);

  return similarShows;
}

async function fetchAndParse(url) {
  const response = await fetch(url, options);
  return await response.json();
}

export async function fetchFilters() {
  const [genresData, countries, languages] = await Promise.all([
    fetchAndParse("https://api.themoviedb.org/3/genre/tv/list?language=en"),
    fetchAndParse(
      "https://api.themoviedb.org/3/configuration/countries?language=en-US",
    ),
    fetchAndParse("https://api.themoviedb.org/3/configuration/languages"),
  ]);

  return [
    { label: "Genre", options: genresData.genres },
    { label: "Country", options: countries },
    { label: "Language", options: languages },
  ];
}

export async function fetchPopularShows(pageNum, filters) {
  let filterURL = `https://api.themoviedb.org/3/discover/tv?language=en-US&page=${pageNum}&sort_by=popularity.desc`;
  if (filters) {
    const filtersArray = Object.entries(filters);
    console.log(filtersArray);
    filtersArray.forEach((filter) => {
      filterURL += `&${filter[0]}=${filter[1]}`;
      console.log(filterURL);
    });
  }
  const shows = filters
    ? await fetchAndParse(filterURL)
    : await fetchAndParse(filterURL);
  return shows;
}

export function mapFilters(filters, searchParams) {
  const filterToApiParam = {
    Genre: "with_genres",
    Country: "with_origin_country",
    Language: "with_original_language",
  };

  const result = {};

  // searchParams {Genre : 'Comedy'}

  Object.entries(searchParams).forEach(([key, value]) => {
    const newKey = filterToApiParam[key];
    const searchFilter = filters.find((filter) => filter.label === key);
    const filterDetails = searchFilter.options.find(
      (option) => option.name === value || option.english_name === value,
    );
    console.log(filterDetails);
    const newValue =
      filterDetails.id || filterDetails.iso_3166_1 || filterDetails.iso_639_1;
    result[newKey] = newValue;
  });

  console.log(result);

  return result;
}

export async function fetchEpisodeDetails(id, season, episode) {
  return await fetchAndParse(
    `https://api.themoviedb.org/3/tv/${id}/season/${season}/episode/${episode}?append_to_response=credits&language=en-US`,
  );
}

export async function fetchSeasonEpisodes(id, season) {
  return await fetchAndParse(
    `https://api.themoviedb.org/3/tv/${id}/season/${season}?language=en-US`,
  );
}
