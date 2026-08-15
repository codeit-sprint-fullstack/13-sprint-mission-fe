"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/providers/AuthProvider";
import { useProductDetail } from "@/lib/queries/product/queries";
import { useToggleLike } from "@/lib/queries/product/mutations";
import formatDate from "@/utils/formatDate";

import ProductMoreButton from "@/components/common/MoreButton/ProductMoreButton";
import LoadingDisplay from "@/components/ui/LoadingDisplay";
import Modal from "@/components/common/Modal/Modal";
import Button from "@/components/common/Button";

import IcProfile from "@/app/assets/ic_profile.svg";
import IcHeart from "@/app/assets/ic_heart.svg";
import ImgItem from "@/app/assets/img_item.png";
import IcHeartActive from "@/app/assets/ic_heart_active.svg";
import ErrorDisplay from "@/components/ui/ErrorDisplay";

export default function ProductInfo({
  productId,
}: {
  productId: string | number;
}) {
  const { user } = useAuth();
  const router = useRouter();

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  /** 상품 정보 조회 */
  const { data: product, isPending, error } = useProductDetail(productId);

  const isActive = product?.isLiked ?? false;
  const favoriteCount = product?.likeCount ?? 0;

  /** 좋아요 토글 (추가/취소 겸용) */
  const { mutate: toggleLike } = useToggleLike(productId);

  if (isPending) return <LoadingDisplay />;

  if (error || !product) return <ErrorDisplay message='상품 정보를 불러오는 데 실패했습니다.' />;

  return (
    <>
      <section className='md:flex md:justify-between md:gap-[16px] md:gap-[24px] pb-[24px] md:pb-[32px] lg:pb-[40px] border-b-1 border-cool-gray-200'>
        {/* 이미지 */}
        <div className='relative flex-1 self-start aspect-square lg:max-w-[100%] mb-[16px] md:mb-0 overflow-hidden rounded-[16px]'>
          <Image
            src={ImgItem}
            fill
            alt='상품 이미지'
            className='object-cover'
            sizes='50vw'
            priority
          />
        </div>

        {/* 상품 및 등록자 정보 */}
        <div className='flex-1'>
          <div className='relative pb-[16px] mb-[16px] lg:mb-[24px] pr-[40px] border-b border-gray-200 font-semibold text-secondary-800'>
            <h1 className='mb-[8px] lg:mb-[16px] text-[16px]/[calc(26/16)] md:text-[20px]/[calc(32/20)] lg:text-[24px]/[calc(32/24)] '>
              {product?.name}
            </h1>
            <span className='text-[24px]/[calc(32/24)] md:text-[32px]/[calc(42/32)] md:text-[40px]/[calc(48/40)]'>
              {!product.price ? 0 : product.price.toLocaleString()}
              원
            </span>
            <div className='absolute top-0 right-0 z-search-icon'>
              <ProductMoreButton productId={product.id} ownerId={product.ownerId} />
            </div>
          </div>

          <div>
            <h2 className='mb-[8px] lg:mb-[16px] text-[14px]/[calc(24/14)] lg:text-[16px]/[calc(26/16)] font-semibold text-secondary-600'>
              상품 소개
            </h2>
            <p className='mb-[24px] text-[16px]/[calc(26/16)] text-secondary-800'>
              {product.description}
            </p>

            <h3 className='mb-[8px] lg:mb-[16px] text-[14px]/[calc(24/14)] font-semibold text-secondary-800'>
              상품 태그
            </h3>
            <ul className='flex items-center gap-[8px] mb-[40px] lg:mb-[62px]'>
              {product?.tags?.map((tag) => (
                <li
                  key={tag}
                  className='py-[6px] px-[16px] text-[16px]/[calc(26/16)] text-secondary-800 bg-cool-gray-100 rounded-[26px]'
                >
                  #{tag}
                </li>
              ))}
            </ul>

            <div className='flex justify-between items-center'>
              <div className='flex items-center gap-[16px]'>
                <Image
                  src={IcProfile}
                  width={40}
                  height={40}
                  alt='작성자 프로필 사진'
                />

                <div>
                  <p className='text-[14px]/[calc(24/14)] font-medium text-secondary-600'>
                    {product.owner?.nickname}
                  </p>
                  <span className='flex items-center text-[14px]/[calc(24/14)] text-cool-gray-400'>
                    {formatDate(product.createdAt)}
                  </span>
                </div>
              </div>

              <div className='flex items-center cursor-pointer'>
                <span className='inline-block w-[1px] h-[34px] mr-[24px] bg-cool-gray-200 mx-[16px] md:mx-[32px]'></span>
                <div className='flex justify-center items-center gap-[4px] h-[32px] md:h-[40px] py-[4px] px-[12px] border-1 border-secondary-200 rounded-[35px] cursor-pointer'>
                  <button
                    type='button'
                    onClick={() =>
                      user ? toggleLike() : setIsLoginModalOpen(true)
                    }
                  >
                    {isActive ? (
                      <Image
                        className='cursor-pointer'
                        src={IcHeartActive}
                        width={24}
                        height={24}
                        alt='클릭된 좋아요 버튼'
                      />
                    ) : (
                      <Image
                        className='cursor-pointer'
                        src={IcHeart}
                        width={24}
                        height={24}
                        alt='좋아요 버튼'
                      />
                    )}
                  </button>
                  <span className='text-[16px]/[calc(26/16)] font-medium text-cool-gray-500'>
                    {favoriteCount}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 로그인 안내 모달 */}
      <Modal
        description='로그인이 필요합니다.'
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        buttons={
          <Button
            variant='tertiary'
            type='button'
            onClick={() => {
              setIsLoginModalOpen(false);
              router.push("/signin");
            }}
          >
            로그인
          </Button>
        }
      />
    </>
  );
}
