import { Post } from "@/lib/PostAPI";
import Image from "next/image";
import Link from "next/link";

export default function PostsCard({ post }: { post: Post }) {
  const { id, title, image, likeCount, createdAt, writer } = post;
  const date = new Date(createdAt).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  return (
    <Link
      href={`/community/${id}`}
      className="block bg-gray-50 rounded-lg p-6 hover:shadow-md transition"
    >
      <div className="flex justify-between items-start gap-5">
        <p className="text-gray-800 text-lg font-bold leading-snug mt-4 mb-6.5">
          {title}
        </p>
        <div className="relative shrink-0 size-22">
          <Image
            src={image || "/images/alt_image.png"}
            alt="자유게시판 게시글"
            fill
            sizes="88px"
            className="object-cover rounded-lg"
          />
        </div>
      </div>

      <div className="flex justify-between  gap-2 text-sm text-gray-400 mt-6">
        <div className="flex gap-2">
          <Image
            src="/images/ic_profile.png"
            width={24}
            height={24}
            alt="프로필 사진"
          />
          <span className="text-[14px]">{writer.nickname}</span>
          <span className="text-[14px]">{date}</span>
        </div>
        <span className="flex items-center gap-1 text-[16px]">
          ♡ {likeCount >= 9999 ? "9999+" : likeCount}
          {/* 9999개 이상 시 9999+로 표현 */}
        </span>
      </div>
    </Link>
  );
}
