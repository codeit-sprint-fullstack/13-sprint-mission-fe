import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";

export default function MainLayout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
