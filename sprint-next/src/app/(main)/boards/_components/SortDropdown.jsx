"use client";

import { useRouter, useSearchParams } from "next/navigation";
import SortDropdown from "@/components/ui/SortDropdown";

export default function BoardsSortDropdown() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderBy = searchParams.get("orderBy") ?? "recent";

  return (
    <SortDropdown
      value={orderBy}
      onChange={(value) => router.push(`?orderBy=${value}`)}
    />
  );
}
