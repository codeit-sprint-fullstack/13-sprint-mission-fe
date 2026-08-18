import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { itemService, ItemPostRequestType } from "@/services/itemService";
import { ProductType, ProductUploadType } from "@/types/product";

interface IItemDataProps {
  itemId?: number;
}

export default function useItemMutations({ itemId }: IItemDataProps) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const postItemMutation = useMutation<ProductType, Error, ItemPostRequestType>(
    {
      mutationKey: ["products"],
      mutationFn: async ({ itemData }) => {
        const formData = new FormData();
        formData.append("name", itemData.name.trim());
        formData.append("description", itemData.description.trim());
        formData.append("price", String(itemData.price));
        itemData.tags.forEach((tag) => {
          formData.append("tags", tag);
        });
        itemData.images.forEach((image) => {
          formData.append("images", image);
        });
        return await itemService.postItem(formData);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["products"],
        });
        router.push("/items");
      },
    },
  );
  const deleteItemMutation = useMutation<ProductType>({
    mutationKey: ["products", itemId],
    mutationFn: () => itemService.deleteItem(itemId!),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
      router.push("/items");
    },
  });

  return { postItemMutation, deleteItemMutation };
}
