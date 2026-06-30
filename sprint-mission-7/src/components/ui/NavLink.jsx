// components/NavLink.jsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";

export default function NavLink({
  href,
  exact = false,
  className,
  activeClassName = "text-Primary-100",
  children,
  ...props
}) {
  const pathname = usePathname();

  const isActive = exact
    ? pathname === href
    : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        className,
        isActive && activeClassName,
        "text-[16px] font-bold tablet:text-[18px]",
      )}
      {...props}
    >
      {children}
    </Link>
  );
}
