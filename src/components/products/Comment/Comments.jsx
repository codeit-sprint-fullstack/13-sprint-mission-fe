"use client";

import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

import { getAllCommentAction } from "@/lib/actions/productComments";

import CommentForm from "./CommentForm";
import CommentList from "./CommentList";
import NoComment from "./NoComment";
import LoadingDisplay from "@/components/ui/LoadingDisplay";
import ErrorDisplay from "@/components/ui/ErrorDisplay";
import Button from "@/components/common/Button";

import IcBack from "@/app/assets/ic_back.svg";

export default function Comments({ productId }) {
  /** 댓글 목록 조회 */
  const { data: comments, isPending, isError } = useQuery({
    queryKey: ["comment", productId],
    queryFn: () => getAllCommentAction({ productId }),
    select: (data) => data.data,
  });

  if (isPending) return <LoadingDisplay />;
  if (isError) return <ErrorDisplay message='댓글을 불러오는 데 실패했습니다.' />;

  return (
    <section className='mt-[24px] md:mt-[40px]'>
      {/* 댓글 등록 */}
      <CommentForm productId={productId} />

      {/* 댓글 리스트 */}
      {comments?.length > 0 ? (
        // 댓글 데이터 있을 때
        <CommentList productId={productId} commentsData={comments} />
      ) : (
        // 댓글 데이터 없을 때
        <NoComment />
      )}

      {/* 목록으로 돌아가기 버튼 */}
      <Button
        className='m-auto'
        as={Link}
        href='/items'
        variant='secondary'
        width='240px'
        aria-label='목록으로 돌아가기 버튼'
      >
        목록으로 돌아가기
        <Image
          className='ml-[8px]'
          src={IcBack}
          width={24}
          height={24}
          alt=''
        />
      </Button>
    </section>
  );
}
