// ✅ ProductItem.jsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/cn.js";
import Like from "../../../public/svg/likeoff.svg";

const DEFAULT_IMAGE = "/img/default.png";

export default function ProductItem({ product, className }) {
  // URL이 없으면 처음부터 디폴트로 시작
  const [imgSrc, setImgSrc] = useState(product.image || DEFAULT_IMAGE);

  return (
    <div className={cn("w-full", className)}>
      <div className="relative aspect-square w-full overflow-hidden rounded-3xl">
        <Image
          src={imgSrc}
          alt={product?.name}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover"
          // URL은 있었는데 로딩 실패(깨진 이미지)하면 디폴트로 교체
          onError={() => setImgSrc(DEFAULT_IMAGE)}
        />
      </div>

      <h3 className="mt-2.5 truncate text-sm font-medium">{product?.name}</h3>
      <p className="text-base font-bold text-gray-800 mt-1.5">
        {product?.price.toLocaleString()}원
      </p>
      <div className="flex items-center mt-1.5">
        <Image src={Like} width={16} height={16} alt="" className="w-4 h-4" />
        <div className="ml-1 text-sm text-gray-600">
          {product.favoriteCount}
        </div>
      </div>
    </div>
  );
}
