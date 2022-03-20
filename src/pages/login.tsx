import { ChangeEvent, FormEvent, useState } from "react";
import { Button, FormBox, Wrapper } from "./FormStyle";
import { useMutation, gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";
type AccountType = {
  id: string;
  password: string;
};

const SIGNIN = gql`
  mutation signIn($email: String!, $password: String!) {
    signIn(input: { email: $email, password: $password }) {
      error
      ok
      token
    }
  }
`;

function Login() {
  const [account, setAccount] = useState<AccountType>({
    id: "",
    password: "",
  });
  const [signin] = useMutation(SIGNIN, {
    onCompleted: (data) => {
      console.log("로그인 응답 : ", data);
      if (data.signIn.ok) {
        navigate(`/main/${account.id}`);
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
    signin({
      variables: {
        email: account.id,
        password: account.password,
      },
    });
    console.log("제출됨", account);
    //여기서 요청 보내싐
  };
  return (
    <Wrapper>
      <h1>로그인</h1>
      <FormBox>
        <form onSubmit={handleSubmit}>
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

          <Button concept="primary" type="submit">
            로그인하기
          </Button>
        </form>
      </FormBox>
    </Wrapper>
  );
}

export default Login;
