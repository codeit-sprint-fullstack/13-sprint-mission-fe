import { BrowserRouter, Routes, Route } from "react-router";
import MainLayout from "./layouts/MainLayout.jsx";
import SubLayout from "./layouts/SubLayout.jsx";
import Home from "./pages/Home";
import Items from "./pages/Items";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route element={<SubLayout />}>
          <Route path="/items" element={<Items />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
