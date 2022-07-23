const API_KEY = process.env.REACT_APP_MBDB_API_KEY;
const BASE_MOVIE_URL = "https://api.themoviedb.org/3";

export interface IMovie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface IGetMovieResponse {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

//Latest movies, Top Rated Movies and Upcoming Movies.

export const getMovies = (movieType: string) => {
  return fetch(`${BASE_MOVIE_URL}/movie/${movieType}?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
};
export const getLatestMovies = () => {
  return fetch(`${BASE_MOVIE_URL}/movie/latest?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
};

interface ITv {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  name: string;
  first_air_date: string;
  vote_average: number;
  vote_count: number;
  origin_country: string[];
}
export interface IGetTvResponse {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: ITv[];
  total_pages: number;
  total_results: number;
}

export const getTvs = () => {
  return fetch(
    `${BASE_MOVIE_URL}/tv/on_the_air?api_key=${API_KEY}&region=kr`
  ).then((response) => response.json());
};

export interface ISearchResult extends IMovie {
  media_type: string;
  first_air_date?: string;
}
export interface ISearchResponse {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: ISearchResult[];
  total_pages: number;
  total_results: number;
}

export const getSearchResults = (query: string | null) => {
  return fetch(
    `${BASE_MOVIE_URL}/search/multi?api_key=${API_KEY}&region=kr&query=${query}`
  ).then((response) => response.json());
};
