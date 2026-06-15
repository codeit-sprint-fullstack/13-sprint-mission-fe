import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className=" bg-secondary-900">
      <div
        className="max-w-[1920px] flex flex-wrap gap-6 items-center"
        style={{
          padding: "32px clamp(16px, calc(21.8vw - 135.8px), 200px)",
        }}
      >
        <div className="flex gap-[30px] mx-auto order-2 max-[465px]:order-1 max-[465px]:ml-0 max-[465px]:mr-auto">
          {/* max-[375px] */}
          <Link
            href="/privacy"
            className="text-secondary-200 no-underline text-base font-normal cursor-pointer "
          >
            Privacy Policy
          </Link>
          <Link
            href="/faq"
            className="text-secondary-200 no-underline text-base font-normal cursor-pointer"
          >
            FAQ
          </Link>
        </div>
        <div className="flex items-center gap-3 shrink-0 order-3 max-[465px]:order-2">
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex cursor-pointer"
          >
            <Image
              src="/icons/ic_facebook.svg"
              alt="facebook"
              width={20}
              height={20}
            />
          </a>
          <a
            href="https://www.twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex cursor-pointer"
          >
            <Image
              src="/icons/ic_twitter.svg"
              alt="twitter"
              width={20}
              height={20}
            />
          </a>
          <a
            href="https://www.youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex cursor-pointer"
          >
            <Image
              src="/icons/ic_youtube.svg"
              alt="youtube"
              width={20}
              height={20}
            />
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex cursor-pointer"
          >
            <Image
              src="/icons/ic_instagram.svg"
              alt="instagram"
              width={20}
              height={20}
            />
          </a>
        </div>
        <span className="text-secondary-400 text-base font-normal order-1 max-[465px]:order-3">
          ©codeit - 2024
        </span>
      </div>
    </footer>
  );
}
