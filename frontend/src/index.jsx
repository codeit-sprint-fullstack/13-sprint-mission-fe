import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./css/reset.css"; // CSS 초기화 파일 추가
import "./css/index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
   <StrictMode>
      <App />
   </StrictMode>
);
