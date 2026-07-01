"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function GNB() {
  const [nickname, setNickname] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const savedNickname = localStorage.getItem("nickname");

    if (token && savedNickname) {
      setNickname(savedNickname);
    }
  }, []);
  return (
    <div className="flex max-w-[1920px] py-[0px] px-[200px] justify-between items-center">
      <div className="flex w-[893px] items-center gap-[24px] shrink-0">
        <div>배너</div>
        <div className="flex justify-center items-center">
          <div className="flex py-[21px] px-[15px] justify-center items-center gap-[10px]">
            자유게시판
          </div>
          <div className="flex py-[21px] px-[15px] justify-center items-center gap-[10px]">
            중고마켓
          </div>
        </div>
      </div>
      {nickname ? (
        <p className="font-medium text-[#4B5563]">{nickname}</p>
      ) : (
        <Link href="/signin">
          <button className="h-[42px] rounded-[8px] bg-[#3692FF] px-[23px]">
            <p className="text-white">로그인</p>
          </button>
        </Link>
      )}
    </div>
  );
}
