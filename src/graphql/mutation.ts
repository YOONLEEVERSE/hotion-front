import { gql } from "@apollo/client";
const SEND_FILE = gql`
  mutation uploadImage($file: Upload!) {
    uploadImage(file: $file) {
      url
    }
  }
`;

export const CREATEPAGE = gql`
  mutation createPage(
    $level: Float!
    $parentId: ID
    $title: String!
    $workSpaceId: ID!
  ) {
    createPage(
      input: {
        level: $level
        parentId: $parentId
        title: $title
        workSpaceId: $workSpaceId
      }
    ) {
      pageId
    }
  }
`;
export const CREATEWORKSPACE = gql`
  mutation createWorkSpace($isTeam: Boolean!, $title: String!) {
    createWorkSpace(input: { isTeam: $isTeam, title: $title }) {
      id
      members {
        email
      }
      title
    }
  }
`;
export const SIGNIN = gql`
  mutation signIn($email: String!, $password: String!) {
    signIn(input: { email: $email, password: $password }) {
      error
      ok
      token
    }
  }
`;
export const SIGNUP = gql`
  mutation signUp($email: String!, $password: String!, $username: String!) {
    signUp(input: { email: $email, password: $password, username: $username }) {
      error
      ok
    }
  }
`;

export const UPLOADIMAGE = gql`
  mutation uploadImage($file: Upload!) {
    uploadImage(file: $file) {
      url
    }
  }
`;
