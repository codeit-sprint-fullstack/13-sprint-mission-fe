"use client";
import Image from "next/image";

import useResponsiveWidth from "@/hooks/useResponsiveWidth";
import useDropdown from "@/hooks/useDropdown";

export default function Dropdown({ menu, value, onChange }) {
  const size = useResponsiveWidth();
  const { open, closeDropdown, toggleDropdown } = useDropdown();

  return (
    <div className="h-full text-[16px] hover:cursor-pointer max-[720px]:relative">
      <div
        className="rounded-[12px] border border-secondary-200 px-[20px] py-[12px]"
        onClick={toggleDropdown}
      >
        <div
          className="
            flex h-[18px] w-[90px] items-center justify-between
            max-[720px]:w-fit
          "
        >
          {size !== "mobile" ? (
            <>
              <p>{value.name}</p>
              <Image
                width={24}
                height={24}
                src="/icons/ic_arrow_down.svg"
                alt="dropdown icon"
                className="h-[24px] w-[24px] hover:cursor-pointer"
              />
            </>
          ) : (
            <>
              <Image
                width={24}
                height={24}
                src="/icons/ic_search.svg"
                alt="dropdown icon"
                className="h-[24px] w-[24px] hover:cursor-pointer"
              />
            </>
          )}
        </div>
      </div>

      <div
        onMouseLeave={closeDropdown}
        className={`
          absolute z-[500] mt-[8px] h-fit w-[130px] overflow-hidden rounded-[16px] bg-white
          max-[720px]:right-0
          ${!open ? "hidden" : ""}
        `}
      >
        {menu?.map((m) => (
          <div
            key={m.id}
            className="
              flex h-[42px] w-full items-center justify-center
              hover:cursor-pointer hover:bg-secondary-200
              [&+div]:border-t [&+div]:border-secondary-200
            "
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
