import clsx from "clsx";
import Image from "next/image.js";
import Link from "next/link.js";
import logo from "@/asset/image/logo.png";

export default function LinkButton({
  text = "",
  href = "",
  pathname = "",
  variant = "header",
  className = "",
}) {
  if (variant === "header") {
    return (
      <Link
        href={href}
        className={clsx(
          "text-700-16 md:text-700-18",
          pathname.startsWith("/articles")
            ? "text-primary-blue"
            : "text-secondary-gray-600",
          className,
        )}
      >
        {text}
      </Link>
    );
  }
  if (variant === "footer") {
    return (
      <Link
        href={href}
        className={clsx("text-400-16 text-secondary-gray-200", className)}
      >
        {text}
      </Link>
    );
  }
  if (variant === "home") {
    return (
      <Link href={href}>
        <div className={clsx("flex md:items-end gap-[8.5px]", className)}>
          <Image src={logo} alt="로고" className="w-10 h-10 hidden md:block " />
          <span className="font-rokaf-sans text-[20px] md:text-[25px] pt-1.5 md:pt-0 md:pb-0.5 text-primary-blue md:leading-none">
            {text}
          </span>
        </div>
      </Link>
    );
  }
}
