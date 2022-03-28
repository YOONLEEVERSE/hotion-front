import { ChangeEvent, FormEvent, useState } from "react";
import { Button, FormBox, Wrapper } from "./FormStyle";
import { useMutation, useQuery } from "@apollo/client";
import { GETALLWORKSPACE, GETALLPAGE } from "../graphql/query";
import { SIGNIN } from "../graphql/mutation";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Loader from "../components/Loading";
import { login } from "../redux/ActionCreator";
import { useSetting } from "../utils/makeInitialWorkspace";

type AccountType = {
  id: string;
  password: string;
};

//보안 생각한 JWT방식은 일단 후에 생각
function Login() {
  const { createWorkspace } = useSetting(); //워크스페이스 생성. 커스텀 훅.
  const [account, setAccount] = useState<AccountType>({
    id: "",
    password: "",
  });
  const dispatch = useDispatch();

  const [signin, { loading }] = useMutation(SIGNIN, {
    onCompleted: (data) => {
      if (data.signIn.ok) {
        localStorage.setItem("accessToken", data.signIn.token);
        dispatch(login({ username: account.id }));
        getAllWorkspace();
      }
    },
  }); //로그인

  const { loading: getWorkspaceLoading, refetch: getAllWorkspace } = useQuery(
    GETALLWORKSPACE,
    {
      context: {
        headers: {
          "x-jwt": localStorage.getItem("accessToken"),
        },
      },
      onCompleted: (data) => {
        console.log("WORKSPACE", data);
        if (data.getAllWorkSpace.length === 0) {
          createWorkspace();
        } //워크스페이스가 없는 경우,, 워크스페이스를.. 만들어줌
        else {
          const pageData = (async () => {
            let pageData = await getAllPages({
              workSpaceId: +data.getAllWorkSpace[0].id,
            });
            return pageData;
          })();
          pageData.then((pdata) => {
            navigate(`/note/${account.id}`, { state: pdata.data.getAllPage });
          });
          //getAllPages({ workSpaceId: +data.getAllWorkSpace[0].id });
        }
      },
      onError: (e) => {
        console.log("워크스페이스 들고오는 것 실패", e);
      },
      skip: true,
      returnPartialData: true,
    }
  ); //사용자의 워크스페이스 로딩
  const { loading: getAllPagesLoading, refetch: getAllPages } = useQuery(
    GETALLPAGE,
    {
      context: {
        headers: {
          "x-jwt": localStorage.getItem("accessToken"),
        },
      },
      skip: true,
    }
  ); //사용자의 워크스페이스에 속한 페이지로딩.

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
      {(loading || getWorkspaceLoading || getAllPagesLoading) && <Loader />}
    </Wrapper>
  );
}

export default Login;
