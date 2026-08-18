"use client";

import { clsx } from "clsx";
import type { ReactNode } from "react";

export default function PageContainer({
  children,
  size = "md",
}: {
  children: ReactNode;
  size?: "sm" | "md";
}) {
  return (
    <section
      className={clsx(
        "pr-[16px] pl-[16px]",
        (size === "md"
          ? "md:pr-[24px] md:pl-[24px]"
          : "md:pr-[52px] md:pl-[52px]"),
      )}
    >
      <main
        className={clsx(
          "mx-auto w-full ",
          size === "md" ? "max-w-[1200px]" : "max-w-[640px]",
        )}
      >
        {children}
      </main>
    </section>
  );
}
