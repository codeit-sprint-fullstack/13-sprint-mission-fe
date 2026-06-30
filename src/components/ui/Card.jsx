import React from "react";
import Image from "next/image";

export default function Card({ tag, title, text, flip = false, ...imgProps }) {
  return (
    <div className="flex items-center justify-center h-fit">
      <div
        className={`
      flex w-[988px] bg-[var(--tertiary-bg-color)]
      hover:cursor-pointer
      max-desktop:w-full
      max-desktop:flex-col
      max-desktop:justify-start
      max-desktop:gap-[24px]
      max-desktop:px-[40px]
      ${
        flip
          ? "flex-row-reverse max-desktop:items-end max-desktop:text-end"
          : ""
      }
    `}
      >
        <Image
          {...imgProps}
          width={588}
          height={444}
          alt="카드 이미지"
          className="w-[588px] h-auto max-desktop:w-full"
        />

        <div
          className="
        flex w-fit flex-col justify-center items-end
        mr-[31px] px-[30px]
        max-desktop:p-0
      "
        >
          <div
            className="
          flex flex-col gap-[12px]
          whitespace-pre-wrap
          items-end text-end
        "
          >
            <p className="text-[18px] font-bold text-[var(--primary-100)]">
              {tag}
            </p>

            <h3
              className="
            text-[40px] font-bold leading-[140%]
            text-[var(--secondary-700)]
            max-[720px]:text-[35px]
          "
            >
              {title}
            </h3>

            <p
              className="
              break-keep
            text-[24px] font-medium leading-[32px]
            text-[var(--secondary-700)]
            max-[720px]:text-[20px]
            
          "
            >
              {text}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
