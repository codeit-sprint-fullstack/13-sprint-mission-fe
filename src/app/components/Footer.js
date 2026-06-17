import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="mt-20 bg-[#111827]">
      <div className="mx-auto flex min-h-40 max-w-[1200px] items-start justify-between gap-6 px-6 py-8 text-sm text-[#9CA3AF]">
        <span className="order-2 sm:order-1">©codeit - 2024</span>
        <nav className="order-1 flex gap-8 sm:order-2">
          <Link href="/privacy" className="transition-colors hover:text-white">
            Privacy Policy
          </Link>
          <Link href="/faq" className="transition-colors hover:text-white">
            FAQ
          </Link>
        </nav>
        <div className="order-3 hidden gap-4 text-white sm:flex" aria-label="소셜 링크">
          <span>f</span>
          <span>t</span>
          <span>▶</span>
          <span>◎</span>
        </div>
      </div>
    </footer>
  );
}
