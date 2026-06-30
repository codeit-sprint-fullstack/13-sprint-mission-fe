"use client";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import Image from "next/image";

import useResponsiveWidth from "@/hooks/useResponsiveWidth";
import Input from "@/components/ui/Input";
import Dropdown from "@/components/ui/Dropdown";
import Button from "@/components/ui/Button";
import ProductCardList from "@/components/ui/ProductCardList";
import Pagination from "@/components/ui/Pagination";
import { itemService } from "@/lib/itemService";

const menu = [
  {
    id: 1,
    type: "recent",
    name: "최신순",
  },
  {
    id: 2,
    type: "favorite",
    name: "좋아요순",
  },
];

export default function ItemPage() {
  const size = useResponsiveWidth();
  const [input, setInput] = useState("");
  const [keyword, setKeyword] = useState("");
  const [selected, setSelected] = useState(menu[0]);
  const [page, setPage] = useState(1);

  const { data: products = { list: [] }, isPending: isProductsPending } =
    useQuery({
      queryKey: ["products", page, selected, keyword, size],
      queryFn: async () => {
        const queryParams = new URLSearchParams({
          orderBy: selected.type,
          pageSize: size === "mobile" ? 4 : size === "tablet" ? 6 : 10,
          ...(input && { keyword: input }),
          ...(page !== 1 && { page }),
        });
        const result = await itemService.getItems(queryParams);
        return result;
      },
    });

  const { data: best = { list: [] }, isPending: isBestPending } = useQuery({
    queryKey: ["best", size],
    queryFn: () => {
      const pageSize = `pageSize=${size === "mobile" ? 1 : size === "tablet" ? 2 : 4}`;
      return itemService.getItems(`orderBy=favorite&${pageSize}&page=1`);
    },
  });

  return (
    <div className="mx-auto flex flex-col flex-1 gap-[40px] pt-[16px] pb-[140px] w-[1200px] max-[1280px]:w-fit max-[1280px]:px-[24px]">
      {/* 베스트 상품 */}
      <ProductCardList
        title="베스트 상품"
        column={{
          desktop: 4,
          tablet: 2,
          mobile: 1,
        }}
        data={best.list}
        isPending={isBestPending}
      />

      {/* 판매 중인 상품 */}
      <ProductCardList
        title="판매 중인 상품"
        column={{
          desktop: 5,
          tablet: 3,
          mobile: 2,
        }}
        data={products?.list}
        isPending={isProductsPending}
      >
        {size !== "mobile" ? (
          <div className="flex items-center gap-[16px]">
            <Input
              prefix={
                <Image
                  width={24}
                  height={24}
                  src="/icons/ic_search.svg"
                  alt="검색 아이콘"
                />
              }
              placeholder="검색할 상품을 입력하세요"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                if (e.target.value.length === 0) {
                  setPage(1);
                  setKeyword("");
                }
              }}
              onKeyDown={(e) => {
                if (e.code === "Enter") {
                  setPage(1);
                  setKeyword(input);
                }
              }}
              className="w-[270px] max-[1280px]:w-[174px]"
            />

            <Dropdown
              menus={menu}
              value={selected}
              onChange={(s) => {
                if (s !== selected) {
                  setSelected(s);
                  setPage(1);
                }
              }}
            />

            <Link href="/items/register">
              <Button variant="rectangle" className="bg-primary">
                상품 등록하기
              </Button>
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-[16px]">
            <Link href="/items/register">
              <Button variant="rectangle" className="bg-primary">
                상품 등록하기
              </Button>
            </Link>

            <Input
              placeholder="검색할 상품을 입력해주세요"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                if (e.target.value.length === 0) {
                  setPage(1);
                  setKeyword("");
                }
              }}
              onKeyDown={(e) => {
                if (e.code === "Enter") {
                  setPage(1);
                  setKeyword(input);
                }
              }}
              className="w-[270px] max-[1280px]:w-[174px]"
            />

            <Dropdown
              menus={menu}
              value={selected}
              onChange={(s) => {
                if (s !== selected) {
                  setSelected(s);
                  setPage(1);
                }
              }}
            />
          </div>
        )}
      </ProductCardList>

      <Pagination
        currentPage={page}
        totalCount={products?.totalCount}
        onChange={setPage}
      />
    </div>
  );
}
