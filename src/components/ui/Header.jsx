import Link from "next/link";
import Button from "./Button";

export default function Header() {
  return (
    <header className="w-full h-[68px] flex items-center min-desktop:px-[200px] max-desktop:px-[24px] border-b-[1px] border-secondary-300">
      <div className="w-full flex items-center gap-[24px]">
        <Link href="/">
          <div className="flex gap-[10px] items-center text-primary font-bold text-[26px]">
            <img src={"/icons/ic_logo.svg"} />
            판다마켓
          </div>
        </Link>
        <nav className="font-bold text-[18px] text-secondary-600">
          <Link href="/community" className="px-[15px]">
            자유게시판
          </Link>
          <Link href="/items" className="px-[15px]">
            중고마켓
          </Link>
        </nav>
      </div>
      <Link href="/login">
        <Button variant="rectangle" className="bg-primary text-white">
          로그인
        </Button>
      </Link>
    </header>
  );
}
