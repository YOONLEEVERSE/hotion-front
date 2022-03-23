import styled, { keyframes } from "styled-components";
import { useState } from "react";

const fill = keyframes`
  0%{
    transform:rotate(-360deg);
  }
  100%{
    transform:rotate(0deg);
  }
`;

const LoaderLayout = styled.div<{ progress: number }>`
  background-color: rgba(0, 0, 0, 0.9);
  margin: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1000;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex-basis: 100px;
  & > span {
    box-sizing: border-box;
    display: inline-block;
    width: 100px;
    height: 100px;
  }
  & .circle {
    box-sizing: border-box;
    border: 10px solid #8aa5ff;
    border-right: 10px solid transparent;
    border-radius: 75px;
    animation-name: ${fill};
    animation-duration: 1s;
    animation-iteration-count: infinite;
  }
`;

const Loader = () => {
  const [progress, setProgress] = useState<number>(100);

  return (
    <LoaderLayout progress={progress}>
      <span className="circle"></span>
      <span
        style={{ textAlign: "center", color: "#8aa5ff", marginTop: "1rem" }}
      >
        로딩중
      </span>
    </LoaderLayout>
  );
};

export default Loader;
