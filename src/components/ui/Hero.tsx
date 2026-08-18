import React from "react";
import Image, { ImageProps } from "next/image";

interface IHeroProps {
  text: string;
  img: ImageProps["src"];
  children?: React.ReactNode;
}

export default function Hero({ text, img, children }: IHeroProps) {
  return (
    <section className="flex justify-center items-end h-[540px] bg-[#cfe5ff] max-desktop:h-fit">
      <div className="flex items-center justify-between w-fit h-[400px] max-desktop:h-fit max-desktop:flex-col max-desktop:gap-[100px] max-desktop:pt-[80px]">
        <div>
          <h2 className="mb-[32px] whitespace-pre-line text-[40px] font-bold leading-[140%] text-secondary-800 max-desktop:text-center">
            {text}
          </h2>

          {children}
        </div>

        <Image
          src={img}
          width={752}
          height={340}
          alt="히어로 이미지"
          className="w-[752px] h-auto max-desktop:w-full"
        />
      </div>
    </section>
  );
}
