import Image from "next/image";

import Button from "@/components/common/Button";

import IcBack from "@/app/assets/ic_back.svg";

import CommentForm from "./CommentForm";
import Link from "next/link";
import NoComment from "./NoComment";
import CommentList from "./CommentList";

export default function Comments({ articleId, commentsData }) {
  return (
    <section>
      {/* 댓글 등록 */}
      <CommentForm articleId={articleId} />

      {/* 댓글 리스트 */}
      {commentsData.length > 0 ? (
        // 댓글 데이터 있을 때
        <CommentList articleId={articleId} commentsData={commentsData} />
      ) : (
        // 댓글 데이터 없을 때
        <NoComment />
      )}

      {/* 목록으로 돌아가기 버튼 */}
      <Button
        className='m-auto'
        as={Link}
        href='/articles'
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
