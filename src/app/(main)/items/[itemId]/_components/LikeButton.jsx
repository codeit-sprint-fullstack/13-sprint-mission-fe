"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function LikeButton({ favoriteCount, isFavorite, itemId }) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: () =>
      isFavorite
        ? fetch(
            `https://panda-market-api.vercel.app/products/${itemId}/favorite`,
            {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              },
            },
          )
        : fetch(
            `https://panda-market-api.vercel.app/products/${itemId}/favorite`,
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              },
            },
          ),
    // When mutate is called:
    onMutate: async () => {
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ["item", itemId] });

      // Snapshot the previous value
      const previousTodos = queryClient.getQueryData(["item", itemId]);

      // Optimistically update to the new value
      queryClient.setQueryData(["item", itemId], (old) => ({
        ...old,
        isFavorite: !old.isFavorite,
        favoriteCount: old.isFavorite
          ? old.favoriteCount - 1
          : old.favoriteCount + 1,
      }));

      // Return a context object with the snapshotted value
      return { previousTodos };
    },
    // If the mutation fails,
    // use the context returned from onMutate to roll back
    onError: (err, newItem, context) => {
      queryClient.setQueryData(["item", itemId], context.previousTodos);
      alert("에러 발생해서 롤백처리");
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["item", itemId] });
    },
  });

  return (
    <button
      onClick={mutate}
      className="border-cool-gray-200 cursor-pointer rounded-[35px] border border-solid px-3 py-1"
    >
      {isFavorite ? <p>🖤 {favoriteCount}</p> : <p>🤍 {favoriteCount}</p>}
    </button>
  );
}
