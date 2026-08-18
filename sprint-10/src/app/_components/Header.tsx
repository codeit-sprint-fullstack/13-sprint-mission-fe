import Image from "next/image";
import Link from "next/link";
import { UserProfile } from "@/entities/user";
import Logo from "@/assets/svg/panda_logo.svg";
import NavLinks from "./NavLinks";

export default function Header() {
  return (
    <header className="w-full bg-white h-17.5 flex items-center justify-between border-b border-gray-200 px-4 md:px-6 lg:px-50 fixed top-0 left-0 z-50">
      <div className="flex items-center gap-6 text-nowrap">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src={Logo}
            alt="판다마켓 로고"
            width={32}
            height={32}
            className="hidden md:block w-8 h-8"
          />
          <span className="font-rokaf font-bold text-xl text-primary-100">
            판다마켓
          </span>
        </Link>

        <NavLinks />
      </div>

      <UserProfile />
    </header>
  );
}
