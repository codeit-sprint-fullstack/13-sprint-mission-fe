import Image from "next/image";

import ImgInquiryEmpty from "@/app/assets/Img_inquiry_empty.svg";

export default function NoComment() {
  return (
    <section className='flex flex-col items-center'>
      <Image
        className='ml-[8px]'
        src={ImgInquiryEmpty}
        width={140}
        height={140}
        alt=''
      />
      <p className='my-[16px_40px] md:my-[16px_48px] text-[16px]/[calc(26/16)] text-secondary-400 text-center'>
        아직 문의가 없어요
      </p>
    </section>
  );
}
