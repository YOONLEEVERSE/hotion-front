import styled from "styled-components";
import { FC } from "react";
import CustomEditor from "./Editor/Editor";
const ModalLayout = styled.div`
  position: fixed; /* Stay in place */
  z-index: 1000; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */

  & > div {
    background-color: #fefefe;
    margin: 15% auto; /* 15% from the top and centered */
    padding: 20px;
    border: 1px solid #888;
    width: 80%; /* Could be more or less, depending on screen size */
  }

  & > div > span {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
  }
  & > div > span:hover,
  & > div > span:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }
`;

const Modal: FC<{ handleModal: () => void }> = ({ handleModal, children }) => {
  return (
    <ModalLayout>
      <div id="pass">
        <span>전체모드로 보기</span>
        <span onClick={handleModal}>&times;</span>
        <div>
          {children}
          <CustomEditor></CustomEditor>
        </div>
      </div>
    </ModalLayout>
  );
};

export default Modal;
