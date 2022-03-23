import SideNavContent from "../components/sideNav";
import styled from "styled-components";
import List from "../shared/list";
import Editor from "../components/Editor/Editor";
import { Dispatch, SetStateAction, useState, useEffect, useRef } from "react";
import Modal from "../components/modal";
const Header = styled.header``;
const Wrapper = styled.div`
  margin: 0;
  width: 100vw;
`;
const Content = styled.section``;
const MainSection = styled.main`
  width: calc(100vw - 328px);
  margin: 0;
  padding: 10rem;
  z-index: 0;
  margin-left: 328px;
`;
const ASide = styled.aside`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  width: 328px;
  height: 100vh;
  min-width: 250px;
  resize: horizontal;
  overflow: auto;
`;
const Title = styled.div`
  &:empty:before {
    content: "흐희희희";
    color: #ededed;
  }
  font-size: 2rem;
`;

export type menuType = {
  level: number;
  name: string;
  pageId: number;
  parentId: number;
};
type pageType = {
  [key: number]: menuType[];
};
const Note = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [currentData, setCurrentData] = useState<{
    pageId: number;
    parentId: number;
    index: number;
  }>({
    pageId: 1,
    parentId: 0,
    index: 0,
  });
  const [page, setPages] = useState<pageType>({
    0: [
      { level: 0, name: "TEST1", pageId: 1, parentId: 0 },
      { level: 0, name: "TEST7", pageId: 8, parentId: 0 },
    ],
    1: [
      { level: 1, name: "TEST2", pageId: 2, parentId: 1 },
      { level: 1, name: "TEST2", pageId: 3, parentId: 1 },
    ],
    3: [{ level: 2, name: "CHILD1", pageId: 4, parentId: 3 }],
  });

  useEffect(() => {
    console.log("CURRENTDATA CHANGE", currentData);
    if (ref.current?.textContent) {
      ref.current.textContent = "";
    }
  }, [currentData]);

  const ref = useRef<HTMLDivElement>(null);

  function handleModal() {
    setOpenModal((openModal) => !openModal);
  }

  const SideNav = () => (
    <ASide>
      <SideNavContent
        modalHandler={handleModal}
        pageData={page}
        handleSelectMenu={(pageId: number, parentId: number, index: number) => {
          setCurrentData({ pageId, parentId, index });
        }}
      ></SideNavContent>
    </ASide>
  );

  return (
    <Wrapper>
      <Content>
        <SideNav />
        <MainSection>
          <Header>컨텐츠 헤더</Header>
          <Title
            ref={ref}
            contentEditable={true}
            onInput={(e) => {
              if (e.currentTarget.textContent) {
                const idx = currentData.parentId;
                const newData = [...page[idx]];
                const preData: menuType = newData.splice(
                  currentData.index,
                  1
                )[0];
                newData.splice(currentData.index, 0, {
                  ...preData,
                  name: e.currentTarget.textContent,
                });
                setPages({
                  ...page,
                  [idx]: [...newData],
                });
              }
            }}
            onBlur={(e) => console.log("IM BLUR")}
          ></Title>
          <Editor></Editor>
        </MainSection>
      </Content>
      {openModal && <Modal handleModal={handleModal}></Modal>}
    </Wrapper>
  );
};

export default Note;
