import { AnimatePresence, motion, useScroll } from "framer-motion";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getDetail, IDetailContent } from "../api";
import { makeImagePath } from "../utils";

interface ISearchDetail {
  type: string;
  contentId?: string;
  keyword: string | null;
}

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;
const DetailPanel = styled(motion.div)`
  position: absolute;
  width: 40vw;
  height: 80vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 15px;
  overflow: hidden;
  background-color: ${(props) => props.theme.black.light};
  overflow: auto;
  ::-webkit-scrollbar {
    width: 10px;
  }
  ::-webkit-scrollbar-track {
    background-color: ${(props) => props.theme.black.dark};
    border-radius: 5px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.white.dark};
    border-radius: 5px;
  }
`;
const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const DetailCover = styled.div`
  width: 100%;
  background-size: cover;
  background-position: center center;
  height: 400px;
`;
const DetailContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  position: relative;
  top: -80px;
`;
const DetailTittle = styled.h3`
  color: ${(props) => props.theme.white.light};
  padding: 20px;
  font-size: 46px;
  font-weight: 500;
`;
const DetailInfo = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 50px;
  font-size: 14px;
`;
const DetailOverview = styled.span`
  color: ${(props) => props.theme.white.light};
  padding: 50px;
  font-size: 16px;
`;

const SearchDetail = ({ type, contentId, keyword }: ISearchDetail) => {
  const navigate = useNavigate();
  const { scrollY } = useScroll();

  const { isLoading, data } = useQuery<IDetailContent>(
    [`${type}`, `${contentId}`],
    () => getDetail(type, contentId) || null
  );
  const onClickOverlay = () => navigate(-1);
  return (
    <AnimatePresence>
      <Overlay
        onClick={onClickOverlay}
        exit={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />
      <DetailPanel key={contentId} style={{ top: scrollY.get() + 100 }}>
        {!isLoading && (
          <DetailContainer>
            <DetailCover
              style={{
                backgroundImage: `linear-gradient(black, transparent), url(${makeImagePath(
                  data?.backdrop_path,
                  "w500"
                )})`,
              }}
            />
            <DetailContent>
              <DetailTittle>
                {data?.title || data?.name || "Untitled"}
              </DetailTittle>
              <DetailInfo>
                <span>⭐{data?.vote_average.toFixed(1)}</span>
                <span>
                  ⏰{data?.runtime || data?.episode_run_time[0] || "0"}
                  (minutes)
                </span>
                <span>
                  📆
                  {data?.release_date || data?.first_air_date || "0000-00-00"}
                </span>
              </DetailInfo>
              <DetailOverview>
                {data?.overview === ""
                  ? "Overview isn't registered..."
                  : data?.overview}
              </DetailOverview>
            </DetailContent>
          </DetailContainer>
        )}
      </DetailPanel>
    </AnimatePresence>
  );
};

export default SearchDetail;
