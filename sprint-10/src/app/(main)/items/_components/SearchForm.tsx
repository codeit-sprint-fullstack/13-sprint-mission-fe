"use client";

import Image from "next/image";
import type { ChangeEvent, FormEvent } from "react";
import SearchIcon from "@/assets/svg/ic_search.svg";

type SearchFormProps = {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
};

export default function SearchForm({ value, onChange, onSubmit }: SearchFormProps) {
  return (
    <form
      onSubmit={onSubmit}
      className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-2.5 bg-gray-100 w-full"
    >
      <button type="submit" className="shrink-0">
        <Image src={SearchIcon} alt="검색" width={20} height={20} />
      </button>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="검색할 상품을 입력해주세요"
        className="bg-transparent outline-none text-sm flex-1 placeholder:text-gray-400"
      />
    </form>
  );
}
