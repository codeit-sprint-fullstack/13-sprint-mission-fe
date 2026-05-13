import Header from "./Header";
import Footer from "./Footer";
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
