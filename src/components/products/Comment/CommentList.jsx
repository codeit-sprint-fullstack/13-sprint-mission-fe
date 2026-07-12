import CommentItem from "./CommentItem";

export default function CommentList({ productId, commentsData }) {
  return (
    <ul className='flex flex-col gap-[16px] md:gap-[24px] mb-[40px] md:mb-[47px] lg:mb-[64px]'>
      {commentsData.map((comments) => (
        <li
          key={comments.id}
          className='pb-[8px] border-b border-b-cool-gray-200'
        >
          {/* 댓글 아이템 */}
          <CommentItem productId={productId} commentId={comments.id} comments={comments} />
        </li>
      ))}
    </ul>
  );
}
