import { useQuery } from "@tanstack/react-query";

import { itemService } from "@/services/itemService";
import { ProductListType } from "@/types/product";
import { MenuType } from "@/types/menu";

interface IUseItemsProps {
  page: number;
  selected: MenuType;
  keyword: string;
  size: "mobile" | "tablet" | "desktop";
}

export default function useItems({
  page,
  selected,
  keyword,
  size,
}: IUseItemsProps) {
  const {
    data: { list: products = [], totalCount = 0 } = {},
    isPending: isProductsPending,
  } = useQuery<ProductListType>({
    queryKey: ["products", page, selected, keyword, size],
    queryFn: async () => {
      const queryParams = new URLSearchParams({
        orderBy: String(selected?.type),
        pageSize: String(size === "mobile" ? 4 : size === "tablet" ? 6 : 10),
        ...(keyword && { keyword }),
        ...(page && { page: String(page) }),
      });
      const result = await itemService.getItems(queryParams);
      return result;
    },
  });

  const {
    data: { list: bestProducts = [] } = {},
    isPending: isBestProductsPending,
  } = useQuery<ProductListType>({
    queryKey: ["products", "best", size],
    queryFn: () => {
      const pageSize = `pageSize=${size === "mobile" ? 1 : size === "tablet" ? 2 : 4}`;
      return itemService.getItems(`orderBy=favorite&${pageSize}&page=1`);
    },
  });
  return {
    products,
    totalCount,
    isProductsPending,
    bestProducts,
    isBestProductsPending,
  };
}
