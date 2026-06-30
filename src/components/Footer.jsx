import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mx-auto mt-[24px] flex h-[160px] w-full bg-[#111827] px-[16px] py-[32px] md:px-[24px] lg:px-[200px]">
      <div className="flex w-full justify-between">
        <div className="whitespace-nowrap text-[#9CA3AF]">@codeit - 2024</div>
        <div className="flex gap-[30px] whitespace-nowrap text-[#9CA3AF]">
          <Link href="/policy">
            <p>Policy</p>
          </Link>
          <Link href="/faq">
            <p>FAQ</p>
          </Link>
        </div>
        <div className="flex gap-[12px] whitespace-nowrap text-[#9CA3AF]">
          <Link href="https://facebook.com" target="_blank">
            <Image
              src="/ic_facebook.svg"
              alt="페이스북 아이콘"
              width={18}
              height={18}
            />
          </Link>
          <Link href="https://twitter.com" target="_blank">
            <Image
              src="/ic_twitter.svg"
              alt="트위터 아이콘"
              width={18}
              height={18}
            />
          </Link>
          <Link href="https://youtube.com" target="_blank">
            <Image
              src="/ic_youtube.svg"
              alt="유튜브 아이콘"
              width={18}
              height={18}
            />
          </Link>
          <Link href="https://instagram.com" target="_blank">
            <Image
              src="/ic_instagram.svg"
              alt="인스타그램 아이콘"
              width={18}
              height={18}
            />
          </Link>
        </div>
      </div>
    </footer>
  );
}
