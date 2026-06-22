"use client";
import clsx from "clsx";
import { usePathname } from "next/navigation.js";

export default function Container({ children, className = "" }) {
  const pathname = usePathname();
  const isArticles = pathname === "/articles";
  const isCreateOrEdit =
    pathname.startsWith("/articles") &&
    (pathname.endsWith("/create") || pathname.endsWith("/edit"));
  const isDetail = !isCreateOrEdit && /^\/articles\/[^/]+$/.test(pathname);
  return (
    <div
      className={clsx(
        "px-4 md:px-6 lg:px-90",
        isArticles && "mt-4 md:mt-6",
        isCreateOrEdit && "mt-4 lg:mt-6",
        isDetail && "mt-6 md:mt-6.5 lg:mt-8.5",
        className,
      )}
    >
      {children}
    </div>
  );
}
