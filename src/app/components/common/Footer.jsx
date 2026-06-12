import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-[70px] bg-gray-900 h-[160px]">
      <div className="h-full max-w-[1920px] mx-auto px-[200px] flex items-center justify-center">
        <span className="text-gray-400 text-base font-normal">©codeit - 2024</span>
        <div className="flex gap-[30px] mx-auto">
          <Link href="/privacy" className="text-gray-200 no-underline text-base font-normal cursor-pointer">
            Privacy Policy
          </Link>
          <Link href="/faq" className="text-gray-200 no-underline text-base font-normal cursor-pointer">
            FAQ
          </Link>
        </div>
        <div className="flex gap-3 items-center shrink-0">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="flex cursor-pointer">
            <Image src="/icons/ic_facebook.svg" alt="facebook" width={20} height={20} />
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="flex cursor-pointer">
            <Image src="/icons/ic_twitter.svg" alt="twitter" width={20} height={20} />
          </a>
          <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="flex cursor-pointer">
            <Image src="/icons/ic_youtube.svg" alt="youtube" width={20} height={20} />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="flex cursor-pointer">
            <Image src="/icons/ic_instagram.svg" alt="instagram" width={20} height={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}
