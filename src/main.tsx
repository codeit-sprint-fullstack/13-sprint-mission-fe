import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/global.css";
import { ThemeProvider } from "styled-components";
import theme from "./styles/theme";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("root 엘리먼트를 찾을 수 없습니다.");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
