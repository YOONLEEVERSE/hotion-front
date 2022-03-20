import SideNav_ from "../components/sideNav";
import styled from "styled-components";
import List from "../shared/list";
import Button from "../shared/button";
import Editor from "../components/Editor/Editor";
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
`;
const SideNav = () => (
  <ASide>
    <SideNav_></SideNav_>
  </ASide>
);

const Main = () => {
  return (
    <Wrapper>
      <Content>
        <SideNav />
        <MainSection>
          <Header>컨텐츠 헤더</Header>
          {/* <List />
          <Button /> */}
          <Editor></Editor>
        </MainSection>
      </Content>
    </Wrapper>
  );
};

export default Main;
