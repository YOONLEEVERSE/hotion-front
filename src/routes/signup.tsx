import { ChangeEvent, FormEvent, useState } from "react";
import { Button, FormBox, Wrapper } from "./FormStyle";
import { useMutation } from "@apollo/client";
import { SIGNUP } from "../graphql/mutation";
import { useNavigate } from "react-router-dom";
type AccountType = {
  id: string;
  password: string;
  validatePassword: string;
  username: string;
};

function SignUp() {
  const [account, setAccount] = useState<AccountType>({
    id: "",
    password: "",
    validatePassword: "",
    username: "",
  });
  const [signup] = useMutation(SIGNUP, {
    onCompleted: (data) => {
      console.log("회원가입 응답 : ", data);

      if (data.signUp.ok) {
        navigate("/");
      }
    },
  });
  const navigate = useNavigate();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    //If you want Add validator, add here
    setAccount({ ...account, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("제출됨", account);
    signup({
      variables: {
        email: account.id,
        password: account.password,
        username: account.username,
      },
    });
    //여기서 요청 보내싐
  };
  return (
    <Wrapper>
      <h1>회원가입</h1>
      <FormBox>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">이름</label>
            <input
              name="username"
              type="text"
              placeholder="이름을 입력해주세요"
              onChange={handleInputChange}
              value={account.username}
            ></input>
          </div>
          <div>
            <label htmlFor="id">ID</label>
            <input
              name="id"
              type="email"
              placeholder="아이디를 입력해주세요"
              onChange={handleInputChange}
              value={account.id}
            ></input>
          </div>
          <div>
            <label htmlFor="password">PASSWORD</label>
            <input
              name="password"
              type="password"
              placeholder="비밀번호를 입력해주세요"
              onChange={handleInputChange}
              value={account.password}
            ></input>
          </div>
          <div>
            <label htmlFor="validatePassword">DOUBLECHECK</label>
            <input
              name="validatePassword"
              type="password"
              placeholder="비밀번호를 다시 한 번 입력해주세요"
              onChange={handleInputChange}
              value={account.validatePassword}
            ></input>
          </div>

          <Button concept="primary" type="submit">
            가입하기
          </Button>
        </form>
      </FormBox>
    </Wrapper>
  );
}

export default SignUp;
