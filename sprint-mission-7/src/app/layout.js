import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body className="m-0 p-0 bg-gray-50 min-h-screen flex flex-col">
        <Header />
        <main className="max-w-6xl w-full mx-auto px-4 py-[24px] flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
