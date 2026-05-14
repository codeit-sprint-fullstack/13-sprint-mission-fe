import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout"; // Layout 컴포넌트 위치에 맞게 경로 수정
import MainPage from "./pages/MainPage";
import ProductPage from "./pages/ProductPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import RegisterPage from "./pages/RegisterPage";
import "./css/App.css";

function App() {
   return (
      <Router>
         <Routes>
            <Route path="/" element={<Layout />}>
               <Route index element={<MainPage />} />
               <Route path="items" element={<ProductPage />} />
               <Route path="registration" element={<RegisterPage />} />
            </Route>

            {/* Header/Footer 필요 없는 페이지는 Layout 밖에 둠 */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/register" element={<RegisterPage />} />
         </Routes>
      </Router>
   );
}

export default App;
