"use client";

import Image from "next/image";

import product_img from "@/assets/imgs/mac.png";
import KebabMenu from "@/components/common/KebabMenu";
import ic_profile from "@/assets/icons/ic_profile.svg";

import LikeBtn from "@/components/common/LikeBtn";
import { useAuth } from "@/providers/AuthProvider";

export default function ProductDetailCard({ product }) {
  const { user } = useAuth();
  const isOwner = user.id === product.ownerId;
  return (
    <div className="flex flex-col justify-center w-full gap-4 pb-6 border-b border-b-gray-200 md:flex-row lg:gap-6">
      <div className=" rounded-2xl overflow-hidden w-[340px]">
        <Image
          alt=""
          src={product_img}
          width={573}
          height={383}
          className="object-cover"
        />
      </div>
      <div className="flex flex-col gap-4 w-[344px] lg:w-[690px] ">
        <div className="flex justify-between border-b pb-4 border-b-gray-200">
          <div className="flex flex-col gap-2">
            <p className="text-lg font-semibold md:text-2lg">{product.name}</p>
            <p className="text-2xl font-semibold md:text-3xl">
              {product.price}원
            </p>
          </div>
          {isOwner && <KebabMenu />}
        </div>
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <p className="text-lg font-semibold">상품 소개</p>
              <p className="text-lg">{product.description}</p>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-lg font-semibold">상품 태그</p>
              <div className="flex gap-2">
                {product.tags.map((tag, index) => {
                  return (
                    <p
                      className="w-fit bg-gray-100 rounded-[26px] px-4 py-1.5"
                      key={index}
                    >
                      #{tag}
                    </p>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex gap-4">
              <Image
                src={ic_profile}
                alt="프로필 사진"
                width={40}
                height={40}
                className="max-w-none"
              />
              <div>
                <p className="text-md text-gray-600">{product.ownerNickname}</p>
                <p className="text-md text-gray-400">
                  {product.createdAt &&
                    product.createdAt.split("T")[0].replaceAll("-", ".")}
                </p>
              </div>
            </div>
            <div className="pl-6 border-l border-l-gray-200">
              <LikeBtn
                favoriteCount={product.favoriteCount}
                isFavorite={product.isFavorite}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
