const BASE_COIN_URL = 'https://api.coinpaprika.com/v1';

export const fetchCoins = () => 
	fetch(`${BASE_COIN_URL}/coins`)
	.then((response) => response.json())

export const fetchCoinInfo = (coinId:string|undefined) => 
	fetch(`${BASE_COIN_URL}/coins/${coinId}`)
	.then((response) => response.json())

export const fetchCoinTicker = (coinId:string|undefined) => 
	fetch(`${BASE_COIN_URL}/tickers/${coinId}`)
	.then((response) => response.json())

// export const fetchCoinHistoty = (coinId:string|undefined) => {
// 	const endDate = Math.floor(Date.now() / 1000);
// 	const startDate = endDate - (60 * 60 * 24); // 1 day
// 	return fetch(`${BASE_COIN_URL}/coins/${coinId}/ohlcv/historical?start=${startDate}&end=${endDate}`)
// 	.then((response) => response.json());
// }

export const fetchCoinHistoty = (coinId:string|undefined) => {
	return fetch(`https://ohlcv-api.nomadcoders.workers.dev/?coinId=${coinId}`)
	.then((response) => response.json());
}

const API_KEY = "8085723c946b2ce88e4e4cebe7844b61";
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
		maximum: string,
		minimum: string
	},
	page: number,
	results: IMovie[],
	total_pages: number,
	total_results: number
}

export const getMovies = () => {
	return fetch(`${BASE_MOVIE_URL}/movie/now_playing?api_key=${API_KEY}&region=kr`)
		.then((response) => response.json()
	);
}

export const getSearchResults = (query:string) => {
	return fetch(`${BASE_MOVIE_URL}/search/multi?api_key=${API_KEY}&region=kr&query=${query}`)
		.then((response) => response.json()
	);
}

