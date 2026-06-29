import React from "react";

import Image from "next/image";

export default function Item({ data }) {
  return (
    <div
      className="
        flex h-full w-full flex-col gap-[16px]
        cursor-pointer
      "
    >
      <Image
        src="/images/item2.jpg"
        alt={data.name}
        width={300}
        height={300}
        loading="lazy"
        onError={(e) => {
          e.target.src = "/images/item2.jpg";
        }}
        className="
          aspect-square
          w-full
          rounded-[16px]
          object-cover
        "
      />

      <div className="flex flex-col gap-[8px]">
        <h2 className="text-[14px]">{data.name}</h2>

        <h3 className="text-[16px] font-bold">
          {data.price.toLocaleString()}원
        </h3>

        <div className="flex items-center gap-[2px] text-secondary-700">
          <Image
            src="/icons/ic_heart_empty.svg"
            alt="좋아요"
            width={16}
            height={16}
          />
          <span>{data.favoriteCount}</span>
        </div>
      </div>
    </div>
  );
}
