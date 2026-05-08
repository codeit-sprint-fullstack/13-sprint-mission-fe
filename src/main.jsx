import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import "./reset.css";
import App from "./App.jsx";
import { ScrollToTop } from "@/components";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ScrollToTop />
        <App />
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>,
);
