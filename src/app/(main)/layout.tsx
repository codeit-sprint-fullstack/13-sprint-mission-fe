import Footer from "@/components/Footer";
import Header from "@/components/Header";
import RouteGuard from "@/providers/RouteGuard";

interface MainLayoutProps {
  children: React.ReactNode;
}
export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <RouteGuard>
      <Header />
      <main className="mx-auto w-full max-w-[1200px] flex-1 px-[16px] md:px-[20px]">
        {children}
      </main>
      <Footer />
    </RouteGuard>
  );
}
