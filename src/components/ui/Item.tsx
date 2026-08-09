"use client";
import React from "react";
import { useRouter } from "next/navigation";

import Image from "next/image";

import { ProductType } from "@/types/product";

export default function Item({ data }: { data: ProductType }) {
  const router = useRouter();
  return (
    <div
      onClick={() => {
        router.push(`/items/${data.id}`);
      }}
      className="flex h-full w-full flex-col gap-[16px] cursor-pointer"
    >
      <Image
        src={
          !!data.images.length
            ? `${process.env.NEXT_PUBLIC_API_URL}/${data.images[0].url}`
            : "/images/item2.jpg"
        }
        alt={data.name}
        width={300}
        height={300}
        loading="lazy"
        unoptimized
        onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
          e.currentTarget.src = "/images/item2.jpg";
        }}
        className="aspect-square w-full rounded-[16px] object-cover"
      />

      <div className="flex flex-col gap-[8px]">
        <h2 className="text-[14px]">{data.name}</h2>

        <h3 className="text-[16px] font-bold">
          {data.price.toLocaleString()}원
        </h3>

        <div className="flex items-center gap-[2px] text-secondary-700">
          <Image
            src="/icons/ic_heart_empty.svg"
            alt="좋아요 아이콘"
            width={16}
            height={16}
          />
          <span>{data.favoriteCount}</span>
        </div>
      </div>
    </div>
  );
}
