import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import GNB from "@/app/components/GNB";
import Footer from "@/app/components/Footer"; // 👈 푸터 컴포넌트 불러오기

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
    <html lang="ko">
      <body>
        {/* 모든 페이지 상단에 GNB 배치 */}
        <GNB />
        <main>{children}</main>

        {/* 하단 푸터 고정 */}
        <Footer />
      </body>
    </html>
  );
}
