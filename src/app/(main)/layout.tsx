import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import React from "react";

export default function MainLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="grow pt-17.5">{children}</main>
      <Footer />
    </div>
  );
}
