import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/app/components/common/Header";
import Footer from "@/app/components/common/Footer";
import Providers from "@/app/providers/Providers";

const Pretendard = localFont({
  src: "../../public/fonts/PretendardVariable.woff2",
  variable: "--font-pretendard",
  display: "swap",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "판다마켓 ",
  description: "자유롭게 거래하는 판다마켓",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className={`${Pretendard.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Providers>
          <Header />
          <div className="flex-1 mt-17.5 pt-6 pb-15 px-4">{children}</div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
