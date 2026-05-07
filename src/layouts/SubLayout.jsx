import { Outlet } from "react-router";
import NavbarWithMenu from "../components/NavbarWithMenu.jsx";
import Footer from "../components/Footer.jsx";

function MainLayout() {
  return (
    <div>
      <NavbarWithMenu />
      <Outlet />
      <Footer />
    </div>
  );
}

export default MainLayout;
