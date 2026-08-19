import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import React from "react";
import QueryProvider from "@/providers/QueryProvider";
import AuthProvider from "@/providers/AuthProvider";
import RouteGuard from "@/providers/RouteGuard";

const pretendard = localFont({
  src: "../fonts/Pretendard-Regular.woff2",
  display: "swap",
  variable: "--font-pretendard",
});

export const metadata: Metadata = {
  title: "판다마켓 | 믿을 수 있는 중고 거래",
  description: "일상의 모든 물건을 거래해보세요",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko" className={`${pretendard.variable} h-full antialiased`}>
      <body className="font-sans">
        <QueryProvider>
          <AuthProvider>
            <RouteGuard>{children}</RouteGuard>
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
