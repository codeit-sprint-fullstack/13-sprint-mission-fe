import Image from "next/image";
import FacebookIcon from "@/assets/svg/ic_facebook.svg";
import TwitterIcon from "@/assets/svg/ic_twitter.svg";
import YoutubeIcon from "@/assets/svg/ic_youtube.svg";
import InstagramIcon from "@/assets/svg/ic_instagram.svg";

const SOCIAL_LINKS = [
  { name: "Facebook", icon: FacebookIcon, href: "https://facebook.com" },
  { name: "Twitter", icon: TwitterIcon, href: "https://twitter.com" },
  { name: "Youtube", icon: YoutubeIcon, href: "https://youtube.com" },
  { name: "Instagram", icon: InstagramIcon, href: "https://instagram.com" },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 w-full px-4 md:px-6 lg:px-20 py-6 md:py-8 lg:py-8 flex flex-wrap md:flex-nowrap md:items-center md:justify-between gap-y-4 md:gap-0 lg:gap-0 lg:pb-24 ">
      {/* 모바일: 첫째 줄 왼쪽 | 태블릿~데스크탑: 가운데 */}
      <nav className="flex gap-4 md:gap-6 text-gray-400 text-sm order-1 md:order-2">
        <a href="/privacy" className="hover:text-white transition-colors">
          Privacy Policy
        </a>
        <a href="/faq" className="hover:text-white transition-colors">
          FAQ
        </a>
      </nav>

      {/* 모바일: 첫째 줄 오른쪽(ml-auto) | 태블릿~데스크탑: 오른쪽 */}
      <div className="flex gap-3 ml-auto md:ml-0 order-1 md:order-3">
        {SOCIAL_LINKS.map(({ name, icon, href }) => (
          <a
            key={name}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={name}
          >
            <Image src={icon} alt="" width={20} height={20} />
          </a>
        ))}
      </div>

      {/* 모바일: 둘째 줄(w-full로 줄 바꿈) | 태블릿~데스크탑: 왼쪽 */}
      <span className="text-gray-400 text-sm w-full md:w-auto order-2 md:order-1">
        ©codeit · 2024
      </span>
    </footer>
  );
}
