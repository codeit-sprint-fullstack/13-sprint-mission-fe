import Image from "next/image";
import { formatDate } from "@/utils/formatDate";

export default function ArticleBestCard({
  title,
  author,
  likeCount,
  createdAt,
}) {
  return (
    <div className="bg-gray-50 rounded-lg px-6 pt-0 pb-4 flex flex-col justify-between relative cursor-pointer">
      <div className="bg-brand-blue flex items-center gap-1 px-6 py-0.5 rounded-b-2xl w-fit">
        <Image
          src="/images/ic_medal.svg"
          alt="뱃지 아이콘"
          width={16}
          height={16}
        />
        <p className="text-white text-btn">Best</p>
      </div>
      <div className="flex items-start justify-between gap-2 pt-3">
        <h3 className="text-title-md text-gray-800 line-clamp-2 flex-1">
          {title}
        </h3>
        <div className="relative w-[48px] h-[48px]">
          <Image
            src="/images/placeholder-card.png"
            alt="게시글 이미지"
            fill
            sizes="48px"
            className="object-cover rounded-md"
          />
        </div>
      </div>
      <div className="flex items-center justify-between pt-4">
        <div className="flex items-center gap-2">
          <span className="text-body-sm text-gray-600">
            {author ?? "총명한판다"}
          </span>
          <div className="flex items-center gap-1">
            <Image
              src="/images/ic_heart.svg"
              alt="하트 아이콘"
              width={16}
              height={16}
              className="cursor-pointer"
            />
            <span className="text-body-sm text-gray-500">
              {likeCount >= 1000 ? "1K+" : likeCount}
            </span>
          </div>
        </div>
        <div className="text-body-sm text-gray-400">
          {formatDate(createdAt)}
        </div>
      </div>
    </div>
  );
}
