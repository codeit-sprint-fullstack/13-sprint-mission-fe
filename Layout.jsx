import Header from "./src/assets/components/Header";
import Footer from "./src/assets/components/Footer";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="layout">
      <Header />
      <main className="content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
