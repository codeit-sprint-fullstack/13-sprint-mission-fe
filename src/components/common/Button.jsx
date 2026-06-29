import { clsx } from "clsx";

export default function Button({
  as: Component = "button",
  variant = "primary",
  size = "md",
  className = "",
  width = "",
  children,
  ...props
}) {
  return (
    <Component
      className={clsx(
        "flex justify-center items-center cursor-pointer disabled:text-gray-100 disabled:bg-cool-gray-400 disabled:cursor-default text-nowrap",
        {
          "h-[42px] py-[12px] px-[23px] rounded-[8px] text-[16px]/[calc(26/16)] font-semibold text-gray-100 bg-primary-100":
            variant === "primary",

          "p-[12px] text-[18px]/[calc(26/18)] font-semibold rounded-[40px] text-secondary-50 bg-primary-100 md:text-[20px]/[calc(32/20)]":
            variant === "secondary",

          "h-[48px] min-w-[120px] md:min-w-[165px] py-[12px] px-[23px] rounded-[8px] text-[16px]/[calc(26/16)] font-semibold text-gray-100 bg-primary-100":
            variant === "tertiary" && size === "md",

          "h-[42px] min-w-[106px] py-[12px] px-[23px] rounded-[8px] text-[16px]/[calc(26/16)] font-semibold text-cool-gray-100 bg-primary-100":
            variant === "tertiary" && size === "sm",

          "min-w-[88px] py-[12px] px-[23px] rounded-[8px] border border-error-red text-[16px]/[calc(26/16)] font-semibold text-error-red bg-cool-gray-50":
            variant === "quaternary",

          "min-w-[88px] py-[12px] px-[23px] rounded-[8px] bg-error-red text-[16px]/[calc(26/16)] font-semibold text-cool-gray-100":
            variant === "quinary",
        },
        className,
      )}
      style={width ? { width } : undefined}
      {...props}
    >
      {children}
    </Component>
  );
}
