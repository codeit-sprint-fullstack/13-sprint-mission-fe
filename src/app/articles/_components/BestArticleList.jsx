"use client";

import Image from "next/image";
import Link from "next/link";

import formatDate from "@/utils/formatDate";

import ImgMackbook from "@/app/assets/img_macbook.png";
import IcHeart from "@/app/assets/ic_heart.svg";
import IcMedal from "@/app/assets/ic_medal.svg";
import usePageSize from "@/hooks/usePaseSize";
import { ARTICLE_PAGE_SIZE_CONFIG } from "@/lib/constants/constants";

export default function BestArticleList({ articles }) {
  const pageSize = usePageSize("md", ARTICLE_PAGE_SIZE_CONFIG);

  return (
    <>
      {articles?.data?.slice(0, pageSize).map((a) => (
        <li key={a.id} className='bg-secondary-50 rounded-lg'>
          <Link href={`/articles/${a.id}`} className='block h-full'>
            <article className='flex flex-col justify-between h-full py-[0_16px] lg:py-[0_9px] px-6'>
              {/* 베스트 게시글 카드 헤더 */}
              <header className=''>
                <span className='inline-flex items-center gap-1 w-fit mb-4 bg-primary-100 py-0.5 px-6 rounded-b-2xl'>
                  <Image
                    src={IcMedal}
                    alt='메달 이미지'
                    width={16}
                    height={16}
                  />
                  <span className='text-[16px]/[calc(26/16)] font-semibold text-white'>
                    Best
                  </span>
                </span>
                <div className='flex justify-between gap-10 lg:gap-2 mb-10 lg:mb-4.5'>
                  <p className='text-[18px]/[calc(26/18)] lg:text-[20px]/[calc(32/20)] font-semibold'>
                    {a.title}
                  </p>
                  <figure className='relative shrink-0 w-18 h-18 border rounded-md border-gray-200 overflow-hidden'>
                    <Image
                      className='object-cover'
                      src={ImgMackbook}
                      alt='베스트 게시글 상품 이미지'
                      width={72}
                      height={72}
                      priority
                    />
                  </figure>
                </div>
              </header>

              {/* 베스트 게시글 카드 푸터 */}
              <footer className='flex justify-between text-[14px]/[calc(24/14)]'>
                <div className='flex'>
                  <p className='mr-2 text-secondary-500'>{a.user.username}</p>
                  <Image
                    className='w-auto'
                    src={IcHeart}
                    alt='좋아요 버튼'
                    aria-hidden='true'
                    width={16}
                    height={16}
                  />
                  <span className='ml-[4px] text-secondary-500'>
                    {a.likeCount}+
                  </span>
                </div>
                <span className='text-secondary-400'>
                  {formatDate(a.createdAt)}
                </span>
              </footer>
            </article>
          </Link>
        </li>
      ))}
    </>
  );
}
