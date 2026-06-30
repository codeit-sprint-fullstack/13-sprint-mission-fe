"use client";
import CommentCard from "./CommentCard";
import Image from "next/image";

// 댓글 목록 컴포넌트 - 댓글이 없으면 빈 상태 이미지를 표시
export default function CommentList({ comments, onEdit, onDelete }) {
  // 댓글 없음 빈 상태 UI
  if (comments.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-16">
        <Image
          src="/image/Img_reply_empty.png"
          alt="댓글없음"
          width={140}
          height={140}
          priority
        />
        <p className="text-center text-2lg text-gray-400">
          아직 댓글이 없어요,
          <br />
          지금 댓글을 달아보세요!
        </p>
      </div>
    );
  }

  return (
    // 고정 높이 + 스크롤로 댓글이 많아도 레이아웃이 깨지지 않도록 처리
    <div className="h-100 overflow-y-auto">
      <ul className="flex flex-col gap-6">
        {comments.map((comment) => (
          <li key={comment.id}>
            <CommentCard
              comment={comment}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
