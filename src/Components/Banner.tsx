import styled from "styled-components";
import { IContent } from "../api";
import { makeImagePath } from "../utils";

/* <-- Component's Props Type --> */
interface IBannerProps {
  data?: IContent;
}

/* <-- Component's stylings ->> */
const Wrapper = styled.div<{ bgphoto: string }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center center;
`;
const Title = styled.h2`
  width: 80%;
  font-size: 68px;
  font-weight: 500;
  margin-bottom: 40px;
`;
const Overview = styled.p`
  width: 50%;
  max-height: 280px;
  margin-left: 10px;
  font-size: 20px;
  text-overflow: ellipsis;
`;

const Banner = ({ data }: IBannerProps) => {
  return (
    <Wrapper bgphoto={makeImagePath(data?.poster_path || "")}>
      {<Title>{data?.title || data?.name}</Title>}
      <Overview>{data?.overview}</Overview>
    </Wrapper>
  );
};

export default Banner;
