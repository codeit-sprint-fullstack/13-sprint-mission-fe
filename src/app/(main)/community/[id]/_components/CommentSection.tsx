"use client";

import CommentBoard from "@/components/comments/CommentBoard";
import {
  createComment,
  deleteComment,
  getComments,
  updateComment,
} from "@/lib/PostAPI";

export default function CommentSection({ postId }: { postId: string }) {
  return (
    <CommentBoard
      queryKey={["comments", "post", postId]}
      queryFn={() => getComments(postId)}
      createFn={(content) => createComment(postId, { content })}
      updateFn={(commentId, content) => updateComment(commentId, { content })}
      deleteFn={(commentId) => deleteComment(commentId)}
      heading="댓글달기"
      placeholder="댓글을 입력해주세요."
      deleteConfirmText="댓글을 삭제하시겠습니까?"
      emptyImageSrc="/images/Img_reply_empty.png"
      emptyImageAlt="빈 댓글"
      emptyImageWidth={100}
      emptyImageHeight={100}
      emptyText={
        <>
          아직 댓글이 없어요. <br /> 지금 댓글을 달아보세요!
        </>
      }
      backHref="/community"
    />
  );
}
