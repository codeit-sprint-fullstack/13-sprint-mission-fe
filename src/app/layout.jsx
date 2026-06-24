import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const pretendard = localFont({
  src: "../fonts/PretendardVariable.woff2", // layout.jsx 기준 상대경로
  display: "swap",
  weight: "45 920", // 가변 폰트 굵기 범위
  variable: "--font-pretendard", // globals.css 에서 참조할 CSS 변수
});

export const metadata = {
  title: "판다마켓",
  description: "판다마켓 자유게시판",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko" className={pretendard.variable}>
      <body className="flex min-h-screen flex-col pt-[70px]">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
