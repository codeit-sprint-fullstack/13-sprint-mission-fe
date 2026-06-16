import Header from "@/components/common/Header";
import "./globals.css";
import localFont from "next/font/local";
import Footer from "@/components/common/Footer";

const pretendard = localFont({
  src: "./fonts/Pretendard/PretendardVariable.woff2",
  weight: "100 900",
  variable: "--font-pretendard",
  display: "swap",
});

export const metadata = {
  title: "판마 마켓",
  description:
    "판다마켓은 이웃과 함께하는 따뜻한 중고거래 커뮤니티 플랫폼입니다. 단순한 거래를 넘어 사용자들이 소통하고 정보를 나누는 공간을 지향합니다.",
};

export default function RootLayout({ children }) {
  return (
    <html lang='ko' className={`${pretendard.variable} h-full antialiased`}>
      <body className='min-h-full flex flex-col font-pretendard'>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
