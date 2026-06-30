import { cn } from "@/lib/cn";
import { cva } from "class-variance-authority";

const buttonVariants = cva(
  "inline-flex items-center justify-center cursor-pointer transition-colors " +
    "bg-Primary-100 hover:bg-Primary-200 active:bg-Primary-300 text-Cool-Gray-100 " +
    "disabled:cursor-not-allowed disabled:opacity-60",
  {
    variants: {
      variant: {
        primary: "text-white ",
        secondary:
          "bg-Cool-Gray-400 text-Cool-Gray-100 hover:bg-gray-300 active:bg-gray-400 ",
      },
      size: {
        large: "py-[16px] px-[124px] h-14 rounded-[40px]",
        medium: "py-[12px] px-[71px] h-12 rounded-[40px]",
        small: "py-[12px] px-[23px] h-[42px] rounded-[8px]",
        "small-48": "py-[12px] px-[23px] h-[48px] rounded-[8px]",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "medium",
    },
  },
);

export default function Button({
  children,
  onClick,
  type = "button",
  size,
  variant,
  className,
  ...rest
}) {
  return (
    <button
      type={type}
      className={cn(buttonVariants({ variant, size }), className)}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
}
