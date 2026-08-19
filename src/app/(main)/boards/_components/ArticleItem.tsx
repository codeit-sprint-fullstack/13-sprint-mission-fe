"use client";

import { Article } from "@/types/article";
import Image from "next/image";

interface ArticleItemProps {
  article: Article;
}

export default function ArticleItem({ article }: ArticleItemProps) {
  return (
    <li className="border-cool-gray-200 flex h-[138px] flex-col gap-[16px] border-b bg-[#FCFCFC]">
      <span className="flex justify-between gap-[8px]">
        <p className="text-[20px] font-[600]">{article.title}</p>
        <Image
          src="/default_img.jpg"
          alt="디폴트 이미지"
          width={72}
          height={72}
          className="h-[72px] w-[72px]"
        />
      </span>
      <span className="flex justify-between">
        <span className="flex h-[24px] items-center gap-[8px]">
          <Image
            src="/ic_profile.svg"
            alt="유저 기본 프로필"
            width={24}
            height={24}
          />
          <p className="text-secondary-600 text-[14px] font-[400]">
            {article.userName}
          </p>
          <p className="text-secondary-400 text-[14px] font-[400]">
            {article.createdAt.slice(0, 10)}
          </p>
        </span>
        <span className="w-[50px]">
          <p className="text-secondary-500 text-[16px] font-[400]">
            ❤ {article.favorite}
          </p>
        </span>
      </span>
    </li>
  );
}
