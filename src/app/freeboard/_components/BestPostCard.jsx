import Image from "next/image";
import Link from "next/link";

// 실제 유저 데이터가 없어 post.id 기반으로 닉네임을 결정
const RANDOM_NICKNAMES = ["총명한판다", "든든한판다", "귀여운판다"];

// 베스트 게시글 카드 - Best 뱃지, 제목, 좋아요 수, 날짜를 표시
export default function BestPostCard({ post }) {
  if (!post) return null;
  const nickname = RANDOM_NICKNAMES[post.id % 3];
  // 좋아요 수가 9999 초과 시 "9999+"로 표시
  const likes = post.likeCount > 9999 ? "9999+" : post.likeCount;
  const date = new Date(post.createdAt)
    .toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .replace(/\. /g, ". ");

  return (
    <Link href={`/freeboard/${post.id}`}>
      <div className="flex flex-col gap-4 rounded-lg bg-gray-50 px-6 pb-4">
        {/* Best 뱃지 */}
        <span className="flex w-fit items-center gap-1 rounded-b-2xl bg-blue-500 px-6 py-0.5 text-lg font-semibold text-white">
          <Image src="/image/ic_medal.svg" alt="medal" width={16} height={16} />
          Best
        </span>

        {/* 제목 + 이미지 */}
        <div className="mb-10 flex items-center justify-between">
          <p className="flex-1 text-2lg font-semibold text-gray-800">
            {post.title}
          </p>
          <div className="justify-cente flex h-18 w-18 shrink-0 items-center rounded-lg border border-gray-200 bg-white px-3 py-3.5">
            <Image
              src={post.image || "/image/default.png"}
              alt="썸네일"
              width={48}
              height={44}
              className="object-cover"
            />
          </div>
        </div>

        {/* 하단 정보 */}
        <div className="flex items-center justify-between text-md text-gray-400">
          <div className="flex items-center gap-2">
            <span>{nickname}</span>
            <div className="flex items-center gap-1">
              <Image
                src="/image/ic_heart.svg"
                alt="heart"
                width={16}
                height={16}
              />
              <span>{likes}</span>
            </div>
          </div>
          <span>{date}</span>
        </div>
      </div>
    </Link>
  );
}
