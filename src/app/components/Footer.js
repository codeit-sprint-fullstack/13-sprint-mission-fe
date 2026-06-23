import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#111827] text-[#9ca3af] py-[30px] border-t border-[#1f2937] font-sans">
      <div className="max-w-[1200px] mx-auto px-5 flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0">
        <div className="flex-1 w-full flex justify-center md:justify-start text-[0.95rem]">
          <span>©codeit - 2024</span>
        </div>

        <div className="flex-1 flex justify-center gap-8 text-[0.95rem]">
          <Link
            href="/privacy"
            className="text-[#d1d5db] hover:text-white transition-colors duration-200"
          >
            Privacy Policy
          </Link>
          <Link
            href="/faq"
            className="text-[#d1d5db] hover:text-white transition-colors duration-200"
          >
            FAQ
          </Link>
        </div>

        <div className="flex-1 flex justify-center md:justify-end gap-5 w-full">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="flex items-center text-[#d1d5db] transition-all duration-200 hover:text-white hover:-translate-y-0.5"
          >
            <Image
              src="/ic_facebook.png"
              alt="Facebook"
              width={20}
              height={20}
              className="object-contain"
            />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
            className="flex items-center text-[#d1d5db] transition-all duration-200 hover:text-white hover:-translate-y-0.5"
          >
            <Image
              src="/ic_twitter.png"
              alt="Twitter"
              width={20}
              height={20}
              className="object-contain"
            />
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
            className="flex items-center text-[#d1d5db] transition-all duration-200 hover:text-white hover:-translate-y-0.5"
          >
            <Image
              src="/ic_youtube.png"
              alt="YouTube"
              width={20}
              height={20}
              className="object-contain"
            />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="flex items-center text-[#d1d5db] transition-all duration-200 hover:text-white hover:-translate-y-0.5"
          >
            <Image
              src="/ic_instagram.png"
              alt="Instagram"
              width={20}
              height={20}
              className="object-contain"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
