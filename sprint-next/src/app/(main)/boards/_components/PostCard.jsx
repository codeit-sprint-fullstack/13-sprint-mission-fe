import Image from "next/image";
import Link from "next/link";
import DefaultImage from "@/assets/png/img_board_default.png";
import DefaultProfile from "@/assets/png/img_default_profile.png";

export default function PostCard({
  id,
  title,
  author,
  likeCount,
  date,
  image,
}) {
  const displayLike = likeCount > 9999 ? "9999+" : likeCount;

  return (
    <Link
      href={`/boards/${id}`}
      className="flex flex-col gap-3 md:gap-3 lg:gap-4 py-4 md:py-4 lg:py-5 border-b border-gray-100 hover:bg-gray-50 transition-colors -mx-1 px-1 rounded"
    >
      <div className="flex items-start justify-between gap-3 md:gap-3 lg:gap-4">
        <p className="text-sm md:text-base lg:text-lg font-bold text-gray-800 leading-snug flex-1">
          {title}
        </p>
        <div className="w-16 h-16 md:w-17 md:h-17 lg:w-18 lg:h-18 rounded-2xl overflow-hidden border border-gray-200 shrink-0">
          <Image
            src={image ?? DefaultImage}
            alt="게시글 이미지"
            width={72}
            height={72}
            className="object-cover w-full h-full"
          />
        </div>
      </div>

      <div className="flex items-center justify-between text-xs md:text-sm lg:text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <Image
            src={DefaultProfile}
            alt="프로필"
            width={24}
            height={24}
            className="rounded-full w-5 h-5 md:w-6 md:h-6 lg:w-6 lg:h-6"
          />
          <span>{author}</span>
          <span>{date}</span>
        </div>
        <span className="flex items-center gap-1">♡ {displayLike}</span>
      </div>
    </Link>
  );
}
