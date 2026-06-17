import { clsx } from "clsx";

export default function Button({
  as: Component = "button",
  variant = "primary",
  className = "",
  width = "",
  children,
  ...props
}) {
  return (
    <Component
      className={clsx(
        "flex justify-center items-center cursor-pointer",
        variant === "primary" &&
          "h-[42px] py-[12px] px-[23px] rounded-[8px] text-[16px]/[calc(26/16)] font-semibold text-gray-100 bg-primary-100 disabled:text-gray-100 disabled:bg-cool-gray-400 disabled:cursor-default",
        variant === "secondary" &&
          "p-[12px] text-[18px]/[calc(26/18)] font-semibold rounded-[40px] text-secondary-50 bg-primary-100 md:text-[20px]/[calc(32/20)]",
        className,
      )}
      style={width ? { width: `${width}px` } : undefined}
      {...props}
    >
      {children}
    </Component>
  );
}
