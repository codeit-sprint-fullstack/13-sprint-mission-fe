import { Outlet } from "react-router";
import NavbarMenu from "../components/Navbar/NavbarMenu.jsx";
import Footer from "../components/Footer.jsx";

function MainLayout() {
  return (
    <div>
      <NavbarMenu />
      <Outlet />
      <Footer />
    </div>
  );
}

export default MainLayout;
