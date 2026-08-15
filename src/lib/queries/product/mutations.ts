import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toggleLikeAction } from "@/lib/actions/user";
import type { Product } from "@/types/product";

import { productKeys } from "./keys";

/** 상품 좋아요 토글 (추가/취소 겸용) */
export function useToggleLike(productId: string | number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => toggleLikeAction(productId),

    // 낙관적 업데이트
    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: productKeys.detail(productId),
      });
      const previousProduct = queryClient.getQueryData<Product>(
        productKeys.detail(productId),
      );

      queryClient.setQueryData<Product>(productKeys.detail(productId), (old) =>
        old
          ? {
              ...old,
              isLiked: !old.isLiked,
              likeCount: old.isLiked ? old.likeCount - 1 : old.likeCount + 1,
            }
          : old,
      );

      return { previousProduct };
    },

    // 실패 시 롤백
    onError: (error, _vars, context) => {
      queryClient.setQueryData(
        productKeys.detail(productId),
        context?.previousProduct,
      );
      console.error("좋아요 처리에 실패했습니다.", error.message, error.cause);
    },

    // 성공 시 서버 데이터로 동기화
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: productKeys.detail(productId),
      });
    },
  });
}
