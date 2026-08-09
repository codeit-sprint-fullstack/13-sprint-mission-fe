import React from "react";
import cn from "@/utils/cn";

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "rectangle" | "circle";
  disabled: boolean;
  children: React.ReactNode;
  className?: string;
}

const variants = {
  rectangle:
    "rounded-[8px] px-[23px] py-[8px] text-[16px] font-semibold text-secondary-100 bg-primary-100",
  circle: "rounded-full border border-secondary-200 p-[12px]",
};

export default function Button({
  variant = "rectangle",
  disabled,
  children,
  className,
  ...buttonProps
}: IButtonProps) {
  return (
    <button
      className={cn(
        "text-center cursor-pointer whitespace-nowrap",
        variants[variant],
        className,
        disabled && "bg-secondary-400 text-secondary-100 cursor-not-allowed",
      )}
      {...buttonProps}
    >
      {children}
    </button>
  );
}
