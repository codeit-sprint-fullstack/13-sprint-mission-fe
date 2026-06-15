import "./globals.css";
import Header from "@/app/components/common/Header";
import Footer from "@/app/components/common/Footer";

export const metadata = {
  title: "판다마켓",
  description: "자유롭게 거래하는 판다마켓",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <Header />
        <div className="flex-1 mt-17.5 pt-6 pb-15">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
