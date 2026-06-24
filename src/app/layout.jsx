import AuthProvider from "@/providers/AuthProvider";
import "./globals.css";
import localFont from "next/font/local";

export const metadata = {
  title: "판다 마켓",
};

const pretendard = localFont({
  src: "../assets/fonts/PretendardVariable.woff2", // 폰트 파일 저장 경로
  display: "swap",
  weight: "45 920", // 가변(Variable) 폰트의 두께 범위 설정
  variable: "--font-pretendard", // CSS 변수명 지정
});

export default function RootLayout({ children }) {
  return (
    <html lang="ko" className={`${pretendard.variable}`}>
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
