import { useQuery } from "react-query";
import {
  getAiringTodayTV,
  getOnTheAirTV,
  getPopularTV,
  getTopRatedTV,
  IGetTVResult,
} from "../api";
import Banner from "../Components/Banner";
import Slider from "../Components/Slider";

const TV = () => {
  const useMultipleQuery = () => {
    const onTheAir = useQuery<IGetTVResult>(["tv", "onTheAir"], getOnTheAirTV);
    const airingToday = useQuery<IGetTVResult>(
      ["tv", "airingToday"],
      getAiringTodayTV
    );
    const popular = useQuery<IGetTVResult>(["tv", "popular"], getPopularTV);
    const topRated = useQuery<IGetTVResult>(["tv", "topRated"], getTopRatedTV);
    return [onTheAir, airingToday, popular, topRated];
  };
  const [
    { isLoading: onTheAirLoading, data: onTheAirData },
    { isLoading: airingTodayLoading, data: airingTodayData },
    { isLoading: popularLoading, data: popularData },
    { isLoading: topRatedLoading, data: topRatedData },
  ] = useMultipleQuery();
  const loading =
    onTheAirLoading && airingTodayLoading && popularLoading && topRatedLoading;
  return (
    <>
      {loading ? null : (
        <>
          <Banner data={onTheAirData?.results[0]} />
          <Slider
            type="tv"
            category="On The Air"
            data={onTheAirData?.results.slice(1)}
          />
          <Slider
            type="tv"
            category="Airing Today"
            data={airingTodayData?.results}
          />
          <Slider type="tv" category="Popular" data={popularData?.results} />
          <Slider type="tv" category="Top Rated" data={topRatedData?.results} />
        </>
      )}
    </>
  );
};

export default TV;
