import { useState } from "react";
import { useQuery } from "react-query";
import { useLocation, useMatch } from "react-router-dom";
import styled from "styled-components";
import { getSearchMovie, getSearchTV, IGetSearch } from "../api";
import SearchDetail from "../Components/SearchDetail";
import SearchSlider from "../Components/SearchSlider";

const Container = styled.div`
  margin-top: 20vh;
`;

const Search = () => {
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get("keyword");
  const useMultipleQuery = () => {
    const movieSearch = useQuery<IGetSearch>(
      ["movieSearch", `${keyword}`],
      () => getSearchMovie(keyword)
    );
    const tvSearch = useQuery<IGetSearch>(["tvSearch", `${keyword}`], () =>
      getSearchTV(keyword)
    );
    return [movieSearch, tvSearch];
  };
  const [
    { isLoading: movieSearchLoading, data: movieSearchData },
    { isLoading: tvSearchLoading, data: tvSearchData },
  ] = useMultipleQuery();
  const isLoading = movieSearchLoading && tvSearchLoading;

  const detailMatch = useMatch(`/search/:contentId`);
  const [type, setType] = useState<string>();
  return (
    <>
      {isLoading ? null : (
        <>
          <Container>
            <SearchSlider
              type="movie"
              data={movieSearchData?.results}
              keyword={keyword}
              setType={(type: string | undefined) => setType(type)}
            />
            <SearchSlider
              type="tv"
              data={tvSearchData?.results}
              keyword={keyword}
              setType={(type: string | undefined) => setType(type)}
            />
          </Container>
          {detailMatch ? (
            <SearchDetail
              type={type}
              contentId={detailMatch.params.contentId}
            />
          ) : null}
        </>
      )}
    </>
  );
};

export default Search;
