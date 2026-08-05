import Image from "next/image";

import { getTime } from "@/utils/getDate";

import UserIcon from "./UserIcon";

export default function CommentItem({ data, onMenuClick, children }) {
  return (
    <div className="bg-[#fcfcfc] border-b border-b-secondary-300 pb-[12px] relative">
      <div className="flex justify-between mb-[24px]">
        <h3 className="text-[14px]/[24px] text-secondary-800 ">
          {data.content}
        </h3>
        <Image
          src="/icons/ic_kebab.svg"
          alt="케밥 아이콘"
          width={24}
          height={24}
          onClick={onMenuClick}
          className="cursor-pointer"
        />
        {children}
      </div>
      <div className="flex items-center gap-[8px]">
        <UserIcon width={32} height={32} />
        <div className="flex flex-col">
          <p className="text-[12px]/[18px] text-secondary-600">{data.author}</p>
          <p className="text-[12px]/[18px] text-secondary-400 ">
            {getTime(data.createdAt)} 전
          </p>
        </div>
      </div>
    </div>
  );
}
