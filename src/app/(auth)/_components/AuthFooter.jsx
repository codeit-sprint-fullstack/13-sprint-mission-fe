import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function AuthFooter({ type }) {
  return (
    <footer className="flex flex-col gap-[24px]">
      <div className="flex h-[74px] w-full items-center justify-between rounded-[8px] border-none bg-[#E6F2FF] px-[23px] py-[16px]">
        <p className="text-secondary-800 text-[16px] font-[500]">
          간편 로그인하기
        </p>
        <div className="flex gap-[16px]">
          <a
            className="cursor-pointer"
            href="https://google.com"
            target="_blank"
          >
            <Image
              src="/ic_google.png"
              width={22}
              height={22}
              alt="구글 바로가기"
              className="h-[22px] w-[22px]"
            />
          </a>
          <a
            className="cursor-pointer"
            href="https://kakao.com"
            target="_blank"
          >
            <Image
              src="/ic_kakaotalk.svg"
              width={22}
              height={22}
              alt="카카오톡 바로가기"
              className="h-[22px] w-[22px]"
            />
          </a>
        </div>
      </div>
      <span className="flex justify-center gap-[8px]">
        {type === "login" ? (
          <>
            <p className="text-secondary-800 text-[14px] font-[500]">
              판다마켓이 처음이신가요?
            </p>
            <Link
              href="/signup"
              className="text-primary-100 text-[14px] font-[500] underline"
            >
              회원가입
            </Link>
          </>
        ) : (
          <>
            <p className="text-secondary-800 text-[14px] font-[500]">
              이미 회원이신가요?
            </p>
            <Link
              href="/login"
              className="text-primary-100 text-[14px] font-[500] underline"
            >
              로그인
            </Link>
          </>
        )}
      </span>
    </footer>
  );
}
