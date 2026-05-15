import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "../Layout";
import Main from "./assets/components/Main";
import ProductPage from "./assets/components/ProductPage";
import LoginPage from "./assets/components/LoginPage";
import SignupPage from "./assets/components/SignupPage";
import Register from "./assets/components/Register";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main />} />
          <Route path="items" element={<ProductPage />} />
          <Route path="registration" element={<Register />} />
        </Route>

        {/* Header/Footer 필요 없는 페이지는 Layout 밖에 둠 */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
