import type { PropsWithChildren } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import NProgress from "nprogress";
import HeaderLayout from "./components/Layout/HeaderLayout";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/auth/LoginPage";
import MarketPage from "./pages/MarketPage/MarketPage";
import AddItemPage from "./pages/AddItemPage/AddItemPage";
import CommunityFeedPage from "./pages/CommunityFeedPage/CommunityFeedPage";
import ItemDetailPage from "./pages/ItemDetailPage/ItemDetailPage";
import SignupPage from "./pages/auth/SignupPage";
import EditItemPage from "./pages/EditItemPage/EditItemPage";
import ArticleFormPage from "./pages/ArticleFormPage/ArticleFormPage";
import ArticleDetailPage from "./pages/ArticleDetailPage/ArticleDetailPage";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import "nprogress/nprogress.css";

NProgress.configure({ showSpinner: false });
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10 * 1000,
      retry: 1,
    },
  },
});

function Providers({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>{children}</AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

function App() {
  return (
    <Providers>
      <Routes>
        <Route Component={HeaderLayout}>
          <Route index element={<HomePage />} />
          <Route path="registration" element={<ProtectedRoute><AddItemPage /></ProtectedRoute>} />
          <Route path="community" element={<CommunityFeedPage />} />
          <Route path="community/new" element={<ProtectedRoute><ArticleFormPage /></ProtectedRoute>} />
          <Route path="community/:articleId" element={<ArticleDetailPage />} />
          <Route path="community/:articleId/edit" element={<ProtectedRoute><ArticleFormPage /></ProtectedRoute>} />
          <Route path="items">
            <Route index element={<MarketPage />} />
            <Route path=":itemId" element={<ProtectedRoute><ItemDetailPage /></ProtectedRoute>} />
            <Route path=":itemId/edit" element={<ProtectedRoute><EditItemPage /></ProtectedRoute>} />
          </Route>
        </Route>

        <Route path="login" element={<LoginPage />} />
        <Route path="signin" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />
      </Routes>
    </Providers>
  );
}

export default App;
