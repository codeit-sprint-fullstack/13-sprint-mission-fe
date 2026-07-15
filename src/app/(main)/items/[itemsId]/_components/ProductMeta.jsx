import Image from "next/image";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

export default function ProductMeta({ product, isFavorite, onFavoriteToggle }) {
  return (
    <div className="flex items-center justify-between border-b border-gray-200 py-4">
      <div className="flex items-center gap-4">
        <Image
          src={product?.owner?.image || "/image/ic_profile.svg"}
          alt="프로필"
          width={40}
          height={40}
          className="rounded-full object-cover"
          unoptimized
        />
        <div className="flex flex-col gap-0.5">
          <span className="text-md text-gray-600">
            {product?.owner?.nickname}
          </span>
          <span className="text-md text-gray-400">
            {new Date(product?.createdAt).toLocaleDateString("ko-KR")}
          </span>
        </div>
      </div>

      <button
        onClick={onFavoriteToggle}
        className="flex items-center gap-1 rounded-full border border-gray-200 px-3 py-1"
      >
        {isFavorite ? (
          <AiFillHeart className="text-error size-6 lg:size-8" />
        ) : (
          <AiOutlineHeart className="size-6 text-gray-400 lg:size-8" />
        )}
        <span className="text-lg text-gray-500">
          {product?.likeCount ?? 0}
        </span>
      </button>
    </div>
  );
}
