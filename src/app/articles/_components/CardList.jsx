"use client";
import Image from "next/image.js";
import bestIcon from "@/asset/icon/ic_medal.png";
import profileIcon from "@/asset/icon/ic_profile.png";
import productImg from "@/asset/image/productImage.png";
import clsx from "clsx";
import { formatDate } from "@/utils/date.js";
import heartIcon from "@/asset/icon/ic_heart.png";

export default function CardList({
  className = "",
  title = "",
  id = "",
  createdAt = "",
  onClick = () => {},
  variant = "card", // 'card', 'list',
}) {
  if (variant === "card") {
    return (
      <div
        className={clsx(
          "min-w-85.75 min-h-49.5 px-6 pb-4 bg-secondary-gray-50 rounded-lg",
          className,
        )}
        onClick={onClick}
      >
        <div
          className={clsx(
            "w-25.5 px-6 py-0.5 flex items-center bg-primary-blue rounded-b-2xl mb-4",
          )}
        >
          <Image
            className={clsx("w-4 h-4")}
            src={bestIcon}
            alt="베스트 아이콘"
          />
          <span className={clsx("text-600-16 text-white")}>Best</span>
        </div>
        <div className={clsx("flex gap-10 justify-between mb-10")}>
          <span
            className={clsx(
              "text-600-18 lg:text-600-20  text-secondary-gray-800",
            )}
          >
            {title}
          </span>
          <div
            className={clsx(
              "w-18 h-18 shrink-0 flex items-center justify-center bg-white border-[0.75px] border-secondary-gray-200 rounded-lg",
            )}
          >
            <Image
              src={productImg}
              alt="제품 이미지"
              className={clsx("w-12 h-11")}
            />
          </div>
        </div>
        <div className={clsx("flex justify-between")}>
          <div className={clsx("flex gap-2")}>
            <span className={clsx("text-400-14 text-secondary-gray-600")}>
              {id}
            </span>
            <div className={clsx("flex gap-1 items-center")}>
              <Image
                className={clsx("w-4 h-4")}
                src={heartIcon}
                alt="좋아요 아이콘"
              />
              <span className={clsx("text-400-14 text-secondary-gray-500")}>
                9999+
              </span>
            </div>
          </div>
          <span className={clsx("text-400-14 text-secondary-gray-400")}>
            {createdAt ? formatDate(createdAt) : "-"}
          </span>
        </div>
      </div>
    );
  }
  if (variant === "list") {
    return (
      <div
        className={clsx(
          "w-full pb-6 bg-[#fcfcfc] border-b-[1.4px] border-secondary-gray-200",
          className,
        )}
        onClick={onClick}
      >
        <div className={clsx("flex gap-2 justify-between mb-4")}>
          <span
            className={clsx(
              "text-600-18 md:text-600-20  text-secondary-gray-800",
            )}
          >
            {title}
          </span>
          <div
            className={clsx(
              "w-18 h-18 shrink-0 flex items-center justify-center bg-white border-[0.75px] border-secondary-gray-200 rounded-lg",
            )}
          >
            <Image
              src={productImg}
              alt="제품 이미지"
              className={clsx("w-12 h-11")}
            />
          </div>
        </div>
        <div className={clsx("flex justify-between")}>
          <div className={clsx("flex items-center gap-2")}>
            <Image
              className={clsx("w-6 h-6")}
              src={profileIcon}
              alt="프로필 아이콘"
            />
            <span className={clsx("text-400-14 text-secondary-gray-600")}>
              {id}
            </span>
            <span className={clsx("text-400-14 text-secondary-gray-400")}>
              {createdAt ? formatDate(createdAt) : "-"}
            </span>
          </div>
          <div className={clsx("flex gap-2 items-center")}>
            <Image
              className={clsx("w-6 h-6")}
              src={heartIcon}
              alt="좋아요 아이콘"
            />
            <span className={clsx("text-400-16 text-secondary-gray-500")}>
              9999+
            </span>
          </div>
        </div>
      </div>
    );
  }
}
