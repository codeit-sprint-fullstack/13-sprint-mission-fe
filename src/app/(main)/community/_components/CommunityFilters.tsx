"use client";

import { useRouter, useSearchParams } from "next/navigation";
import SearchBar from "@/components/common/SearchBar";
import Dropdown from "@/components/common/Dropdown";
import { COMMUNITY_POST_OPTIONS } from "@/constants/dropdownOption";
import { ROUTES } from "@/constants/navigation";

interface CommunityFiltersProps {
  currentKeyword: string;
  currentOrderBy: string;
}

export default function CommunityFilters({
  currentKeyword,
  currentOrderBy,
}: CommunityFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function updateParams(updates: Record<string, string>) {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      params.set(key, value);
    });
    router.push(`${ROUTES.COMMUNITY.BASE}?${params.toString()}`);
  }

  return (
    <div className="flex w-full justify-between">
      <SearchBar
        currentKeyword={currentKeyword}
        onSearch={(keyword) => updateParams({ keyword })}
      />
      <Dropdown
        options={COMMUNITY_POST_OPTIONS}
        value={currentOrderBy}
        onChange={(orderBy) => updateParams({ orderBy })}
      />
    </div>
  );
}
