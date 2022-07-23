const API_KEY = process.env.REACT_APP_MBDB_API_KEY;
const BASE_MOVIE_URL = "https://api.themoviedb.org/3";

interface IMovie {
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

export const getMovies = () => {
  return fetch(
    `${BASE_MOVIE_URL}/movie/now_playing?api_key=${API_KEY}&region=kr`
  ).then((response) => response.json());
};

export const getSearchResults = (query: string) => {
  return fetch(
    `${BASE_MOVIE_URL}/search/multi?api_key=${API_KEY}&region=kr&query=${query}`
  ).then((response) => response.json());
};
