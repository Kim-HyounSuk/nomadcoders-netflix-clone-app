import Slider from "../Components/Slider";
import { useQuery } from "react-query";
import {
  getNowPlayingMovies,
  getPopularMovie,
  getTopRatedMovies,
  getUpcomingMovies,
  IGetMoviesResult,
} from "../api";
import Banner from "../Components/Banner";
const Home = () => {
  const useMultipleQuery = () => {
    const nowPlaying = useQuery<IGetMoviesResult>(
      ["movie", "nowPlaying"],
      getNowPlayingMovies
    );
    const popular = useQuery<IGetMoviesResult>(
      ["movie", "popular"],
      getPopularMovie
    );
    const topRated = useQuery<IGetMoviesResult>(
      ["movie", "topRated"],
      getTopRatedMovies
    );
    const upcoming = useQuery<IGetMoviesResult>(
      ["movie", "upcoming"],
      getUpcomingMovies
    );
    return [nowPlaying, popular, topRated, upcoming];
  };
  const [
    { isLoading: nowPlayingLoading, data: nowPlayingData },
    { isLoading: popularLoading, data: popularData },
    { isLoading: topRatedLoading, data: topRatedData },
    { isLoading: upcomingLoading, data: upcominggData },
  ] = useMultipleQuery();

  const isLoading =
    nowPlayingLoading && popularLoading && topRatedLoading && upcomingLoading;

  return (
    <>
      {isLoading ? null : (
        <>
          <Banner data={nowPlayingData?.results[0]} />
          <Slider
            type="movie"
            category="Now Playing"
            data={nowPlayingData?.results.slice(1)}
          />
          <Slider type="movie" category="Popular" data={popularData?.results} />
          <Slider
            type="movie"
            category="Top Rated"
            data={topRatedData?.results}
          />
          <Slider
            type="movie"
            category="Upcoming"
            data={upcominggData?.results}
          />
        </>
      )}
    </>
  );
};

export default Home;
