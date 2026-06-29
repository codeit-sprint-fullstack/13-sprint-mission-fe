import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
<<<<<<< HEAD
import Footer from "@/app/components/Footer";
import Providers from "@/app/providers"; // 위에서 만든 파일 경로
=======
import GNB from "@/app/components/GNB";
import Footer from "@/app/components/Footer";
>>>>>>> 1a446c5e5b01968498b4f5a65b4275671e4760e6

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
  description: "중고마켓과 자유게시판",
};

export default function RootLayout({ children }) {
  return (
<<<<<<< HEAD
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Providers>{children}</Providers>
=======
    <html lang="ko">
      <body>
        {/* 모든 페이지 상단에 GNB 배치 */}
        <GNB />
        <main>{children}</main>

        {/* 하단 푸터 고정 */}
>>>>>>> 1a446c5e5b01968498b4f5a65b4275671e4760e6
        <Footer />
      </body>
    </html>
  );
}
