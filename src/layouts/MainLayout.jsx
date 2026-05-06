import React from "react";

import { Outlet } from "react-router";

import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function MainLayout() {
  return (
    <main>
      <Header />
      <Outlet />
      <Footer />
    </main>
  );
}
