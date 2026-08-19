"use client";

import { Product, updateProduct, uploadProductImage } from "@/lib/ProductApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

const MAX_IMAGES = 3;

export type EditForm = {
  name: string;
  description: string;
  price: number;
  tags: string[];
};

export default function useProductEdit(
  productId: string,
  product: Product | undefined,
) {
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<EditForm | null>(null);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [newImages, setNewImages] = useState<
    { file: File; previewUrl: string }[]
  >([]);

  const { mutate: handleUpdate, isPending: isUpdating } = useMutation({
    mutationFn: async (data: EditForm) => {
      const uploaded = await Promise.all(
        newImages.map((img) => uploadProductImage(img.file)),
      );
      const images = [...existingImages, ...uploaded];
      return updateProduct(productId, { ...data, images });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product", productId] });
      setIsEditing(false);
      setNewImages([]);
    },
    onError: (err) => alert(err.message),
  });

  const startEditing = () => {
    if (!product) return;
    const { name, description, price, tags, images } = product;
    setEditForm({ name, description, price, tags });
    setExistingImages(images ?? []);
    setNewImages([]);
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setIsEditing(false);
    setNewImages([]);
  };

  const handleEditFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files ?? []);
    if (selected.length === 0) return;

    const remaining = MAX_IMAGES - existingImages.length - newImages.length;
    if (remaining <= 0) {
      alert(`이미지는 최대 ${MAX_IMAGES}개까지 등록할 수 있습니다.`);
      e.target.value = "";
      return;
    }

    const toAdd = selected.slice(0, remaining).map((file) => ({
      file,
      previewUrl: URL.createObjectURL(file),
    }));
    setNewImages((prev) => [...prev, ...toAdd]);
    e.target.value = "";
  };

  const handleRemoveExistingImage = (index: number) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleRemoveNewImage = (index: number) => {
    setNewImages((prev) => prev.filter((_, i) => i !== index));
  };

  return {
    MAX_IMAGES,
    isEditing,
    editForm,
    setEditForm,
    existingImages,
    newImages,
    isUpdating,
    startEditing,
    cancelEditing,
    handleUpdate,
    handleEditFileChange,
    handleRemoveExistingImage,
    handleRemoveNewImage,
  };
}
