"use client";

import clsx from "clsx";
import Image from "next/image.js";
import { useState } from "react";
import sortIcon from "@/asset/icon/ic_sort.png";
import arrowIcon from "@/asset/icon/ic_arrow_down.png";
import { useSearchParams } from "next/navigation.js";
import useUpdateQuery from "@/utils/useUpdateQuery.js";
import { SORT_OPTIONS } from "@/constants/sortMenu.js";
import useClickOutside from "@/utils/useClickOutside.js";

export default function SortMenu({ className = "" }) {
  const searchParams = useSearchParams();
  const updateQuery = useUpdateQuery();
  const [isOpened, setIsOpened] = useState(false);
  const menuRef = useClickOutside(() => setIsOpened(false), {
    isActive: isOpened,
  });
  const sortLabel =
    searchParams.get("sort") === "oldest" ? "오래된순" : "최신순";
  const handleSort = (sortValue) => {
    const current = searchParams.get("sort") ?? "";
    if (current === sortValue) return;

    updateQuery("sort", sortValue);
  };

  return (
    <div className={clsx("w-fit relative", className)} ref={menuRef}>
      <div
        className={clsx(
          "w-10.5 md:w-32.5 h-10.5 flex items-center justify-center border border-secondary-gray-200 rounded-xl",
        )}
        onClick={() => setIsOpened((prev) => !prev)}
      >
        <span
          className={clsx(
            "hidden md:block mr-6 text-400-16 text-secondary-gray-800",
          )}
        >
          {sortLabel}
        </span>
        <Image
          className={clsx("w-6 h-6 block md:hidden")}
          src={sortIcon}
          alt="정렬 아이콘"
        />
        <Image
          className={clsx("w-6 h-6 hidden md:block")}
          src={arrowIcon}
          alt="정렬 아이콘"
        />
      </div>
      <ul
        className={clsx(
          "w-32.5 h-22.5 mt-1  absolute right-0 z-1 text-400-16 text-secondary-gray-800 border border-secondary-gray-200 rounded-xl divide-y divide-secondary-gray-200 bg-white",
          isOpened ? "block" : "hidden",
        )}
      >
        {SORT_OPTIONS.map((option) => {
          return (
            <li
              className={clsx("h-1/2 flex items-center justify-center ")}
              key={option.value}
              onClick={() => {
                handleSort(option.value);
                setIsOpened((prev) => !prev);
              }}
            >
              {option.label}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
