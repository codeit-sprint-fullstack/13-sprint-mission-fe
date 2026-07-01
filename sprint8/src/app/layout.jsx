import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/common/Heder";
import Footer from "@/components/common/Footer";

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
  description: "판다마켓 자유게시판",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        {/* 반응형 컨테이너 */}
        <main className="flex-1 w-full max-w-[1200px] mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8 lg:py-10">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
