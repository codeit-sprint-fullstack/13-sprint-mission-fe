import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";

const pandaBody = Noto_Sans_KR({
  variable: "--font-panda-body",
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
});

export const metadata = {
  title: "Panda Market",
  description: "React, Next.js, Tailwind 기반의 반응형 쇼핑 화면",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="ko"
      className={`${pandaBody.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-slate-900">{children}</body>
    </html>
  );
}
