import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { getSearch, IGetSearch } from "../api";
import SearchSlider from "../Components/SearchSlider";

const Container = styled.div`
  margin-top: 20vh;
`;

const Search = () => {
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get("keyword");
  const { isLoading, data } = useQuery<IGetSearch>(
    ["search", `${keyword}`],
    () => getSearch(keyword)
  );

  const movieData = data?.results.filter((data) => data.media_type === "movie");
  const tvData = data?.results.filter((data) => data.media_type === "tv");

  return (
    <>
      {isLoading ? null : (
        <>
          <Container>
            <SearchSlider type="movie" data={movieData} keyword={keyword} />
            <SearchSlider type="tv" data={tvData} keyword={keyword} />
          </Container>
        </>
      )}
    </>
  );
};

export default Search;
