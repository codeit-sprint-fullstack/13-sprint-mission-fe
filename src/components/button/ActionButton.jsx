"use client";

import clsx from "clsx";
import Link from "next/link";

export default function ActionButton({
  href = "",
  onClick = () => {},
  text = "",
  className = "",
  disabled = true,
}) {
  if (href) {
    return (
      <Link
        href={href}
        className={clsx(
          "text-600-16  rounded-[8] w-22 h-10.5 bg-primary-blue text-white flex items-center justify-center",
        )}
      >
        {text}
      </Link>
    );
  }
  return (
    <button
      className={clsx(
        "text-600-16  rounded-[8] w-18.5 h-10.5 flex items-center justify-center",
        !disabled
          ? "bg-primary-blue text-white cursor-pointer"
          : "bg-secondary-gray-400 text-secondary-gray-100",
        className,
      )}
      disabled={disabled}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
