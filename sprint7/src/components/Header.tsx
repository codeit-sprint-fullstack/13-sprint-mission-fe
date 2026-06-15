import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    // 하단 테두리 색상을 #DFDFDF로 수정했습니다.
    <header className="sticky top-0 z-50 w-full border-b border-[#DFDFDF] bg-[#FFF]">
      {/* 최대 너비 1920px, 데스크탑(lg) 기준 좌우 패딩 200px 적용 */}
      <div className="mx-auto flex h-[70px] w-full max-w-[1920px] items-center justify-between px-4 lg:px-[200px]">
        {/* 좌측 영역: 로고 + 네비게이션 메뉴 */}
        <div className="flex items-center gap-8">
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
