import { SOCIAL_LINKS } from "@/constants/navigation";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <div className="bg-secondary-900 flex h-40 justify-between px-100 py-8">
      <div className="text-secondary-400 text-center text-[1rem] font-normal">
        @codeit - 2026
      </div>
      <div className="text-secondary-200 flex gap-[1.88rem] text-center text-[1rem] font-normal">
        <Link href="/privacy-policy">Privacy Policy</Link>
        <Link href="/faq">FAQ</Link>
      </div>
      <ul className="flex gap-3">
        {SOCIAL_LINKS.map((link) => (
          <li key={link.id}>
            <a href={link.href} target="_blank" rel="noopener noreferrer">
              <Image
                src={link.src}
                alt={link.alt}
                width={20}
                height={20}
                className="h-5 w-5"
              ></Image>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
