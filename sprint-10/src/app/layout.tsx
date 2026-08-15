import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import { AuthProvider } from "@/entities/user";
import QueryProvider from "@/shared/config/QueryProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
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

export const metadata: Metadata = {
  title: "판다마켓",
  description: "판다마켓 - 중고 거래 플랫폼",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} ${rokafSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <QueryProvider>
          <AuthProvider>{children}</AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
