import Link from "next/link";
import Image from "next/image";
const DEFAULT_IMAGE = "/images/Img_article_ex.png";
const PROFILE_ICON = "/icons/ic_profile.svg";
const HEART_ICON = "/icons/ic_heart.svg";

const MOCK_NICKNAME = "총명한 판다";
const MOCK_LIKES = "9999+";

export default function ArticleListItem({ article }) {
  return (
    <Link
      href={`/community/${article.id}`}
      className="flex items-center justify-between py-5 border-b border-secondary-100 hover:bg-secondary-50 transition-colors px-1 gap-4"
    >
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-secondary-900 truncate mb-3">
          {article.title}
        </p>
        <div className="flex items-center gap-3 text-xs text-secondary-500">
          <div className="flex items-center gap-1.5">
            <Image
              src={PROFILE_ICON}
              alt=""
              width={20}
              height={20}
              className="rounded-full"
            />
            <span>{MOCK_NICKNAME}</span>
          </div>
          <span>{new Date(article.createdAt).toLocaleDateString("ko-KR")}</span>
          <span className="flex items-center gap-1">
            <Image src={HEART_ICON} alt="" width={14} height={14} />
            {MOCK_LIKES}
          </span>
        </div>
      </div>

      <div className="w-18 h-18 rounded-lg bg-white shrink-0 flex items-center justify-center">
        <Image
          src={DEFAULT_IMAGE}
          alt="게시글 이미지"
          width={48}
          height={44.571}
        />
      </div>
    </Link>
  );
}
