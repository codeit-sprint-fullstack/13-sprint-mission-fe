import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styles from "./MainLayout.module.css";

function MainLayout() {
  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default MainLayout;

