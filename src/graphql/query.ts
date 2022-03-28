import { gql } from "@apollo/client";

export const FILES = gql`
  query files {
    files {
      id
      originalName
    }
  }
`; //모든 파일 들고오는 쿼리

export const GETALLPAGE = gql`
  query getAllPage($workSpaceId: Float!) {
    getAllPage(workSpaceId: $workSpaceId) {
      children
      isRoot
      level
      pageId
      title
      parentId
    }
  }
`;

export const GETALLWORKSPACE = gql`
  query getAllWorkSpace {
    getAllWorkSpace {
      id
      isTeam
      members {
        email
        username
        id
      }
      title
    }
  }
`;

export const USERS = gql`
  query users {
    users {
      createAt
      email
      updatedAt
      username
    }
  }
`;
export const MULTIQUERY = gql`
  query Hi($workSpaceId: Float! = 0) {
    getAllWorkSpace {
      id @client @export(as: "workSpaceId")
      isTeam
      members {
        email
        username
        id
      }
      title
    }
    getAllPage(workSpaceId: $workSpaceId) {
      children
      isRoot
      level
      pageId
      title
      parentId
    }
  }
`;
