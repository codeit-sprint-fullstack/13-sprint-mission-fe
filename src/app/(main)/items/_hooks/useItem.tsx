import { useQuery } from "@tanstack/react-query";

import { itemService } from "@/services/itemService";
import { ProductType } from "@/types/product";

interface IUseItemProps {
  itemId: number;
}

export default function useItem({ itemId }: IUseItemProps) {
  const { data: item } = useQuery<ProductType>({
    queryKey: ["products", itemId],
    queryFn: () => itemService.getItem(itemId),
  });
  return { item };
}
