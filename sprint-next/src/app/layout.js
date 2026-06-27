import { Geist } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import QueryProvider from "@/providers/QueryProvider";
import AuthProvider from "@/providers/AuthProvider";
import RouteGuard from "@/providers/RouteGuard";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const rokafSans = localFont({
  src: [
    {
      path: "../assets/fonts/ROKAF_Sans_Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../assets/fonts/ROKAF_Sans_Medium.ttf",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-rokaf-sans",
});

export const metadata = {
  title: "판다마켓",
  description: "판다마켓 - 중고 거래 플랫폼",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko" className={`${geistSans.variable} ${rokafSans.variable}`}>
      <body className="min-h-screen flex flex-col">
        <QueryProvider>
          <AuthProvider>
            <RouteGuard>{children}</RouteGuard>
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
