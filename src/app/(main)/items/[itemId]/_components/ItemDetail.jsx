"use client";

import Image from "next/image";
import LikeButton from "./LikeButton";
import KebabMenu from "@/components/KebabMenu";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";

export default function ItemDetail() {
  const { itemId } = useParams();
  const router = useRouter();
  const { data: item, isPending } = useQuery({
    queryKey: ["item", itemId],
    queryFn: async () => {
      const res = await fetch(
        `https://panda-market-api.vercel.app/products/${itemId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        },
      );
      if (!res.ok) {
        if (res.status === 401) {
          alert("토큰 만료");
          router.push("/login");
          return;
        }
        throw new Error("요청 실패");
      }
      const item = await res.json();
      return item;
    },
  });
  if (isPending) return <p>로딩 중...</p>;

  return (
    <div className="border-cool-gray-200 mt-5 flex gap-6 border-b pb-10">
      <Image
        src={item?.images?.[0] || "/default_img.jpg"}
        width={500}
        height={500}
        className="h-125 w-125 rounded-[12px] border-none"
        alt="상품이미지"
      />
      <div className="w-full">
        <div className="flex justify-between">
          <p className="text-secondary-800 text-[24px] font-[600]">
            {item.name}
          </p>
          <KebabMenu />
        </div>
        <p className="border-cool-gray-200 text-secondary-800 mt-4 border-b pb-4 text-[40px] font-[600]">
          {item.price}
        </p>
        <p className="text-secondary-600 mt-6 text-[16px] font-[600]">
          상품소개
        </p>
        <p className="text-secondary-600 mt-4 text-[16px] font-[400] wrap-break-word">
          {item.description}
        </p>
        <p className="text-secondary-600 mt-6 text-[16px] font-[600]">
          상품 태그
        </p>
        <p className="mt-4">태그</p>
        <div className="mt-15.5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Image src="/ic_profile.svg" width={40} height={40} alt="" />
            <div className="flex flex-col">
              <p className="text-secondary-600 text-[14px] font-[500]">
                {item.ownerNickname}
              </p>
              <p className="text-secondary-400 text-[14px] font-[400]">
                {item.createdAt.slice(0, 10)}
              </p>
            </div>
          </div>

          <LikeButton
            favoriteCount={item.favoriteCount}
            isFavorite={item.isFavorite}
            itemId={itemId}
          />
        </div>
      </div>
    </div>
  );
}
