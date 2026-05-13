import "./App.css";
import "./styles/reset.css";
import Home from "./pages/Home";
import { Route, Routes } from "react-router";
import Registration from "./pages/Registration";
import Items from "./pages/items";
import Layout from "./components/Layout/Layout";

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />}></Route>
          <Route path="/items" element={<Items />}></Route>
          <Route path="/registration" element={<Registration />}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
