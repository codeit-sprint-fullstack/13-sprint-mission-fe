import Header from "@/components/common/Header";
import "./globals.css";
import localFont from "next/font/local";
import Footer from "@/components/common/Footer";

export const metadata = {
  title: "판다 마켓",
};

const pretendard = localFont({
  src: "./fonts/PretendardVariable.woff2", // 폰트 파일 저장 경로
  display: "swap",
  weight: "45 920", // 가변(Variable) 폰트의 두께 범위 설정
  variable: "--font-pretendard", // CSS 변수명 지정
});

export default function RootLayout({ children }) {
  return (
    <html lang="ko" className={`${pretendard.variable}`}>
      <body className="min-h-full flex flex-col">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
