import { cva } from "class-variance-authority";

const buttonVariants = cva(
  "text-gray-100 bg-Primary-100 enabled:hover:bg-Primary-200 enabled:active:bg-Primary-300 disabled:bg-gray-400 disabled:cursor-not-allowed",
  {
    variants: {
      size: {
        large: "py-4 px-31 h-14 rounded-[40px] text-xl",
        medium: "py-3 px-17.75 h-12 rounded-[40px] text-lg",
        small: "py-3 px-5.75 h-10.5 rounded-lg text-base",
        "small-48": "py-3 px-5.75 h-12 rounded-lg text-base",
      },
    },
    defaultVariants: {
      size: "medium",
    },
  },
);

export default function Button({
  children,
  onClick,
  type = "button",
  size,
  disabled = false,
  className,
  ...rest
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={buttonVariants({ size, className })}
      {...rest}
    >
      {children}
    </button>
  );
}
