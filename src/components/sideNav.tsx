import styled from "styled-components";
import { useMemo, FC, useRef, MouseEventHandler } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { menuType } from "../pages/Note";
import { isJSDocReturnTag } from "typescript";
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

type pageType = {
  [key: number]: menuType[];
};

const SideNav: FC<{
  modalHandler?: Function;
  pageData: pageType;
  handleSelectMenu: (pageId: number, parentId: number, index: number) => void;
}> = ({ modalHandler, pageData, handleSelectMenu }) => {
  const dispatch = useDispatch();
  const opensidebar = useSelector(
    (state: { sideNavOn: boolean }) => state.sideNavOn
  );
  const { username } = useParams();

  const NavElement = ({
    elements,
    objectKey: key,
  }: {
    elements: menuType[];
    objectKey?: number;
  }) => {
    return (
      <>
        {elements.map((data, idx) => {
          if (pageData.hasOwnProperty(data.pageId)) {
            return (
              <div>
                <div
                  onClick={(e) => {
                    console.log("CLICKED", e.currentTarget);
                    handleSelectMenu(data.pageId, data.parentId, idx);
                  }}
                  style={{
                    paddingLeft: `${data.level * 10}px`,
                    cursor: "pointer",
                  }}
                >
                  {data.name}
                </div>
                {
                  <NavElement
                    elements={pageData[data.pageId]}
                    objectKey={data.pageId}
                  />
                }
              </div>
            );
          }

          return (
            <div
              onClick={(e) => {
                console.log("CLICKED", e.currentTarget);
                handleSelectMenu(data.pageId, data.parentId, idx);
              }}
              style={{ paddingLeft: `${data.level * 10}px`, cursor: "pointer" }}
            >
              {data.name}
            </div>
          );
        })}
      </>
    );
  };

  return (
    <>
      <SideBar>
        <Header>{username ? username : "anonymous"}'s Notion</Header>
        <input
          type="checkbox"
          onChange={(e) => {
            e.preventDefault();
            dispatch({ type: "TOGGLESIDEBAR" });
          }}
        ></input>
        <ul>
          <li>
            <p>빠른검색</p>
            <p>모든 업데이트</p>
            <p>설정과 멤버</p>
          </li>
          <li>
            <NavElement elements={pageData[0]}></NavElement>
          </li>
        </ul>
        {modalHandler && (
          <p
            onClick={(e) => {
              e.preventDefault();
              modalHandler();
            }}
            style={{ cursor: "pointer" }}
          >
            &#43; 새 페이지
          </p>
        )}
      </SideBar>
    </>
  );
};

export default SideNav;
