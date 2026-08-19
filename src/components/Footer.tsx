import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-20 w-full bg-gray-900">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-center gap-4 px-6 py-8 md:h-40 md:flex-row md:justify-between md:py-0">
        <div className="text-base font-bold text-white">©codeit - 2024</div>

        <div className="flex gap-8 text-sm font-medium text-white">
          <Link className="hover:text-panda-primary" href="/privacy">Privacy Policy</Link>
          <Link className="hover:text-panda-primary" href="/faq">FAQ</Link>
        </div>

        <div className="flex gap-4">
          <a href="https://facebook.com" target="_blank" rel="noreferrer">
            <img className="block h-6 w-6" src="/image/ic_facebook.png" alt="페이스북" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer">
            <img className="block h-6 w-6" src="/image/ic_twitter.png" alt="트위터" />
          </a>
          <a href="https://youtube.com" target="_blank" rel="noreferrer">
            <img className="block h-6 w-6" src="/image/ic_youtube.png" alt="유튜브" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer">
            <img className="block h-6 w-6" src="/image/ic_instagram.png" alt="인스타그램" />
          </a>
        </div>
      </div>
    </footer>
  );
}
