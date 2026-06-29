import Image from "next/image";
import React from "react";
import Avator from "../../../public/svg/avator.svg";

export function Profile({ user }) {
  return (
    <div className="flex items-center">
      <Image
        src={Avator}
        width={40}
        height={40}
        alt="임시아바타"
        className="w-10 h-10"
      />
      <span className="hidden ml-1.5 font-normal text-gray-600 tablet:block tablet:text-base pc:text-lg">
        {user.nickname}
      </span>
    </div>
  );
}

export function ProfileForItem({ user }) {
  return (
    <div className="flex w-fit items-center justify-between gap-4">
      <Image
        src={Avator}
        width={40}
        height={40}
        alt="임시아바타"
        className="w-10 h-10"
      />
      <div className="flex flex-col">
        <div className="text-sm text-gray-600 font-medium">이름</div>
        <div className="text-sm text-gray-400">2024.01.01</div>
      </div>
    </div>
  );
}

export function ProfileForReply({ user }) {
  return (
    <div className="flex w-fit items-center justify-between gap-4">
      <Image
        src={Avator}
        width={32}
        height={32}
        alt="임시아바타"
        className="w-8 h-8"
      />
      <div className="flex w-fit flex-col">
        <div className="text-sm text-gray-600 font-medium">이름</div>
        <div className="text-sm text-gray-400">2024.01.01</div>
      </div>
    </div>
  );
}
