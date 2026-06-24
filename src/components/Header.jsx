import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 z-50 flex w-full h-[70px] justify-center bg-white border-b border-gray-200">
      <div className="flex w-full max-w-[1200px] items-center justify-between px-4 md:px-6">
        {/* 왼쪽: 로고 + 메뉴 */}
        <div className="flex items-center gap-4 md:gap-8">
          <Link href="/">
            <img src="/img/main/logo.png" alt="판다마켓 로고" className="h-7 md:h-10" />
          </Link>

          <nav className="flex gap-3 md:gap-6">
            <Link href="/" className="text-sm font-bold text-gray-600 md:text-lg">
              자유게시판
            </Link>
            <Link href="/" className="text-sm font-bold text-primary-100 md:text-lg">
              중고마켓
            </Link>
          </nav>
        </div>

        {/* 오른쪽: 로그인 버튼 */}
        <div>
          <Link
            href="/login"
            className="rounded-lg bg-primary-100 px-4 py-2 text-sm font-semibold text-white md:px-7 md:py-2.5"
          >
            로그인
          </Link>
        </div>
      </div>
    </header>
  );
}