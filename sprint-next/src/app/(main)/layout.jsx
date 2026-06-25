import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

export default function MainLayout({ children }) {
  return (
    <>
      <Header />
      <div className="flex-1 pt-17.5">{children}</div>
      <Footer />
    </>
  );
}
