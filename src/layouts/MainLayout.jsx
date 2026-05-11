import { Outlet } from "react-router";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

function MainLayout() {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default MainLayout;
