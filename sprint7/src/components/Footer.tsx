import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-[#111827]">
      {/* 
        피그마 레이아웃: padding: 32px 200px; height: 160px;
        반응형 대응: 데스크탑(md 이상)에서는 좌우 200px 패딩 유지, 모바일은 px-4로 자동 조절
      */}
      <div className="mx-auto flex min-h-[160px] w-full max-w-[1920] flex-col items-center justify-between gap-[10px] px-4 py-[32px] md:flex-row md:items-start lg:px-[200px]">
        {/* 카피라이트 영역 */}
        <div className="font-['Pretendard'] text-[16px] font-normal text-[#9CA3AF]">
          ©codeit - 2024
        </div>

        {/* 정책 및 FAQ 링크 영역 */}
        <div className="flex gap-6">
          <Link
            href="/privacy"
            className="font-['Pretendard'] text-[16px] font-normal text-[#E5E7EB] transition-colors hover:text-white"
          >
            Privacy Policy
          </Link>
          <Link
            href="/faq"
            className="font-['Pretendard'] text-[16px] font-normal text-[#E5E7EB] transition-colors hover:text-white"
          >
            FAQ
          </Link>
        </div>

        {/* SNS 아이콘 영역 */}
        <div className="flex gap-4">
          <Link
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="relative h-[20px] w-[20px] opacity-80 transition-opacity hover:opacity-100">
              <Image
                src="/images/ic_facebook.svg"
                alt="Facebook"
                fill
                className="object-contain"
              />
            </div>
          </Link>
          <Link
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="relative h-[20px] w-[20px] opacity-80 transition-opacity hover:opacity-100">
              <Image
                src="/images/ic_twitter.svg"
                alt="Twitter"
                fill
                className="object-contain"
              />
            </div>
          </Link>
          <Link
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="relative h-[20px] w-[20px] opacity-80 transition-opacity hover:opacity-100">
              <Image
                src="/images/ic_youtube.svg"
                alt="YouTube"
                fill
                className="object-contain"
              />
            </div>
          </Link>
          <Link
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="relative h-[20px] w-[20px] opacity-80 transition-opacity hover:opacity-100">
              <Image
                src="/images/ic_instagram.svg"
                alt="Instagram"
                fill
                className="object-contain"
              />
            </div>
          </Link>
        </div>
      </div>
    </footer>
  );
}
