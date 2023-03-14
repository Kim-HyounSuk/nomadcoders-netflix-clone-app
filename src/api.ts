const API_KEY = process.env.REACT_APP_MOVIEDB_API_KEY;
const BASE_PATH = "https://api.themoviedb.org/3";

export interface IContent {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title?: string;
  name?: string;
  overview: string;
}
export interface IDetailContent {
  title?: string;
  name?: string;
  backdrop_path: string;
  overview: string;
  vote_average: number;
  vote_count: number;
  release_date?: string;
  first_air_date?: string;
  episode_run_time: number[];
  runtime: number;
}

export interface IGetMoviesResult {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: IContent[];
  total_pages: number;
  total_results: number;
}
export interface IGetTVResult {
  page: number;
  results: IContent[];
  total_results: number;
  total_pages: number;
}

/* <-- Fetch Movie Method --> */
export const getNowPlayingMovies = () => {
  return fetch(
    `${BASE_PATH}/movie/now_playing?api_key=${API_KEY}&language=en-US`
  ).then((response) => response.json());
};
export const getPopularMovie = () => {
  return fetch(
    `${BASE_PATH}/movie/popular?api_key=${API_KEY}&language=en-US`
  ).then((response) => response.json());
};
export const getTopRatedMovies = () => {
  return fetch(
    `${BASE_PATH}/movie/top_rated?api_key=${API_KEY}&language=en-US`
  ).then((response) => response.json());
};
export const getUpcomingMovies = () => {
  return fetch(
    `${BASE_PATH}/movie/upcoming?api_key=${API_KEY}&language=en-US`
  ).then((response) => response.json());
};

/* <-- Fetch TV Method --> */
export const getOnTheAirTV = () => {
  return fetch(
    `${BASE_PATH}/tv/on_the_air?api_key=${API_KEY}&language=en-US`
  ).then((response) => response.json());
};
export const getAiringTodayTV = () => {
  return fetch(
    `${BASE_PATH}/tv/airing_today?api_key=${API_KEY}&language=en-US`
  ).then((response) => response.json());
};
export const getPopularTV = () => {
  return fetch(
    `${BASE_PATH}/tv/popular?api_key=${API_KEY}&language=en-US`
  ).then((response) => response.json());
};
export const getTopRatedTV = () => {
  return fetch(
    `${BASE_PATH}/tv/top_rated?api_key=${API_KEY}&language=en-US`
  ).then((response) => response.json());
};

/* <-- Fetch Detail --> */
export const getDetail = (type?: string, contentId?: string) => {
  console.log(type, contentId);
  return fetch(
    `${BASE_PATH}/${type}/${contentId}?api_key=${API_KEY}&language=en-US`
  ).then((response) => response.json());
};

/* <-- Fetch Search --> */
export interface IGetSearch {
  results: IContent[];
}
export const getSearchMovie = (keyword: string | null) => {
  return fetch(
    `${BASE_PATH}/search/movie?query=${keyword}&api_key=${API_KEY}&language=en-US`
  ).then((response) => response.json());
};
export const getSearchTV = (keyword: string | null) => {
  return fetch(
    `${BASE_PATH}/search/tv?query=${keyword}&api_key=${API_KEY}&language=en-US`
  ).then((response) => response.json());
};
