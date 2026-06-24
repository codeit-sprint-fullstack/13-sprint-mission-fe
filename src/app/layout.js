import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "판다마켓",
  description: "판다마켓 중고 플랫폼",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        <Header />
        <main className="min-h-screen w-full px-4 pt-4 md:px-6 md:pt-6.5 lg:mx-auto lg:max-w-300 lg:px-0">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
