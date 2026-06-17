import Image from "next/image";

import ImgReplyEmpty from "@/app/assets/Img_reply_empty.svg";

export default function NoComment() {
  return (
    <section className='flex flex-col items-center'>
      <Image
        className='ml-[8px]'
        src={ImgReplyEmpty}
        width={140}
        height={140}
        alt=''
      />
      <p className='my-[16px_40px] md:my-[16px_48px] text-[16px]/[calc(26/16)] text-secondary-400 text-center'>
        아직 댓글이 없어요,
        <br /> 지금 댓글을 달아보세요!
      </p>
    </section>
  );
}
