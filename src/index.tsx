import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import defaultTheme from "./theme";
import { Provider as ReduxProvider } from "react-redux";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import store from "./redux/store";

//global style
const GlobalStyle = createGlobalStyle`
  body{
    background-color: black;
    color:white;
  }
`;

//apollo-client config
const httpLink = createHttpLink({
  uri: "https://www.temp.com/graphql",
  credentials: "same-origin",
}); //파일 업로드일 경우 createHttpLink => apollo-upload-client의 createUploadLink로 바꿀 것.

const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={apolloClient}>
    <ReduxProvider store={store}>
      <ThemeProvider theme={defaultTheme}>
        <Router>
          <GlobalStyle />
          <App />
        </Router>
      </ThemeProvider>
    </ReduxProvider>
  </ApolloProvider>,
  document.getElementById("root")
);
