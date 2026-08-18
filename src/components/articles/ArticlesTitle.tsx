import { clsx } from "clsx";

export default function ArticlesTitle({
  title = "",
  className = "",
}: {
  title?: string;
  className?: string;
}) {
  return (
    // margin-bottom은 사용하는 곳에서 사용
    <p
      className={clsx(
        "text-[18px]/[calc(26/18)] md:text-[20px]/[calc(24/20)] font-bold text-secondary-900",
        className,
      )}
    >
      {title}
    </p>
  );
}
