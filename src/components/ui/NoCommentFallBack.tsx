import Image from "next/image";
import emptyImage from "@/assets/Img_reply_empty.png";

export default function NoCommentFallBack() {
  return (
    <div className="flex flex-col items-center gap-10 self-stretch">
      <div className="flex w-full max-w-37.75 flex-col items-center justify-center gap-4">
        <div className="relative h-35 w-35">
          <Image fill src={emptyImage} alt="댓글 없음" />
        </div>
        <div className="text-secondary-400 text-4 w-full justify-center self-stretch text-center font-normal">
          아직 댓글이 없어요,
          <br /> 지금 댓글을 달아보세요!
        </div>
      </div>
    </div>
  );
}
