import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./style/reset.css";
import "./style/global.css";

import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
