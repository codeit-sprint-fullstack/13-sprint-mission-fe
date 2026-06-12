import Link from "next/link";

const DEFAULT_IMAGE = "/images/Img_article_ex.png";

export default function BestArticleCard({ article }) {
  return (
    <Link
      href={`/community/${article.id}`}
      className="block bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors"
    >
      {/* Best badge */}
      <div className="inline-flex items-center gap-1 px-3 py-1 bg-blue-500 text-white text-xs font-semibold rounded-full mb-3">
        🏆 Best
      </div>

      {/* Title + image */}
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm font-medium text-gray-900 line-clamp-2 leading-snug flex-1">
          {article.title}
        </p>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={DEFAULT_IMAGE}
          alt="게시글 이미지"
          className="w-14 h-14 rounded-lg object-cover shrink-0 bg-gray-200"
          //   onError={(e) => {
          //     e.target.src =
          //       "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='56'%3E%3Crect width='56' height='56' fill='%23e5e7eb'/%3E%3C/svg%3E";
          //   }}
        />
      </div>

      {/* Meta */}
      <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-gray-300" />
          <span>{article.writer?.nickname}</span>
          <span>♡ {article.likeCount}</span>
        </div>
        <span>{new Date(article.createdAt).toLocaleDateString("ko-KR")}</span>
      </div>
    </Link>
  );
}
