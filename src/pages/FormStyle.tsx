import styled from "styled-components";
export const Wrapper = styled.div`
  max-width: 1200px;
  min-height: 100vh;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 0 auto;
`;
export const FormBox = styled.div`
  margin-top: 1rem;
  width: 30vw;
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
  & label {
    width: 90px;
    display: inline-block;
  }
  & input {
    width: 100%;
    background-color: #f7f7f4;
    border-color: #e3e3e0;
    width: 180px;
    padding: 5px 10px;
  }
  & div {
    margin: 10px 0;
  }
`;

export const Button = styled.button<{ concept?: string }>`
  width: 100%;
  padding: 10px 0;
  box-shadow: none;
  cursor: pointer;
  ${(props) =>
    props.concept === "primary"
      ? `border:#f38686; background-color:#fdf5f2; color:#f38686;`
      : `border:#dddada; backgruond-color:#dddada;`}
  :hover {
    border-color: #ededed;
    border-width: 1px;
  }
  :active {
    border-style: solid;
    border-width: 1px;
  }
`;
