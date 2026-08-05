import Providers from "../providers";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "판다마켓",
  description: "일상의 모든 물건을 판다마켓에 거래해 보세요",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="kr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col justify-between">
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
