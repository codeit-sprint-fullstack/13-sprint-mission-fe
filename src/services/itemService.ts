import { PRODUCT_ENDPOINT } from "@/constants/endpoint";
import { defaultFetch } from "./fetchClient";
import { ItemListResponse } from "@/types";

interface GetItemsParams {
  page?: number;
  pageSize?: number;
  sort?: string;
  keyword?: string;
}

export const getItems = async ({
  page = 1,
  pageSize = 10,
  sort = "recent",
  keyword = "",
}: GetItemsParams = {}): Promise<ItemListResponse> => {
  const params = new URLSearchParams({
    page: String(page),
    pageSize: String(pageSize),
    orderBy: sort,
  });

  if (keyword) {
    params.append("keyword", keyword);
  }

  return defaultFetch(`${PRODUCT_ENDPOINT}?${params.toString()}`, {
    cache: "no-store",
  });
};
