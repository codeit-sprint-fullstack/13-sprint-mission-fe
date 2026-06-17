import Image from "next/image";
import DefaultImage from "@/assets/png/borad_default.png";

export default function PostCard({ title, author, likeCount, date, image }) {
  const displayLike = likeCount > 9999 ? "9999+" : likeCount;

  return (
    <div className="flex flex-col gap-4 py-4 border-b border-gray-100">
      <div className="flex items-start justify-between gap-4">
        <p className="text-base font-bold text-gray-800 leading-snug flex-1">
          {title}
        </p>
        <div className="w-18 h-18 rounded-2xl overflow-hidden border border-gray-200 shrink-0">
          <Image
            src={image ?? DefaultImage}
            alt="게시글 이미지"
            width={72}
            height={72}
            className="object-cover w-full h-full"
          />
        </div>
      </div>

      <div className="flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center gap-2">
          {/* 나중에 유저 프로필 생기면 유저 프로필로 대체 */}
          <span className="w-6 h-6 rounded-full bg-gray-200" />
          <span>{author}</span>
          <span>{date}</span>
        </div>
        <span className="flex items-center gap-1">♡ {displayLike}</span>
      </div>
    </div>
  );
}
