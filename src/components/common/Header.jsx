import Image from "next/image";
import Link from "next/link";

import Button from "../ui/Button";

export default function Header() {
  return (
    <header className="w-full h-[68px] flex items-center min-desktop:px-[200px] max-desktop:px-[24px] border-b-[1px] border-secondary-300">
      <div className="w-full flex items-center gap-[24px] max-desktop:gap-[8px]">
        <Link href="/">
          <div className="flex gap-[10px] items-center text-primary font-bold text-[26px] max-tablet:text-[20px]">
            <Image
              src={"/icons/ic_logo.svg"}
              alt="logo icon"
              className="max-tablet:hidden"
              width={40}
              height={40}
            />
            판다마켓
          </div>
        </Link>
        <nav className="flex font-bold text-[18px] text-secondary-600 max-tablet:text-[16px] max-tablet:gap-2">
          <Link href="/community" className="px-[15px] max-tablet:px-0">
            자유게시판
          </Link>
          <Link href="/items" className="px-[15px] max-tablet:px-0">
            중고마켓
          </Link>
        </nav>
      </div>
      <Link href="/login">
        <Button
          variant="rectangle"
          className="bg-primary text-white max-tablet:text-[16px]"
        >
          로그인
        </Button>
      </Link>
    </header>
  );
}
