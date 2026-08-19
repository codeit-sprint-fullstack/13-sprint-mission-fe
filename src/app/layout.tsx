import "./globals.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import QueryProvider from "@/providers/QueryProvider";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "판다마켓",
  description: "판다마켓 중고 플랫폼",
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ko">
      <body>
        <QueryProvider>{children}</QueryProvider>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}