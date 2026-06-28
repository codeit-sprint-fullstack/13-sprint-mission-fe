import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full bg-gray-900 py-10">
      <div className="max-w-layout mx-auto w-full px-4 md:px-6 flex items-center justify-between">
        <p className="text-gray-400 text-body-md">©codeit - 2024</p>
        <nav className="flex items-center gap-8">
          <Link href="/policy" className="text-gray-200 text-body-md">
            Privacy Policy
          </Link>
          <Link href="/FAQ" className="text-gray-200 text-body-md">
            FAQ
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Image
            src="/images/ic_facebook.svg"
            alt="페이스북 아이콘"
            width={20}
            height={20}
          />
          <Image
            src="/images/ic_twitter.svg"
            alt="트위터 아이콘"
            width={20}
            height={20}
          />
          <Image
            src="/images/ic_youtube.svg"
            alt="유튜브 아이콘"
            width={20}
            height={20}
          />
          <Image
            src="/images/ic_instagram.svg"
            alt="인스타그램 아이콘"
            width={20}
            height={20}
          />
        </div>
      </div>
    </footer>
  );
}
