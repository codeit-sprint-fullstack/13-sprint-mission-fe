import Link from "next/link";
import Image from "next/image";

const BEST_ICON = "/icons/ic_medal.svg";
const HEART_ICON = "/icons/ic_heart.svg";
const DEFAULT_IMAGE = "/images/Img_article_ex.png";

const MOCK_NICKNAME = "총명한 판다";
const MOCK_LIKES = "9999+";

export default function BestArticleCard({ article }) {
  return (
    <Link
      href={`/community/${article.id}`}
      className="block bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors"
    >
      {/* 배지 부분 */}
      <div className="inline-flex items-center gap-1 px-3 py-1 bg-blue-500 text-white text-xs font-semibold rounded-full mb-3">
        <Image src={BEST_ICON} alt="best" width={16} height={16} />
        Best
      </div>

      {/* Title + image */}
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm font-medium text-gray-900 line-clamp-2 leading-snug flex-1">
          {article.title}
        </p>
        <div className="w-18 h-18 rounded-lg bg-white shrink-0 flex items-center justify-center">
          <Image
            src={DEFAULT_IMAGE}
            alt="게시글 이미지"
            width={48}
            height={44.571}
          />
        </div>
      </div>

      <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
        <div className="flex items-center gap-2">
          <span>{MOCK_NICKNAME}</span>
          <Image src={HEART_ICON} alt="좋아요" width={16} height={16} />
          <span>{MOCK_LIKES}</span>
        </div>
        <span>{new Date(article.createdAt).toLocaleDateString("ko-KR")}</span>
      </div>
    </Link>
  );
}
