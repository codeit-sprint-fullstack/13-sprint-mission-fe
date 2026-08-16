import React from "react";

export default function DropDownList({
  updateFunc,
  deleteFunc,
}: {
  updateFunc: () => void;
  deleteFunc: () => void;
}) {
  const handleUpdate = () => {
    updateFunc();
  };
  const handleDelete = () => {
    deleteFunc();
  };
  return (
    <div className="flex flex-col absolute w-[8.6875rem] right-2 top-6 rounded-[0.5rem] border border-[#D1D5DB] bg-[#fff]">
      <button
        onClick={handleUpdate}
        className="font-pretendard text-[1rem] font-[400] leading-[1.625rem] text-[#6B7280] pt-[1rem] pb-[0.75rem] px-[1.06rem] cursor-pointer"
      >
        수정하기
      </button>
      <button
        onClick={handleDelete}
        className="font-pretendard text-[1rem] font-[400] leading-[1.625rem] text-[#6B7280] pt-[0.75rem] pb-[1rem] px-[1.06rem] cursor-pointer"
      >
        삭제하기
      </button>
    </div>
  );
}
