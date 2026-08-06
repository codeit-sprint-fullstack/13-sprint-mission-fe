"use client";
import React from "react";
import Image from "next/image";

import useResponsiveWidth from "@/hooks/useResponsiveWidth";
import useDropdown from "@/hooks/useDropdown";
import { MenuType } from "@/types/menu";

interface IDropdownProps {
  menus: MenuType[];
  value: MenuType;
  onChange: React.Dispatch<React.SetStateAction<MenuType>>;
}

export default function Dropdown({ menus, value, onChange }: IDropdownProps) {
  const size = useResponsiveWidth();
  const { open, closeDropdown, toggleDropdown } = useDropdown();

  return (
    <div className="h-full text-[16px] hover:cursor-pointer max-[720px]:relative max-[720px]:w-fit">
      <div
        className="rounded-[12px] border border-secondary-200 px-[20px] py-[12px]"
        onClick={toggleDropdown}
      >
        <div className="flex h-[18px] w-[90px] items-center justify-between max-[720px]:w-fit">
          {size !== "mobile" ? (
            <>
              <p>{value.name}</p>
              <Image
                width={24}
                height={24}
                src="/icons/ic_arrow_down.svg"
                alt="드랍다운 아이콘"
                className="h-[24px] w-[24px] hover:cursor-pointer"
              />
            </>
          ) : (
            <>
              <Image
                width={24}
                height={24}
                src="/icons/ic_arrow_down.svg"
                alt="드랍다운 아이콘"
                className="h-[24px] w-[24px] hover:cursor-pointer"
              />
            </>
          )}
        </div>
      </div>

      <div
        onMouseLeave={closeDropdown}
        className={`absolute z-[500] mt-[8px] h-fit w-[130px] overflow-hidden rounded-[16px] bg-white border border-secondary-300 max-[720px]:right-0 ${!open ? "hidden" : ""}`}
      >
        {menus?.map((m) => (
          <div
            key={m.id}
            className="flex h-[42px] w-full items-center justify-center hover:cursor-pointer hover:bg-secondary-200"
            onClick={(e) => {
              onChange(m);
              closeDropdown();
            }}
          >
            {m.name}
          </div>
        ))}
      </div>
    </div>
  );
}
