import e from "express";
import { FC, ReactChild, ReactChildren, ReactNode, useState } from "react";
import styled from "styled-components";
interface Idummy {
  thumbnail?: string;
  name: string;
  description: string;
}

const Wrapper = styled.div`
  width: 320px;
  height: 350px;
  overflow-y: scroll;
  box-shadow: rgb(15 15 15 / 5%) 0px 0px 0px 1px,
    rgb(15 15 15 / 10%) 0px 3px 6px, rgb(15 15 15 / 20%) 0px 9px 24px;
`;

const SBlock = styled.div`
  cursor: pointer;
  padding: 1rem 0;
  padding-left: 1rem;
  & h6,
  & p {
    margin: 0;
  }
  &:hover {
    background-color: rgba(219, 219, 219, 0.767);
  }
`;

const Popup = styled.div<{ top: number; left: number }>`
  position: absolute;
  background-color: black;
  color: white;
  width: 50px;
  height: 50px;
  top: ${(props) => props.top + "px"};
  left: ${(props) => props.left + 350 + "px"};
`;

const Block: FC = ({ children }) => {
  const [popup, setPopup] = useState<{
    status: boolean;
    top: number;
    left: number;
  }>({ status: false, top: 0, left: 0 });
  return (
    <SBlock
      onMouseEnter={(e) => {
        e.preventDefault();
        setPopup({
          status: true,
          top: e.currentTarget.clientTop,
          left: e.currentTarget.clientLeft,
        });
      }}
      onMouseLeave={(e) => {
        e.preventDefault();
        setPopup((popup) => ({
          status: false,
          top: popup.top,
          left: popup.left,
        }));
      }}
    >
      {children}
      {popup.status && <Popup top={popup.top} left={popup.left}></Popup>}
    </SBlock>
  );
};

const dummy: Idummy[] = [
  { name: "TEST 1번째", description: "this is description-1" },
  { name: "TEST 2번째", description: "this is description-2" },
  { name: "TEST 3번째", description: "this is description-3" },
  { name: "TEST 4번째", description: "this is description-4" },
  { name: "TEST 5번째", description: "this is description-5" },
  { name: "TEST 6번째", description: "this is description-6" },
  { name: "TEST 7번째", description: "this is description-7" },
  { name: "TEST 8번째", description: "this is description-8" },
  { name: "TEST 9번째", description: "this is description-9" },
  { name: "TEST 10번째", description: "this is description-10" },
  { name: "TEST 11번째", description: "this is description-11" },
  { name: "TEST 12번째", description: "this is description-12" },
  { name: "TEST 13번째", description: "this is description-13" },
  { name: "TEST 14번째", description: "this is description-14" },
  { name: "TEST 15번째", description: "this is description-15" },
  { name: "TEST 16번째", description: "this is description-16" },
  { name: "TEST 17번째", description: "this is description-17" },
  { name: "TEST 18번째", description: "this is description-18" },
  { name: "TEST 19번째", description: "this is description-19" },
  { name: "TEST 20번째", description: "this is description-20" },
];

const List = () => {
  return (
    <Wrapper>
      <div className="title">기본 블록</div>
      {dummy.map((data, idx) => (
        <Block key={idx}>
          <h6>{data.name}</h6>
          <p style={{ fontSize: "0.5rem" }}>{data.description}</p>
        </Block>
      ))}
    </Wrapper>
  );
};

export default List;
