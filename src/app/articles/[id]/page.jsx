import Image from "next/image";
import { clsx } from "clsx";

import { getArticleById } from "@/lib/services/articleApi";
import formatDate from "@/utils/formatDate";

import PageContainer from "@/components/common/PageContainer";
import MoreButton from "@/app/articles/[id]/_components/MoreButton";
import Comments from "@/app/articles/[id]/_components/Comments";

import IcProfile from "@/app/assets/ic_profile.svg";
import IcHeart from "@/app/assets/ic_heart.svg";
import { getAllArticleComments } from "@/lib/services/articleCommentApi";

export const metadata = {
  title: "자유 게시판 게시글 상세 페이지",
  description:
    "판다마켓은 이웃과 함께하는 따뜻한 중고거래 커뮤니티 플랫폼입니다. 단순한 거래를 넘어 사용자들이 소통하고 정보를 나누는 공간을 지향합니다.",
};

export default async function ArticleDetailPage({ params }) {
  const { id } = await params;

  const articleData = await getArticleById(id);
  const commentsData = await getAllArticleComments(id);

  const article = articleData.data;
  const articleComments = commentsData.data;

  return (
    <PageContainer>
      <section className='mt-[24px] md:mt-[26px] lg:mt-[34px] mb-[50px] lg:mb-[190px]'>
        <article>
          {/* 게시글 헤더 */}
          <header>
            <div className='relative z-10 flex justify-between gap-[8px] mb-[20px] md:mb-[16px]'>
              <h1 className='text-[20px]/[calc(32/20)] font-bold text-secondary-800'>
                {article.title}
              </h1>
              <MoreButton type='article' articleId={id} />
            </div>

            {/* 작성자 정보 + 좋아요 수 */}
            <div className='flex items-center pb-[19px] md:pb-[16px] border-b-1 border-cool-gray-200'>
              <Image
                src={IcProfile}
                width={40}
                height={40}
                alt='작성자 프로필 사진'
              />
              <p className='ml-[14px] md:ml-[16px] text-[14px]/[calc(24/14)] font-medium text-secondary-600'>
                {article.user.username}
              </p>
              <span
                className={clsx(
                  "flex items-center ml-[8px] text-[14px]/[calc(24/14)] text-cool-gray-400",
                  'after:content-[""] after:inline-block after:w-[1px] after:h-[34px] after:bg-cool-gray-200 after:mx-[16px] md:after:mx-[32px]',
                )}
              >
                {formatDate(article.createdAt)}
              </span>
              <div className='flex justify-center items-center gap-[4px] w-[80px] h-[32px] md:w-[87px] md:h-[40px] border-1 border-secondary-200 rounded-[35px] cursor-pointer'>
                <button type='button'>
                  <Image
                    src={IcHeart}
                    width={24}
                    height={24}
                    alt='좋아요 버튼'
                  />
                </button>
                <span className='text-[16px]/[calc(26/16)] font-medium text-cool-gray-500'>
                  {article.likeCount}
                </span>
              </div>
            </div>
          </header>

          {/* 본문 */}
          <p className='py-[16px_32px] lg:py-[24px_32px] text-[16px]/[calc(26/16)] text-cool-gray-800 md:text-[18px]/[calc(26/18)]'>
            {article.content}
          </p>
        </article>

        {/* 댓글 섹션 */}
        <Comments articleId={id} commentsData={articleComments} />
      </section>
    </PageContainer>
  );
}
