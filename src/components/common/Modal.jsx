import React from "react";

export default function Modal({ children, onClose }) {
  return (
    <div
      className="fixed top-0 z-1000 w-full h-full bg-black/70"
      onClick={onClose}
    >
      <div className="mx-auto mt-[25.94rem] flex w-[33.75rem] h-[15.625rem] py-[2.5rem] px-[11.6875rem] flex-col justify-center items-center gap-[2.5rem] rounded-[0.5rem] bg-[#FFF]">
        {children}
        <button
          className="rounded-lg bg-[#3692FF] h-[3rem] w-[10.3125rem] px-[1.44rem] cursor-pointer"
          onClick={onClose}
        >
          <span className="text-white font-pretendard text-center text-[1rem] leading-10.5 font-semibold">
            확인
          </span>
        </button>
      </div>
    </div>
  );
}
