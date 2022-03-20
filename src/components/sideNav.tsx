import styled from "styled-components";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/rootReducer";
import { useParams } from "react-router-dom";
const SideBar = styled.aside`
  background-color: #f7f6f3;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  margin: 0;
  padding: 1rem 0.8rem;

  & ul {
    list-style-type: none;
    color: #a19f9b;
    & li {
      margin-top: 2rem;
    }
    & li p {
      margin: 0;
      font-size: 0.9rem;
    }
  }
`;
const Header = styled.header``;
//aside안에 section으로 넣자~
const pages_ = [
  { name: "Test1", children: [{ name: "nxwested1" }] },
  {
    name: "Test2",
  },
  { name: "Test3", children: [{ name: "nested3-1" }, { name: "nested3-2" }] },
];

const SideNav = () => {
  const [pages, _] = useState(pages_);
  const dispatch = useDispatch();
  const opensidebar = useSelector(
    (state: { sideNavOn: boolean }) => state.sideNavOn
  );
  const { username } = useParams();
  console.log("여기는 사이드네브 : ", username);
  //   dispatch({ type: "OPENSIDEBAR" });
  return (
    <>
      {opensidebar && <p>hi</p>}
      <SideBar>
        <Header>{username ? username : "anonymous"}'s Notion</Header>
        <input
          type="checkbox"
          onChange={(e) => {
            e.preventDefault();
            dispatch({ type: "TOGGLESIDEBAR" });
            console.log(opensidebar);
          }}
        ></input>
        <ul>
          <li>
            <p>빠른검색</p>
            <p>모든 업데이트</p>
            <p>설정과 멤버</p>
          </li>
          <li>
            {pages.map((page, idx) => {
              return <p key={idx}>{page.name}</p>;
            })}
            {/*이케 li안에 div 컨텐츠 많이 넣는 건 괜춘네 */}
          </li>
        </ul>
        <p>새 페이지</p>
      </SideBar>
    </>
  );
};

export default SideNav;
