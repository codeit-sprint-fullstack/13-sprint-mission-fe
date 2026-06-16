import { clsx } from "clsx";

export default function Button({
  as: Component = "button",
  className = "",
  variant = "primary",
  children,
  ...props
}) {
  return (
    <Component
      className={clsx(
        "flex justify-center items-center cursor-pointer",
        variant === "primary" &&
          "h-10.5 py-3 px-5.75 rounded-lg text-[16px]/[calc(26/16)] font-semibold text-gray-100 bg-primary-100 disabled:text-gray-100 disabled:bg-cool-gray-400 disabled:cursor-default",
        variant === "secondary" &&
          "w-60 p-3 text-[18px]/[calc(26/18)] font-semibold rounded-[40px] text-secondary-50 bg-primary-100 md:w-89.25 md:text-[20px]/[calc(32/20)]",
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
