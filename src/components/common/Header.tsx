"use client";

import { useAuth } from "@/providers/providers";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  const getLinkClass = (href: string) =>
    `whitespace-nowrap font-bold text-[16px] tablet:text-[18px] px-[6px] tablet:px-[15px] py-[21px] ${
      pathname === href ? "text-primary-100" : "text-gray-600"
    }`;

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <>
      <div className="fixed top-0 left-0 z-100 h-17 w-full bg-white border-b border-solid border-gray-200">
        <div className="page-container h-full flex justify-between items-center gap-2">
          <div className="flex items-center gap-1 tablet:gap-2 min-w-0">
            <Link href="/">
              <div className="flex items-center gap-1 tablet:gap-2 mr-2 tablet:mr-6 my-3.75 h-10">
                <Image
                  src="/images/header-img.png"
                  width={40}
                  height={40}
                  alt="판다마켓 로고"
                  className="hidden tablet:block"
                />
                <p className="font-rokaf whitespace-nowrap text-primary-100 font-bold  text-[24px] tablet:text-[1.6rem]">
                  판다마켓
                </p>
              </div>
            </Link>
            <Link href="/community">
              <div className={getLinkClass("/community")}>자유게시판</div>
            </Link>
            <Link href="/items">
              <div className={getLinkClass("/items")}>중고마켓</div>
            </Link>
          </div>
          {user ? (
            <div className="flex items-center gap-2">
              <Image
                src={user.image ?? "/images/ic_profile.png"}
                width={40}
                height={40}
                alt="프로필"
                className="rounded-full"
              />
              <span className="font-normal text-[18px] text-gray-600 hidden tablet:block">
                {user.nickName}
              </span>
              <button
                type="button"
                onClick={handleLogout}
                className="whitespace-nowrap text-[14px] tablet:text-[16px] text-gray-500 underline cursor-pointer"
              >
                로그아웃
              </button>
            </div>
          ) : (
            <Link href="/login">
              <div className="whitespace-nowrap px-3.5 tablet:px-6 py-5.75 bg-primary-100 rounded-lg h-10.5 text-white font-bold text-[16px] tablet:text-[18px] my-3.5 flex items-center ">
                로그인
              </div>
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
