"use client";

import Image, { StaticImageData } from "next/image";
import heartIcon from "@/assets/icons/ic_heart.svg";
import itemDefaultImg from "@/assets/item_default.png";
import Link from "next/link";
import { ROUTES } from "@/constants/navigation";
import { useState } from "react";
import { Item } from "@/types";

interface ItemCardProps {
  item: Item;
}

export default function ItemCard({ item }: ItemCardProps) {
  if (!item) return null;
  const { id, name, price, likeCount, image } = item;

  const initialImage: string | StaticImageData = image?.[0] || itemDefaultImg;
  const [currentImg, setCurrentImg] = useState(initialImage);

  return (
    <Link href={ROUTES.ITEM.DETAIL(id)}>
      <div className="flex flex-col items-start gap-4">
        <div className="relative aspect-square w-full overflow-hidden rounded-2xl">
          <Image
            src={currentImg}
            alt="아이템 기본 이미지"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            fill
            className="object-cover"
            onError={() => setCurrentImg(itemDefaultImg)}
          />
        </div>
        <div className="flex w-full flex-col items-start gap-2.5">
          <div className="flex w-full flex-col items-start gap-1.5 self-stretch">
            <div className="flex w-full items-center gap-35.5">{name}</div>
            <div className="text-secondary-800 text-lg font-bold">
              {price?.toLocaleString()}원
            </div>
            <div className="flex w-full items-center gap-35.5">
              <div className="flex items-center gap-1">
                <Image src={heartIcon} alt="좋아요 아이콘" />
                <div className="text-secondary-500">{likeCount || 0}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
