import SideNavContent from "../components/sideNav";
import styled from "styled-components";
import Editor from "../components/Editor/Editor";
import { useState, useEffect, useLayoutEffect, useRef } from "react";
//import Modal from "../components/modal";
import { useLocation, useParams } from "react-router-dom";
import ErrorBoundary from "../components/ErrorBoundary";

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
  title: string;
  pageId: number;
  parentId: number;
  isRoot: boolean;
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

  const [page, setPages] = useState<{ [name: number]: menuType[] }>({});
  const { state } = useLocation();
  const { pageId } = useParams();
  // const { data, loading, error } = useQuery(MULTIQUERY, {
  //   onCompleted: (data) => console.log("성공 ", data),
  //   onError: (e) => console.log("실패", e),
  //   context: {
  //     haeders: {
  //       "x-jwt": localStorage.getItem("accessToken"),
  //     },
  //   },
  // });
  useEffect(() => {
    if (Object.keys(page).length > 0 && ref.current) {
      ref.current.innerText =
        page[currentData.parentId][currentData.index].title;
    }
  }, [currentData]);
  useLayoutEffect(() => {
    // const newData: { [name: number]: menuType[] } = { 0: [] };
    // const d = state as menuType[];
    // d.forEach((_) => {
    //   if (_.isRoot) {
    //     newData[0].push(_);
    //   } else if (newData.hasOwnProperty(_.parentId)) {
    //     newData[_.parentId].push(_);
    //   } else {
    //     newData[_.parentId] = [_];
    //   }
    // });
    const newData: { [name: number]: menuType[] } = {
      0: [
        { level: 0, title: "ROOT1", pageId: 1, isRoot: true, parentId: 0 },
        { level: 0, title: "ROOT2", pageId: 2, isRoot: true, parentId: 0 },
      ],
      1: [
        { level: 1, title: "child1", pageId: 3, isRoot: false, parentId: 1 },
        { level: 1, title: "child2", pageId: 5, isRoot: false, parentId: 1 },
      ],
      3: [
        { level: 2, title: "nestchild", pageId: 4, isRoot: false, parentId: 3 },
      ],
    };
    setPages(newData);
    //setCurrentData({ pageId: d[0].pageId, index: 0, parentId: 0 });
    setCurrentData({ pageId: newData[0][0].pageId, index: 0, parentId: 0 });
  }, []);

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
        currentPage={currentData.pageId}
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
                  title: e.currentTarget.textContent,
                });
                setPages({
                  ...page,
                  [idx]: [...newData],
                });
              }
            }}
            onBlur={(e) => console.log("IM BLUR")}
          ></Title>
          <ErrorBoundary>
            <Editor pageId={currentData.pageId} />
          </ErrorBoundary>
        </MainSection>
      </Content>
      {/* {openModal && <Modal handleModal={handleModal}></Modal>} */}
    </Wrapper>
  );
};

export default Note;
