import "./globals.css";
import "pretendard/dist/web/static/pretendard.css";
import Header from "@/components/Header";

export const metadata = {
  title: "판다마켓",
  description: "판다마켓 스프린트 미션",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="flex min-h-screen flex-col bg-gray-50 antialiased">
        <Header />
        {/* 각 페이지(page.tsx)의 내용이 렌더링되는 메인 컨테이너 */}
        <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
          {children}
        </main>
      </body>
    </html>
  );
}
