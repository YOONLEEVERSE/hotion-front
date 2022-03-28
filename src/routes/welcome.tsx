import styled from "styled-components";
import { Link } from "react-router-dom";
const STopnav = styled.nav`
  margin: 0;
  width: 100vw;
  height: 2rem;
  border-bottom: 1px solid #ededed;
  display: flex;
  justify-content: space-between;
  & ul {
    list-style-type: none;
    & li {
      float: left;
      padding: 0 0.5rem;
    }
    & li:after {
      clear: both;
    }
  }
`;

const SContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  & div {
    width: 100%;
    height: auto;
    text-align: center;
    font-weight: 900;
  }
`;

const Topnav = () => (
  <STopnav>
    <ul>
      <li>제품</li>
      <li>다운로드</li>
      <li>솔루션</li>
      <li>자료</li>
      <li>요금제</li>
    </ul>
    <ul>
      <li>영업팀에 문의하기</li>
      <li>
        <Link to={"/login"}>로그인</Link>
      </li>
      <li>문의하기</li>
    </ul>
  </STopnav>
);

const Content = () => {
  return (
    <SContent>
      <div>
        레츠고우 투더 <Link to="/signup">회원가입</Link>
      </div>
    </SContent>
  );
};

function Welcome() {
  return (
    <>
      <Topnav />
      <Content />
    </>
  );
}

export default Welcome;
