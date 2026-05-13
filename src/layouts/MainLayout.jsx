import React from "react";
import { Outlet } from "react-router";

import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

export default function MainLayout() {
  return (
    <main>
      <Header />
      <Outlet />
      <Footer />
    </main>
  );
}
