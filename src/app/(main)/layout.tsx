import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="flex-1 mt-16 bg-white">{children}</main>
      <Footer />
    </>
  );
}
