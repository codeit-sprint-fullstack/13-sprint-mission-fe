import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import "./Layout.css";

export default function Layout({ children }) {
  return (
    <div className="layout">
      <Header />
      <main className="main">{children}</main>
      <Footer />
    </div>
  );
}
