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
    <footer className="bg-gray-900 w-full px-4 py-8 flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <nav className="flex gap-4 text-gray-400 text-sm">
          <a href="/privacy" className="hover:text-white transition-colors">
            Privacy Policy
          </a>
          <a href="/faq" className="hover:text-white transition-colors">
            FAQ
          </a>
        </nav>

        <div className="flex gap-3">
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
      </div>

      <span className="text-gray-400 text-sm pb-8">©codeit - 2024</span>
    </footer>
  );
}
