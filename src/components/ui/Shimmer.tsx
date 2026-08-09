import cn from "@/utils/cn";

interface IShimmerProps {
  children?: React.ReactNode;
  className?: string;
}

export default function Shimmer({ children, className = "" }: IShimmerProps) {
  return (
    <div
      className={cn(
        "animate-[shimmer_1.4s_linear_infinite] bg-[linear-gradient(90deg,var(--secondary-200)_25%,var(--secondary-100)_50%,var(--secondary-200)_75%)] bg-[length:200%_100%]",
        className,
      )}
    >
      {children}
    </div>
  );
}
