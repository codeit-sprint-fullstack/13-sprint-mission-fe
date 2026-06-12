import Link from "next/link";
import Image from "next/image";
import defaultThumbnail from "../../../../public/images/Img_article_ex.png";
import profileIcon from "../../../../public/icons/ic_profile.svg";
import heartIcon from "../../../../public/icons/ic_heart.svg";

const MOCK_NICKNAME = "총명한 판다";
const MOCK_LIKES = "9999+";

export default function ArticleListItem({ article }) {
  return (
    <Link
      href={`/boards/${article.id}`}
      className="flex items-center justify-between py-5 border-b border-gray-100 hover:bg-gray-50 transition-colors px-1 gap-4"
    >
      {/* Left: title + meta */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate mb-3">
          {article.title}
        </p>
        <div className="flex items-center gap-3 text-xs text-gray-500">
          <div className="flex items-center gap-1.5">
            <Image
              src={profileIcon}
              alt=""
              width={20}
              height={20}
              className="rounded-full"
            />
            <span>{MOCK_NICKNAME}</span>
          </div>
          <span>{new Date(article.createdAt).toLocaleDateString("ko-KR")}</span>
          <span className="flex items-center gap-1">
            <Image src={heartIcon} alt="" width={14} height={14} />
            {MOCK_LIKES}
          </span>
        </div>
      </div>

      {/* Right: default thumbnail */}
      <Image
        src={defaultThumbnail}
        alt="게시글 이미지"
        width={64}
        height={64}
        className="rounded-lg object-cover flex-shrink-0 bg-gray-100"
      />
    </Link>
  );
}
