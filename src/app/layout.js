import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata = {
  title: "판다마켓",
  description: "판다마켓 자유게시판",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body className="bg-white font-sans text-gray-900">
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
