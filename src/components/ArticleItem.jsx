import Link from "next/link";

export default function ArticleItem({ article }) {
  return (
    <Link href={`/boards/${article.id}`}>
      <div className="border-b border-gray-200 bg-gray-50 px-4 py-6">
        {/* 윗줄: 제목 + 기본 이미지 */}
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-lg font-semibold text-gray-800">
            {article.title}
          </h2>
          <div className="flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-gray-100">
            {/* 기본 이미지 자리 (임의 처리) */}
            {/* 기본 이미지 (디폴트 이미지로 프론트 처리) */}
            <img
              src="/img/main/img-laptop.png"
              alt="게시글 기본 이미지"
              className="h-[72px] w-[72px] shrink-0 rounded-lg border border-gray-200 bg-white object-contain p-2"
            />
          </div>
        </div>

        {/* 아랫줄: 닉네임·날짜 + 좋아요 */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/img/main/ic_profile.svg" alt="" className="h-8 w-8" />
            <span className="text-sm text-gray-600">총명한 판다</span>
            <span className="text-sm text-gray-400">2024. 04. 16</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <span>♡</span>
            <span>9999+</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
