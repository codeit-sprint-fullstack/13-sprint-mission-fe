import Image from "next/image";
import Link from "next/link";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

export default function BestPostCard({ post, onToggleLike }) {
  if (!post) return null;
  const nickname = post.owner?.nickname ?? "판다";
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
        <span className="flex w-fit items-center gap-1 rounded-b-2xl bg-blue-500 px-6 py-0.5 text-lg font-semibold text-white">
          <Image src="/image/ic_medal.svg" alt="medal" width={16} height={16} />
          Best
        </span>

        <div className="mb-10 flex items-center justify-between">
          <p className="flex-1 text-2lg font-semibold text-gray-800">
            {post.title}
          </p>
          <div className="justify-cente flex h-18 w-18 shrink-0 items-center rounded-lg border border-gray-200 bg-white px-3 py-3.5">
            <Image
              src={post.images?.[0] || "/image/default.png"}
              alt="썸네일"
              width={48}
              height={44}
              className="object-cover"
              unoptimized
            />
          </div>
        </div>

        <div className="flex items-center justify-between text-md text-gray-400">
          <div className="flex items-center gap-2">
            <span>{nickname}</span>
            <button
              onClick={(e) => {
                e.preventDefault();
                onToggleLike?.(post.id, post.isLiked);
              }}
              className="flex items-center gap-1"
            >
              {post.isLiked
                ? <AiFillHeart size={16} className="text-red-500" />
                : <AiOutlineHeart size={16} />
              }
              <span>{likes}</span>
            </button>
          </div>
          <span>{date}</span>
        </div>
      </div>
    </Link>
  );
}
