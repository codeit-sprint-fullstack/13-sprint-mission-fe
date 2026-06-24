// src/app/(main-layout)/layout.jsx
import Header from "@/components/common/Header.jsx";
import Footer from "@/components/common/Footer.jsx";

export default function MainLayout({ children }) {
  return (
    <>
      <Header />
      <main className="min-h-full flex flex-col">{children}</main>
      <Footer />
    </>
  );
}
