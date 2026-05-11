import { BrowserRouter, Routes, Route } from "react-router";
import MainLayout from "./layouts/MainLayout.jsx";
import Home from "./pages/Home";
import Items from "./pages/Items";
import Registration from "./pages/Registration.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/items" element={<Items />} />
          <Route path="/registration" element={<Registration />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
