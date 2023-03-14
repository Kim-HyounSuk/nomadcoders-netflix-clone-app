import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IContent } from "../api";
import { makeImagePath } from "../utils";
import SearchDetail from "./SearchDetail";

interface ISearchSliderProps {
  type: string;
  data?: IContent[];
  keyword: string | null;
  setType: (type: string | undefined) => void;
}

const Wrapper = styled.div`
  padding-bottom: 20px;
`;
const Container = styled.div`
  position: relative;
  height: 200px;
  top: -100px;
  margin-bottom: 80px;
`;
const Title = styled.h3`
  font-size: 20px;
  font-weight: 600;
  margin: 0 0 20px 10px;
`;
const Row = styled(motion.div)`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  width: 100%;
  padding: 0 24px;
  background-color: ${(props) => props.theme.black.veryDark};
`;
const Box = styled(motion.div)<{ bgphoto: string }>`
  background-color: ${(props) => props.theme.white.light};
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center center;
  height: 200px;
  cursor: pointer;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;
const Info = styled(motion.h4)`
  position: absolute;
  padding: 10px;
  background-color: ${(props) => props.theme.black.light};
  opacity: 0;
  width: 100%;
  bottom: 0;
  p {
    text-align: center;
    font-size: 14px;
  }
`;
const RBtn = styled.div`
  display: flex;
  position: absolute;
  right: 0;
  align-items: center;
  height: 100%;
  font-size: 24px;
  cursor: pointer;
  background-color: ${(props) => props.theme.black.veryDark};
  z-index: 2;
  opacity: 0.3;
  &:hover {
    opacity: 0.8;
  }
`;
const LBtn = styled.div`
  display: flex;
  position: absolute;
  left: 0;
  align-items: center;
  height: 100%;
  font-size: 24px;
  cursor: pointer;
  z-index: 2;
  background-color: rgba(0, 0, 0, 1);
  opacity: 0.3;
  &:hover {
    opacity: 0.8;
  }
`;

/* <-- Declare Invariant Variable ->> */
const OFFSET = 6;

/* <-- Component's Animation Variants ->> */
const rowVariants = {
  hidden: (reverse: boolean) => {
    return { x: reverse ? -window.innerWidth : window.innerWidth };
  },
  visible: {
    x: 0,
  },
  exit: (reverse: boolean) => {
    return { x: reverse ? window.innerWidth : -window.innerWidth };
  },
};
const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    y: -50,
    transition: {
      delay: 0.3,
      duration: 0.1,
      type: "tween",
    },
  },
};
const infoVariants = {
  hover: {
    opacity: 0.8,
    transition: {
      delay: 0.3,
      duration: 0.1,
      type: "tween",
    },
  },
};

const SearchSlider = ({ type, data, keyword, setType }: ISearchSliderProps) => {
  const [idx, setIdx] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [reverse, setReverse] = useState(false);

  const toggleLeaving = () => setLeaving((prev) => !prev);
  const increaseIdx = () => {
    if (data) {
      if (leaving) return;
      setReverse(false);
      toggleLeaving();
      const totalResults = data.length;
      const maxIdx = Math.ceil(totalResults / OFFSET) - 1;
      setIdx((prev) => (prev === maxIdx ? 0 : prev + 1));
    }
  };
  const decreaseIdx = () => {
    if (data) {
      if (leaving) return;
      setReverse(true);
      toggleLeaving();
      const totalResults = data.length;
      const maxIdx = Math.ceil(totalResults / OFFSET) - 1;
      setIdx((prev) => (prev === 0 ? maxIdx : prev - 1));
    }
  };

  const navigate = useNavigate();
  // const detailMatch = useMatch(`/search/:contentId`);

  const onClickBox = (contentId: number, type: string) => {
    navigate(`/search/${contentId}?keyword=${keyword}`);
    ((type) => {
      setType(type);
    })(type);
  };

  return (
    <Wrapper>
      <Container>
        <Title>{`${type}`.toUpperCase()}</Title>
        <AnimatePresence
          initial={false}
          onExitComplete={toggleLeaving}
          custom={reverse}
        >
          <Row
            key={idx}
            variants={rowVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ type: "tween", duration: 1 }}
            custom={reverse}
          >
            {data?.slice(OFFSET * idx, OFFSET * idx + OFFSET).map((content) => (
              <Box
                onClick={() => onClickBox(content.id, type)}
                key={content.id}
                bgphoto={makeImagePath(content.backdrop_path, "w500")}
                variants={boxVariants}
                initial="normal"
                whileHover="hover"
                transition={{ type: "tween" }}
              >
                <Info variants={infoVariants}>
                  <p>{content.title || content.name}</p>
                </Info>
              </Box>
            ))}
          </Row>
        </AnimatePresence>
        <LBtn onClick={decreaseIdx}>◁</LBtn>
        <RBtn onClick={increaseIdx}>▷</RBtn>
      </Container>
      {/* {detailMatch ? (
        <SearchDetail
          type={type}
          contentId={detailMatch.params.contentId}
        />
      ) : null} */}
    </Wrapper>
  );
};

export default SearchSlider;
