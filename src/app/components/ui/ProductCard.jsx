import React from "react";
import Link from "next/link";
import Image from "next/image";
import { resolveImageUrl } from "@/app/lib/fetchClient";

export default function ProductCard({ product }) {
  return (
    <Link
      href={`/items/${product.id}`}
      className="flex flex-col gap-3 cursor-pointer no-underline"
    >
      <div className="w-full aspect-square rounded-xl overflow-hidden bg-gray-100">
        {product.images?.[0] ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={resolveImageUrl(product.images[0])}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
            이미지 없음
          </div>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-sm font-medium text-gray-800 truncate">
          {product.name}
        </p>
        <p className="text-base font-bold text-gray-900">
          {product.price.toLocaleString()}원
        </p>
        <div className="flex items-center gap-1 text-gray-500 text-sm">
          <Image
            src="/icons/ic_heart.svg"
            alt="좋아요"
            width={16}
            height={16}
          />
          <span>{product._count?.likes}</span>
        </div>
      </div>
    </Link>
  );
}
