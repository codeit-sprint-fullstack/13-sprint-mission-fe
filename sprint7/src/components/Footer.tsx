import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-[#111827]">
     
      <div className="mx-auto flex min-h-[160px] w-full max-w-[1920] flex-col items-center justify-between gap-[10px] px-4 py-[32px] md:flex-row md:items-start lg:px-[200px]">
        <div className="font-['Pretendard'] text-[16px] font-normal text-[#9CA3AF]">
          ©codeit - 2024
        </div>

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
