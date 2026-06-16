import Image from "next/image";
import Link from "next/link";
import Logo from "@/assets/svg/panda_logo.svg";
import NavLinks from "@/components/common/NavLinks";

export default function Header() {
  return (
    <header className="w-full bg-white h-17.5 flex items-center justify-between border-b px-4 border-gray-200 fixed ">
      <div className="flex items-center gap-4 text-nowrap">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src={Logo}
            alt="판다마켓 로고"
            width={32}
            height={32}
            className="hidden md:block"
          />
          <span className="font-rokf font-bold text-[1.3rem] text-primary-100">
            판다마켓
          </span>
        </Link>

        <NavLinks />
      </div>

      <Link
        href="/login"
        className="bg-primary-100 hover:bg-primary-200 text-nowrap text-white font-medium px-5 py-2 rounded-lg transition-colors ml-4 "
      >
        로그인
      </Link>
    </header>
  );
}
