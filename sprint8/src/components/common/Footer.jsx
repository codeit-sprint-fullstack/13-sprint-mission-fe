import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#171924] text-gray-400 py-8 mt-auto w-full">
      <div className="container mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="text-sm">
          <span>© codeit - 2026</span>
        </div>

        <div className="flex gap-6 text-sm font-medium">
          <Link href="/privacy" className="hover:text-white transition">
            Privacy Policy
          </Link>
          <Link href="/faq" className="hover:text-white transition">
            FAQ
          </Link>
        </div>

        <div className="flex gap-3">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80 transition"
          >
            <Image
              src="/facebook-icon.png"
              alt="facebook"
              width={20}
              height={20}
            />
          </a>

          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80 transition"
          >
            <Image
              src="/twitter-icon.png"
              alt="twitter"
              width={20}
              height={20}
            />
          </a>

          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80 transition"
          >
            <Image
              src="/youtube-icon.png"
              alt="youtube"
              width={20}
              height={20}
            />
          </a>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80 transition"
          >
            <Image
              src="/instagram-icon.png"
              alt="instagram"
              width={20}
              height={20}
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
