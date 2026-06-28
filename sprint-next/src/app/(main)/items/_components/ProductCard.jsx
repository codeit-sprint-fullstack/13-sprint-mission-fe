import Image from "next/image";
import Link from "next/link";
import DefaultImg from "@/assets/png/img_board_default.png";
import HeartIcon from "@/assets/svg/ic_heart.svg";

export default function ProductCard({ product }) {
  return (
    <Link href={`/items/${product.id}`} className="flex flex-col gap-2">
      <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-gray-100">
        <Image
          src={product.images?.[0] ?? DefaultImg}
          alt={product.name}
          fill
          className="object-cover"
          onError={(e) => {
            e.target.src = DefaultImg.src;
          }}
          unoptimized={!!product.images?.[0]}
        />
      </div>
      <p className="text-sm font-medium text-gray-800 truncate">{product.name}</p>
      <p className="text-base font-bold text-gray-800">
        {product.price?.toLocaleString()}원
      </p>
      <div className="flex items-center gap-1">
        <Image src={HeartIcon} alt="좋아요" width={16} height={16} />
        <span className="text-xs font-medium text-gray-600">
          {product.favoriteCount ?? 0}
        </span>
      </div>
    </Link>
  );
}
