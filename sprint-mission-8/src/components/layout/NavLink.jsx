"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";

export default function NavLink({
  href,
  className,
  activeClassName = "text-Primary-100",
  children,
  ...props
}) {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      className={cn(
        "text-gray-600 text-[16px] font-bold tablet:text-[18px]",
        className,
        isActive && activeClassName,
      )}
      {...props}
    >
      {children}
    </Link>
  );
}
