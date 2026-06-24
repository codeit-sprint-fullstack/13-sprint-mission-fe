import Image from "next/image";
import React from "react";
import Avator from "../../../public/svg/avator.svg";

export default function Profile() {
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
        {/* {user.name} */}
        김코드
      </span>
    </div>
  );
}
