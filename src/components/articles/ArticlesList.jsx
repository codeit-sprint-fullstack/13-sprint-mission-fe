import Image from "next/image";

import ImgMackbook from "@/app/assets/img_macbook.png";
import IcProfile from "@/app/assets/ic_profile.svg";
import IcHeart from "@/app/assets/ic_heart.svg";
import Link from "next/link";
import formatDate from "@/utils/formatDate";

export default function ArticlesList({ articles }) {
  return (
    <section className='mt-[16px] md:mt-[40px] lg:mt-[24px]'>
      <ul className='flex flex-col gap-[24px]'>
        {articles.data.map((a) => (
          <li
            key={a.id}
            className='border-b border-cool-gray-200 pb-[24px] bg-[#FCFCFC]'
          >
            <Link href={`/articles/${a.id}`}>
              <article>
                {/* 게시글 카드 헤더 */}
                <header className='flex justify-between gap-[24px] lg:gap-2 mb-[15px]'>
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
                </header>
                <footer className='flex justify-between'>
                  <div className='flex gap-[8px]'>
                    <figure className='rounded-full'>
                      <Image
                        className='object-cover'
                        src={IcProfile}
                        alt='프로필 이미지'
                        width={24}
                        height={24}
                      />
                    </figure>
                    <p className='text-[14px]/[calc(24/14)] text-secondary-600'>
                      {a.owner.nickname}
                    </p>
                    <span className='text-[14px]/[calc(24/14)] text-secondary-400'>
                      {formatDate(a.createdAt)}
                    </span>
                  </div>

                  <div className='flex items-center gap-[8px]'>
                    <figure>
                      <Image
                        className='w-auto'
                        src={IcHeart}
                        alt='좋아요 버튼'
                        aria-hidden='true'
                        width={24}
                        height={24}
                      />
                    </figure>
                    <span className='text-[16px]/[calc(26/16)] text-secondary-500'>
                      {a.likeCount}+
                    </span>
                  </div>
                </footer>
              </article>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
