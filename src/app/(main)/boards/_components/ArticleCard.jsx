import Image from "next/image";
import { formatDate } from "../../../../utils/formatDate";

export default function ArticleCard({ title, author, likeCount, createdAt }) {
  return (
    <div className="flex flex-col py-6 border-b border-gray-200 cursor-pointer">
      <div className="flex items-start justify-between gap-4 mb-4">
        <h3 className="text-title-md text-gray-800 flex-1">{title}</h3>
        <div className="relative w-[48px] h-[48px] shrink-0">
          <Image
            src="/images/placeholder-card.png"
            alt="게시글 이미지"
            fill
            sizes="48px"
            className="object-cover rounded-lg border border-gray-100"
          />
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image
            src="/images/ic_profile.svg"
            alt="프로필 아이콘"
            width={24}
            height={24}
          />
          <span className="text-body-sm text-gray-600">
            {author ?? "총명한판다"}
          </span>
          <span className="text-body-sm text-gray-400">
            {formatDate(createdAt)}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <Image
            src="/images/ic_heart.svg"
            alt="하트"
            width={24}
            height={24}
            className="cursor-pointer"
          />
          <span className="text-body-sm text-gray-500">
            {likeCount >= 1000 ? "1K+" : likeCount}
          </span>
        </div>
      </div>
    </div>
  );
}
