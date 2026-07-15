import Image from "next/image";
import { useState } from "react";
import ProductMeta from "./ProductMeta";

export default function ProductDetail({
  product,
  isFavorite,
  onFavoriteToggle,
  isOwner,
  onEdit,
  onDelete,
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col gap-4 md:flex-row md:gap-6">
      {/* 이미지 */}
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-gray-100 md:w-[324px] md:shrink-0 lg:w-[486px] lg:shrink-0">
        <Image
          src={product?.images?.[0] ?? "/image/default.png"}
          alt={product?.name ?? ""}
          fill
          sizes="(max-width: 744px) 100vw, (max-width: 1200px) 50vw, 486px"
          className="object-cover"
        />
      </div>

      {/* 텍스트 영역 */}
      <div className="flex flex-1 flex-col gap-4">
        {/* 제목 + 케밥 메뉴 */}
        <div className="flex items-start justify-between">
          <h2 className="text-lg font-semibold text-gray-800 md:text-[20px] lg:text-2xl">
            {product?.name}
          </h2>
          {isOwner && (
            <div className="relative">
              <button onClick={() => setIsOpen(!isOpen)}>
                <Image
                  src="/image/ic_kebab.svg"
                  alt="kebab"
                  width={24}
                  height={24}
                />
              </button>
              {isOpen && (
                <ul className="absolute right-0 z-50 mt-1 w-28 rounded-lg border border-gray-300 bg-white shadow-md">
                  <li
                    onClick={() => {
                      onEdit();
                      setIsOpen(false);
                    }}
                    className="text-md cursor-pointer px-4 py-2 text-gray-500 hover:bg-gray-100"
                  >
                    수정하기
                  </li>
                  <li
                    onClick={() => {
                      onDelete();
                      setIsOpen(false);
                    }}
                    className="text-md cursor-pointer px-4 py-2 text-gray-500 hover:bg-gray-100"
                  >
                    삭제하기
                  </li>
                </ul>
              )}
            </div>
          )}
        </div>

        {/* 가격 */}
        <p className="text-2xl font-bold text-gray-800 md:text-3xl lg:text-[40px]">
          {product?.price?.toLocaleString("ko-KR")}원
        </p>

        <hr className="border-gray-200" />

        {/* 상품 소개 */}
        <div className="flex flex-col gap-2">
          <span className="text-md font-semibold text-gray-800 md:text-gray-600 lg:text-lg">
            상품 소개
          </span>
          <p className="text-lg font-normal text-gray-800 lg:text-gray-600">
            {product?.description}
          </p>
        </div>

        {/* 상품 태그 */}
        <div className="flex flex-col gap-2">
          <span className="text-md font-semibold text-gray-800 md:text-gray-600 lg:text-lg">
            상품 태그
          </span>
          <div className="flex flex-wrap gap-2">
            {product?.tags?.map((tag, index) => (
              <span
                key={index}
                className="rounded-[26px] bg-gray-100 px-4 py-1.5 text-lg font-normal text-gray-800"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* 프로필 + 좋아요 */}
        <ProductMeta
          product={product}
          isFavorite={isFavorite}
          onFavoriteToggle={onFavoriteToggle}
        />
      </div>
    </div>
  );
}
