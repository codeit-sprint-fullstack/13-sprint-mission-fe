import React from "react";
import { ProfileForReply } from "./Profile";

export default function Reply({ data }) {
  return (
    <div className="flex w-full justify-between pb-3 border-b border-gray-300 bg-[#fcfcfc]">
      <div className="flex flex-col gap-6">
        <div>ssssssssssssssssssssssssssssssssssssssssssss</div>
        <ProfileForReply></ProfileForReply>
      </div>
      <div>드롭다운</div>
    </div>
  );
}
