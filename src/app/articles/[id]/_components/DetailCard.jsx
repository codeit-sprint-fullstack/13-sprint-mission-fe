import KebabMenu from "@/app/articles/[id]/_components/KebabMenu.jsx";
import clsx from "clsx";
import Image from "next/image.js";
import profileIcon from "@/asset/icon/ic_profile.png";
import { formatDate } from "@/utils/date.js";
import heartIcon from "@/asset/icon/ic_heart.png";

export default function DetailCard({
  className = "",
  title = "",
  id = "",
  content = "",
  createdAt = "",
  onEdit = () => {},
  onDelete = () => {},
}) {
  return (
    <div className={clsx(className)}>
      <div
        className={clsx("pb-4 mb-4 border-b-[1.4px] border-secondary-gray-200")}
      >
        <div className={clsx("flex gap-2 mb-4")}>
          <span className={clsx("mr-2 text-700-20 text-secondary-gray-800")}>
            {title}
          </span>
          <KebabMenu
            className={clsx("ml-auto")}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </div>
        <div className={clsx("flex")}>
          <div className={clsx("mr-4 md:mr-8 flex items-center")}>
            <Image
              className={clsx("w-10 h-10 mr-4")}
              src={profileIcon}
              alt="프로필 아이콘"
            />
            <span
              className={clsx(
                "mr-0.5 md:mr-2 text-500-14 text-secondary-gray-600",
              )}
            >
              {id}
            </span>
            <span className={clsx("text-400-14 text-secondary-gray-400")}>
              {createdAt ? formatDate(createdAt) : "-"}
            </span>
          </div>
          <div className={clsx("w-px h-8.5 bg-secondary-gray-200")} />
          <div
            className={clsx(
              "px-3 py-1 ml-4 md:ml-8 flex gap-1 items-center border border-secondary-gray-200 rounded-4xl",
            )}
          >
            <Image
              className={clsx("w-8 h-8")}
              src={heartIcon}
              alt="좋아요 아이콘"
            />
            <span className={clsx("text-500-14")}>123</span>
          </div>
        </div>
      </div>
      <span
        className={clsx("text-400-16 lg:text-400-18 text-secondary-gray-800")}
      >
        {content}
      </span>
    </div>
  );
}
