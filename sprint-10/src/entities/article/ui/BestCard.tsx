import Image from "next/image";
import Link from "next/link";
import MedalIcon from "@/assets/svg/ic_medal.svg";
import DefaultImage from "@/assets/png/img_board_default.png";
import { formatDate } from "@/shared/lib/formatDate";
import type { Article } from "../model/types";

export default function BestCard({ article }: { article: Article }) {
  const displayLike = article.favoriteCount > 9999 ? "9999+" : article.favoriteCount;

  return (
    <Link
      href={`/boards/${article.id}`}
      className="bg-gray-50 rounded-2xl px-4 md:px-5 lg:px-6 pb-4 md:pb-5 lg:pb-6 flex flex-col gap-3 md:gap-3 lg:gap-4 hover:shadow-md transition-shadow"
    >
      <span className="flex items-center gap-1 bg-blue-500 text-white text-xs md:text-sm lg:text-sm font-bold px-4 md:px-5 lg:px-6 py-1 rounded-b-md w-fit">
        <Image src={MedalIcon} alt="best" width={16} height={16} />
        Best
      </span>

      <div className="flex items-start justify-between gap-3 md:gap-3 lg:gap-4">
        <p className="text-sm md:text-base lg:text-base font-semibold text-gray-800 leading-snug flex-1 line-clamp-2">
          {article.title}
        </p>
        <div className="w-16 h-16 md:w-17 md:h-17 lg:w-18 lg:h-18 rounded-lg overflow-hidden border border-gray-200 shrink-0">
          <Image
            src={DefaultImage}
            alt="게시글 이미지"
            width={72}
            height={72}
            className="object-cover w-full h-full"
          />
        </div>
      </div>

      <div className="flex items-center justify-between text-xs md:text-sm lg:text-sm text-gray-400">
        <div className="flex items-center gap-2">
          <span>{article.user.nickname}</span>
          <span className="flex items-center gap-1">♡ {displayLike}</span>
        </div>
        <span>{formatDate(article.createdAt)}</span>
      </div>
    </Link>
  );
}
