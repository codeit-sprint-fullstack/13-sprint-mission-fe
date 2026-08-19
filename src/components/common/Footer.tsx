import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="bg-gray-900 w-full">
      <div className="page-container flex flex-col tablet:flex-row justify-between gap-6 py-8 items-start min-h-42">
        <div>
          <p
            className="
          font-normal text-[16px] text-white "
          >
            ©codeit - 2024
          </p>
        </div>
        <div className="flex flex-row justify-between gap-[30px]">
          <p
            className="
          font-normal text-[16px] text-white "
          >
            Privacy Policy
          </p>
          <p
            className="
          font-normal text-[16px] text-white "
          >
            FAQ
          </p>
        </div>
        <div className="flex flex-row justify-between gap-3">
          <Link
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/images/ic_facebook.png"
              width={18}
              height={18}
              alt="페이스북"
            />
          </Link>
          <Link
            href="https://www.x.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/images/ic_twitter.png"
              width={18}
              height={18}
              alt="트위터"
            />
          </Link>
          <Link
            href="https://www.youtube.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/images/ic_youtube.png"
              width={18}
              height={18}
              alt="유튜브"
            />
          </Link>
          <Link
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/images/ic_instagram.png"
              width={18}
              height={18}
              alt="인스타그램"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
