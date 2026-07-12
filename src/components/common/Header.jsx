"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { clsx } from "clsx";

import { NAVIGATION, WIDTH_HEADER_LIST } from "@/lib/constants/constants";
import { useAuth } from "@/providers/AuthProvider";

import Avatar from "@/components/common/Avatar";

import Logo from "@/app/assets/logo.svg";
import MobileLogo from "@/app/assets/logo_m.svg";

export default function Header() {
  const pathname = usePathname();
  const { user } = useAuth();

  if (WIDTH_HEADER_LIST.includes(pathname)) return null;

  return (
    <header className='h-[70px]'>
      <div className='fixed top-0 left-0 right-0 z-header bg-white border-b border-[#dfdfdf]'>
        <div className='flex items-center justify-between w-full max-w-[1200px] h-[70px] px-[16px] md:px-[24px] mx-auto '>
          <Link href='/'>
            <div className='flex-none'>
              <Image
                className='md:hidden'
                src={MobileLogo}
                alt='로고 이미지'
                width={81}
                height={40}
                priority
              />
              <Image
                className='hidden md:block'
                src={Logo}
                alt='로고 이미지'
                width={153}
                height={51}
                priority
              />
            </div>
          </Link>

          <nav className='flex-1 h-full px-[12px] md:px-[20px] xl:px-[24px]'>
            <ul className='flex items-center h-full'>
              {NAVIGATION.map((nav) => (
                <li key={nav.link} className='h-full'>
                  <Link
                    href={nav.link}
                    className={clsx(
                      pathname === nav.link
                        ? "text-primary-100"
                        : "text-secondary-600",
                      "flex items-center h-full px-1 md:px-[15px] text-[16px] md:text-[18px] font-bold leading-[1.625] text-center",
                    )}
                  >
                    {nav.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* 유저 프로필 + 닉네임 */}
          <Avatar user={user} />
        </div>
      </div>
    </header>
  );
}
