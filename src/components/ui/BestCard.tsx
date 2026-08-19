import { Post } from "@/lib/PostAPI";
import Image from "next/image";
import Link from "next/link";

export default function BestCard({ post }: { post: Post }) {
  const { id, title, image, likeCount, createdAt, writer } = post;
  const date = new Date(createdAt).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  return (
    <Link
      href={`/community/${id}`}
      className="block bg-gray-50 rounded-lg hover:shadow-md transition"
    >
      <span className="inline-flex items-center gap-1 bg-primary-100 text-white text-sm font-bold px-3 py-1 rounded-b-2xl ml-6">
        🏆 Best
      </span>
      <div className="flex justify-between items-start gap-5 px-6">
        <p className="text-gray-800 text-lg font-bold leading-snug mt-4 mb-6.5">
          {title}
        </p>
        <div className="relative shrink-0 size-22">
          <Image
            src={image || "/images/alt_image.png"}
            alt={title}
            fill
            sizes="88px"
            className="object-cover rounded-lg"
          />
        </div>
      </div>
      <div className="flex items-center gap-2 text-sm text-gray-400 mt-6 px-6 pb-6">
        <span>{writer.nickname}</span>
        <span className="flex items-center gap-1">
          ♡ {likeCount >= 9999 ? "9999+" : likeCount}
        </span>
        <span className="ml-auto">{date}</span>
      </div>
    </Link>
  );
}
