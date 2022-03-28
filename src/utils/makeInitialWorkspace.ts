import { CREATEWORKSPACE, CREATEPAGE } from "../graphql/mutation";
import { useMutation } from "@apollo/client";
// $isTeam: Boolean!, $title: String!workspace
//  $level: Float!
//     $parentId: ID
//     $title: String!
//     $workSpaceId: ID! => 페이지

export function useSetting() {
  const accessToken = localStorage.getItem("accessToken");
  const [createWorkspace, { data, loading: firstLoading }] = useMutation(
    CREATEWORKSPACE,
    {
      variables: {
        isTeam: false,
        title: "새 워크스페이스",
      },
      onCompleted: (data) => {
        console.log("워크스페이스 생성 성공", data);
        createPage({
          variables: {
            level: 0,
            parentId: 0,
            title: "새 문서",
            workSpaceId: data.createWorkSpace.id,
          },
        });
      },
      onError: (e) => console.log("워크스페이스 생성 실패", e),
      context: {
        headers: {
          "x-jwt": accessToken,
        },
      },
    }
  );
  const [createPage, { loading: secondLoading }] = useMutation(CREATEPAGE, {
    onCompleted: (data) => console.log("페이지 생성 성공,", data),
    onError: (e) => console.log("페이지 생성 실패", e),
    context: {
      headers: {
        "x-jwt": accessToken,
      },
    },
  });

  return { createWorkspace, data };
}
