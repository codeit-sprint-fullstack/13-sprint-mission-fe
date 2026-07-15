import Image from "next/image";
import Link from "next/link";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

export default function PostCard({ post, onToggleLike }) {
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
      <div className="mb-6 bg-[#FCFCFC]">
        <div className="mb-4 flex items-start justify-between">
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

        <div className="flex items-center justify-between pb-6 text-md text-gray-600">
          <div className="flex items-center gap-2">
            <Image
              src={post.owner?.image || "/image/ic_profile.svg"}
              alt="프로필"
              width={24}
              height={24}
              className="rounded-full object-cover"
              unoptimized
            />
            <span>{nickname}</span>
            <span className="text-gray-400">{date}</span>
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              onToggleLike?.(post.id, post.isLiked);
            }}
            className="flex items-center gap-1"
          >
            {post.isLiked
              ? <AiFillHeart size={24} className="text-red-500" />
              : <AiOutlineHeart size={24} className="text-gray-600" />
            }
            <span className="text-lg">{likes}</span>
          </button>
        </div>
      </div>
    </Link>
  );
}
