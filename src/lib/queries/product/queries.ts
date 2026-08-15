import { useQuery } from "@tanstack/react-query";

import { getProductByIdAction } from "@/lib/actions/products";

import { productKeys } from "./keys";

/** 상품 상세 조회 */
export function useProductDetail(productId: string | number) {
  return useQuery({
    queryKey: productKeys.detail(productId),
    queryFn: () => getProductByIdAction(productId),
  });
}
