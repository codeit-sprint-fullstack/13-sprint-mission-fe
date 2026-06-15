import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-[70px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* 좌측 영역: 로고 + 네비게이션 메뉴 */}
        <div className="flex items-center gap-8">
          {/* 로고 영역 */}
          <Link
            href="/"
            className="flex h-[51px] w-[153px] items-end justify-center gap-[8.59px] pt-[5.017px] pb-[5.848px]"
          >
            <div className="relative h-[35px] w-[35px]">
              <Image
                src="/images/ic_panda.svg"
                alt="판다마켓 로고"
                fill
                className="object-contain"
              />
            </div>
            <span className="font-['ROKAF_Sans'] text-[25.63px] font-bold text-[#3692FF]">
              판다마켓
            </span>
          </Link>

          {/* 메뉴 영역 */}
          <nav className="flex items-center">
            <Link
              href="/board"
              className="flex items-center justify-center text-center font-['Pretendard'] text-[18px] font-bold leading-[26px] text-[#4B5563] transition-colors hover:text-[#3692FF]"
            >
              자유게시판
            </Link>
            <Link
              href="/items"
              className="flex items-center justify-center gap-[10px] px-[15px] py-[21px] text-center font-['Pretendard'] text-[18px] font-bold leading-[26px] text-[#4B5563] transition-colors hover:text-[#3692FF]"
            >
              중고마켓
            </Link>
          </nav>
        </div>

        {/* 우측 영역: 로그인 버튼 */}
        <div className="flex items-center">
          <Link
            href="/login"
            className="inline-flex h-[42px] items-center justify-center gap-[10px] rounded-[8px] bg-[#3692FF] px-[23px] py-[12px] text-sm font-medium text-white transition-colors hover:bg-blue-600"
          >
            로그인
          </Link>
        </div>
      </div>
    </header>
  );
}
