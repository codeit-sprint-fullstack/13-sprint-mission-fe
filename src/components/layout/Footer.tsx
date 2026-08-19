import Link from "next/link";
import Image from "next/image";

interface SocialLink {
  href: string;
  src: string;
  alt: string;
}

const socialLinks: SocialLink[] = [
  { href: "https://facebook.com", src: "/image/ic_facebook.png", alt: "facebook" },
  { href: "https://twitter.com", src: "/image/ic_twitter.png", alt: "twitter" },
  { href: "https://youtube.com", src: "/image/ic_youtube.png", alt: "youtube" },
  { href: "https://instagram.com", src: "/image/ic_instagram.png", alt: "instagram" },
];

export default function Footer() {
  return (
    <footer className="h-40 w-full bg-gray-900 px-4 py-8 md:px-6 lg:px-100">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="flex justify-between md:contents">
          <div className="flex gap-7.5 text-lg text-gray-200 md:order-2">
            <Link href="/privacy">privacy Policy</Link>
            <Link href="/faq">FAQ</Link>
          </div>
          <div className="flex gap-3 md:order-3">
            {socialLinks.map(({ href, src, alt }) => (
              <Link key={alt} href={href} target="_blank">
                <Image src={src} alt={alt} width={20} height={20} />
              </Link>
            ))}
          </div>
        </div>
        <span className="text-4 mt-6 block text-gray-400 md:order-1 md:mt-0">
          ©codeit - 2024
        </span>
      </div>
    </footer>
  );
}