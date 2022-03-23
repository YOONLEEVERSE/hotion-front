import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import defaultTheme from "./theme";
import { Provider as ReduxProvider } from "react-redux";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import store from "./redux/store";
import { createUploadLink } from "apollo-upload-client";

//global style
const GlobalStyle = createGlobalStyle`
html, body, div, span, applet, object, iframe,
 p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
body{
  margin:0;
}
/* input 기본 스타일 초기화 */
input {
    -webkit-appearance: none;
       -moz-appearance: none;
            appearance: none;
      border:1px solid #ededed;
}

input:-internal-autofill-selected {
  background-color:#ededed!important;
}
/* IE10 이상에서 input box 에 추가된 지우기 버튼 제거 */
input::-ms-clear { display: none; }

/* input type number 에서 화살표 제거 */
input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
       -moz-appearance: none;
            appearance: none;
}

.red{
  color:red
}

`;

//apollo-client config
const httpLink = createUploadLink({
  uri: "https://tender-fox-48.loca.lt/graphql",
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
