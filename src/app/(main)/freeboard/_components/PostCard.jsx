import Image from "next/image";
import Link from "next/link";

// 실제 유저 데이터가 없어 post.id 기반으로 닉네임을 결정
const RANDOM_NICKNAMES = ["총명한판다", "든든한판다", "귀여운판다"];

// 게시글 목록 카드 - 제목, 프로필, 날짜, 좋아요 수를 표시
export default function PostCard({ post }) {
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
      <div className="mb-6 bg-[#FCFCFC]">
        {/* 제목 + 이미지 */}
        <div className="mb-4 flex items-start justify-between">
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
        <div className="flex items-center justify-between pb-6 text-md text-gray-600">
          <div className="flex items-center gap-2">
            <Image
              src="/image/ic_profile.svg"
              alt="프로필"
              width={24}
              height={24}
              className="object-cover"
            />
            <span>{nickname}</span>
            <span className="text-gray-400">{date}</span>
          </div>
          <div className="flex items-center gap-1">
            <Image
              src="/image/ic_heart.svg"
              alt="heart"
              width={24}
              height={24}
            />
            <span className="text-lg">{likes}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
