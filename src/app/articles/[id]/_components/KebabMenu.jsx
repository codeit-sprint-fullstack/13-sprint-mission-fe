"use client";
import Image from "next/image.js";
import kebabIcon from "@/asset/icon/ic_kebab.png";
import clsx from "clsx";
import { useState } from "react";
import useClickOutside from "@/utils/useClickOutside.js";

export default function KebabMenu({
  className = "",
  onEdit = () => {},
  onDelete = () => {},
}) {
  const [isOpened, setIsOpened] = useState(false);
  const menuRef = useClickOutside(() => setIsOpened(false), {
    isActive: isOpened,
  });

  return (
    <div className={clsx("w-fit relative", className)} ref={menuRef}>
      <Image
        className={clsx("w-6 h-6 cursor-pointer")}
        src={kebabIcon}
        alt="케밥 아이콘"
        onClick={() => setIsOpened((prev) => !prev)}
      />
      <ul
        className={clsx(
          "w-25.5 h-22.5 md:w-34.75 md:h-23.5 py-1 mr-1.25  absolute right-0 z-1 text-400-14 text-secondary-gray-500 border border-secondary-gray-300 bg-white rounded-lg cursor-pointer",
          isOpened ? "block" : "hidden",
        )}
      >
        <li
          className={clsx("h-1/2 flex items-center justify-center")}
          onClick={() => {
            onEdit();
            setIsOpened((prev) => !prev);
          }}
        >
          수정하기
        </li>
        <li
          className={clsx("h-1/2 flex items-center justify-center")}
          onClick={() => {
            onDelete();
            setIsOpened((prev) => !prev);
          }}
        >
          삭제하기
        </li>
      </ul>
    </div>
  );
}
