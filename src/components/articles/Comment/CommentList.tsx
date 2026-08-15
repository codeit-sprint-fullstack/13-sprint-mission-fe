import CommentItem from "./CommentItem";
import type { Comment } from "@/types/comment";

export default function CommentList({
  id,
  commentsData,
}: {
  id: string;
  commentsData: Comment[];
}) {
  return (
    <ul className='flex flex-col gap-[16px] md:gap-[24px] mb-[40px] md:mb-[47px] lg:mb-[64px]'>
      {commentsData.map((comments) => (
        <li
          key={comments.id}
          className='pb-[8px] border-b border-b-cool-gray-200 md:bg-[#fcfcfc]'
        >
          {/* 댓글 아이템 */}
          <CommentItem
            id={id}
            commentId={comments.id}
            comments={comments}
          />
        </li>
      ))}
    </ul>
  );
}
