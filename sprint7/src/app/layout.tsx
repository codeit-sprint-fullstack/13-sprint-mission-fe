import "./globals.css";
import "pretendard/dist/web/static/pretendard.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "판다마켓",
  description: "판다마켓 스프린트 미션7",
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
        
        {/* 변경점 1: 본문 영역 하단에 pb-[200px]을 추가했습니다.
          고정된 푸터가 게시글 마지막 부분과 로딩 스피너를 가리지 않도록 공간을 확보합니다.
        */}
        <main className="mx-auto w-full max-w-[1920px] flex-1 px-4 lg:px-[200px] pb-[200px]">
          {children}
        </main>

        {/* 변경점 2: Footer를 fixed 속성으로 묶어 화면 맨 아래에 고정했습니다.
          배경색(bg-white)과 상단 그림자(shadow)를 주어 게시글 위로 떠 있는 느낌을 줍니다.
        */}
        <div className="fixed bottom-0 left-0 z-50 w-full bg-white shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
          <Footer />
        </div>
        
      </body>
    </html>
  );
}