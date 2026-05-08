import { BrowserRouter, Routes, Route } from "react-router";
import MainLayout from "./layouts/MainLayout.jsx";
import SubLayout from "./layouts/SubLayout.jsx";
import Home from "./pages/Home";
import Items from "./pages/Items";
import Registration from "./pages/Registration.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* useLocation 활용해서 레이아웃 하나로 가는게 현 상황에는 낫다 */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route element={<SubLayout />}>
          <Route path="/items" element={<Items />} />
          <Route path="/registration" element={<Registration />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
