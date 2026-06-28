import React from "react";
import ic_heart from "@/assets/icons/ic_heart.svg";
import ic_fullheart from "@/assets/icons/ic_fullheart.svg";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { productService } from "@/lib/productService";

export default function LikeBtn({ favoriteCount, isFavorite = false }) {
  const { id: productId } = useParams();
  const queryClient = useQueryClient();
  const favoriteMutation = useMutation({
    mutationFn: () => {
      const token = localStorage.getItem("accessToken");
      if (isFavorite) {
        return productService.deleteFavorite(productId, token);
      } else {
        return productService.postFavorite(productId, token);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["productDetail", productId] });
    },
  });

  const handleLikeClick = (e) => {
    e.preventDefault();
    favoriteMutation.mutate();
  };
  return (
    <button
      onClick={handleLikeClick}
      disabled={favoriteMutation.isPending}
      className={`flex items-center border border-gray-200 rounded-[35px] w-[79px] px-3 gap-1 text-lg font-medium h-8 lg:h-10`}
    >
      <div className="relative w-6 h-6 lg:w-8 lg:h-8">
        {isFavorite ? (
          <Image
            alt="좋아요 아이콘"
            src={ic_fullheart}
            fill
            className="object-contain"
          />
        ) : (
          <Image
            alt="좋아요 아이콘"
            src={ic_heart}
            fill
            className="object-contain"
          />
        )}
      </div>
      <span>{favoriteCount}</span>
    </button>
  );
}
