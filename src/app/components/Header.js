import Link from 'next/link';
import Image from 'next/image';

// 자유게시판 · 중고마켓 공통 헤더
export default function Header({ active }) {
  return (
    <header className="sticky top-0 z-10 border-b border-[#dfdfdf] bg-white">
      <div className="mx-auto flex h-[70px] max-w-[1200px] items-center gap-8 px-6">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <Image src="/logo.svg" alt="판다마켓 로고" width={40} height={40} priority />
          <span className="text-2xl font-bold text-[#3692FF]">판다마켓</span>
        </Link>

        <nav className="flex items-center gap-8 text-lg font-semibold">
          <Link
            href="/boards"
            className={`transition-colors ${
              active === 'boards'
                ? 'text-[#3692FF]'
                : 'text-[#374151] hover:text-[#3692FF]'
            }`}
          >
            자유게시판
          </Link>
          <Link
            href="/items"
            className={`transition-colors ${
              active === 'market'
                ? 'text-[#3692FF]'
                : 'text-[#374151] hover:text-[#3692FF]'
            }`}
          >
            중고마켓
          </Link>
        </nav>

        <div className="ml-auto">
          <Link
            href="/login"
            className="flex h-10 w-[88px] items-center justify-center rounded-lg bg-[#3692FF] text-sm font-semibold text-white transition-colors hover:bg-blue-600"
          >
            로그인
          </Link>
        </div>
      </div>
    </header>
  );
}
