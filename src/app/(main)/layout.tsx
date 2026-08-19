import type { ReactNode } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <>
      <Header />
      <main className="min-h-screen w-full px-4 pt-4 md:px-6 md:pt-6.5 lg:mx-auto lg:max-w-300 lg:px-0">
        {children}
      </main>
      <Footer />
    </>
  );
}