import React from "react";

export default function Btn({ text }) {
  return (
    <button className="font-semibold h-[42px] bg-primary-100 px-[23px] py-[12px] flex justify-center items-center rounded-lg text-lg text-white">
      {text}
    </button>
  );
}
