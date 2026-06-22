"use client";
import { useState } from "react";
import Image from "next/image";

export default function Dropdown({ menus, value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [clicked, setClicked] = useState(menus[0]);

  return (
    <div className="relative">
      <div
        onClick={() => {
          setIsOpen((prev) => !prev);
        }}
        className="w-[130px] flex justify-between items-center px-[20px] py-[12px] border border-secondary-200 rounded-xl cursor-pointer max-tablet:w-fit"
      >
        <p className="max-tablet:hidden">{value}</p>
        <Image
          src="/icons/ic_arrow_down.svg"
          alt="dropdown icon"
          width={24}
          height={24}
          className="max-tablet:hidden"
        />
        <Image
          src="/icons/ic_sort.svg"
          alt="dropdown icon"
          width={24}
          height={24}
          className="hidden max-tablet:block"
        />
      </div>
      {isOpen && (
        <div className="w-[130px] absolute mt-[8px] border border-secondary-200 rounded-[12px] overflow-hidden divide-y divide-secondary-200 max-tablet:right-0">
          {menus.map((menu, index) => (
            <div
              key={index}
              onClick={() => {
                onChange(menu);
                setIsOpen(false);
              }}
              className="w-full py-[8px] flex justify-center bg-white whitespace-nowrap cursor-pointer hover:bg-secondary-100"
            >
              <p className="m-auto">{menu}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
