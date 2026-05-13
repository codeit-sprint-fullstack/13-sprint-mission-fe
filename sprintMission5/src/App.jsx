import Header from "./components/Header";
import Footer from "./components/Footer";
import MainCard from "./components/MainCard";
import Registration from "./components/Registration";

import { Route, Routes } from "react-router";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Header></Header>}></Route>
        <Route path="/items" element={<MainCard></MainCard>}></Route>
        <Route
          path="/registration"
          element={<Registration></Registration>}
        ></Route>
        <Route path="/free" element={<div />}></Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
