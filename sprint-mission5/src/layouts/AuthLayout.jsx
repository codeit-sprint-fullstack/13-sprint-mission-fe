import { Outlet } from "react-router-dom";
import styles from "./AuthLayout.module.css";

function AuthLayout() {
  return (
    <main className={styles.authMain}>
      <Outlet />
    </main>
  );
}

export default AuthLayout;
