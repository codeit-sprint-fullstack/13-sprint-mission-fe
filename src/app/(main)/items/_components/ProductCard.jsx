import React from "react";
import Image from "next/image";
import { AiOutlineHeart } from "react-icons/ai";

export default function ProductCard({ item }) {
  return (
    <div className="flex w-full flex-col gap-2">
      <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-gray-100">
        <Image
          src={item?.images?.[0] || "/image/default.png"}
          alt={item?.name || ""}
          fill
          sizes="(max-width: 744px) 50vw, (max-width: 1200px) 33vw, 25vw"
          className="object-cover"
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <div className="text-md font-medium text-gray-800">{item?.name}</div>
        <div className="text-lg font-bold text-gray-800">
          {item?.price?.toLocaleString("ko-KR")}원
        </div>
        <div className="flex items-center gap-1 text-xs font-medium text-gray-600">
          <AiOutlineHeart size={16} />
          <span>{item?.favoriteCount ?? 0}</span>
        </div>
      </div>
    </div>
  );
}
