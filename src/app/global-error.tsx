"use client";

import Image from "next/image";
import localFont from "next/font/local";

import Button from "@/components/common/Button";

import Logo from "@/app/assets/logo_login.svg";

const pretendard = localFont({
  src: "./fonts/Pretendard/PretendardVariable.woff2",
  weight: "100 900",
  variable: "--font-pretendard",
  display: "swap",
});

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang='ko' className={`${pretendard.variable} h-full antialiased`}>
      <body className='h-[100vh] pt-[calc(50vh-250px)] min-h-full flex flex-col items-center font-pretendard'>
        <Image
          src={Logo}
          alt='로고 이미지'
          width={396}
          height={132}
          sizes='(max-width: 744px) 196px, 396px'
          className='mx-auto w-[196px] h-[66px] md:w-[396px] md:h-[132px] mb-[24px] md:mb-[40px]'
        />
        <h2 className='mb-[24px] text-[20px] font-medium text-secondary-800'>
          일시적인 오류가 발생했습니다.
        </h2>
        <Button onClick={() => reset()}>다시 시도하기</Button>
      </body>
    </html>
  );
}
