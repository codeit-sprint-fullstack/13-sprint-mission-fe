import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./css/Reset.css";
import "./css/Variables.css";
import "./css/Style.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
