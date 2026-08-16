import "./globals.css";
import "pretendard/dist/web/static/pretendard.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QueryProvider from "@/components/QueryProvider";

export const metadata = {
  title: "판다마켓",
  description: "판다마켓 스프린트 미션", 
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ko">
      <body className="flex min-h-screen flex-col bg-gray-50 antialiased">
        <QueryProvider>
          <Header />
          <main className="mx-auto w-full max-w-[1920px] flex-1 px-4 lg:px-[200px] pb-[200px]">
            {children}
          </main>
          <div className="fixed bottom-0 left-0 z-50 w-full bg-white shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
            <Footer /> 
          </div>
        </QueryProvider>
      </body>
    </html>
  );
}