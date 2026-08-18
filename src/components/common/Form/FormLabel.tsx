import { clsx } from "clsx";

export default function FormLabel({
  label,
  size = "md",
}: {
  label: string;
  size?: "sm" | "md";
}) {
  return (
    <p
      className={clsx(
        "text-[18px]/[calc(26/18)] font-bold text-secondary-800",
        size === "md" ? "mb-[16px]" : "mb-[8px] md:mb-[16px]",
      )}
    >
      {label}
    </p>
  );
}
