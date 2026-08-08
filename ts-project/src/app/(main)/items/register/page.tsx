"use client";
import React, { useState } from "react";
import Image from "next/image";

import useItemMutations from "../_hooks/useItemMutations";
import FormField from "@/components/ui/FormField";
import Button from "@/components/ui/Button";
import DeleteButton from "@/components/ui/DeleteButton";

import {
  validateName,
  validateDescription,
  validateNumber,
  validateTag,
  validateImages,
} from "@/utils/validation";
import { ProductUploadType } from "@/types/product";

export default function ItemRegisterPage() {
  const [tagInput, setTagInput] = useState<string>("");
  const [itemData, setItemData] = useState<
    Pick<ProductUploadType, "name" | "description" | "images"> & {
      price: string;
      tags: string[];
    }
  >({
    name: "",
    description: "",
    price: "",
    tags: [],
    images: [],
  });
  const [validationResults, setValidationResults] = useState({
    name: true,
    description: true,
    price: true,
    tag: true,
    images: true,
  });
  const isValidated = Object.values(validationResults).every((i) => i);

  const { postItemMutation } = useItemMutations({});

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const { price, ...rest } = itemData;
        postItemMutation.mutate({
          itemData: { ...rest, price: Number(price) },
        });
      }}
      className="flex-1 pt-[24px] pb-[100px] m-auto w-[1200px] max-desktop:px-[20px] max-desktop:w-full"
    >
      <div className="flex justify-between">
        <h1 className="text-[20px] font-bold mb-[29px]">상품 등록하기</h1>
        <Button
          type="submit"
          disabled={
            !itemData.name ||
            !itemData.description ||
            !itemData.price ||
            !isValidated
          }
          className="bg-primary text-white px-[23px] rounded-[8px]"
        >
          등록
        </Button>
      </div>
      <main className="flex flex-col gap-[32px]">
        <section>
          <h2 className="text-[18px] font-bold mb-[16px]">상품 이미지</h2>
          <div className="flex">
            <input
              type="file"
              accept="image/*"
              id="file"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const fileList = e.target.files;
                if (!fileList) return;
                const files = Array.from(fileList);
                setValidationResults((prev) => ({
                  ...prev,
                  images: validateImages(files),
                }));
                if (!validateImages(files)) return;
                setItemData((prev) => ({
                  ...prev,
                  images: files,
                }));
              }}
              hidden
              multiple
            />
            <label htmlFor="file" className="mr-[10px]">
              <div className="w-[282px] h-[282px] rounded-[12px] bg-secondary-200 flex items-center justify-center flex-col cursor-pointer">
                <p className="text-[28px] text-secondary-400">+</p>
                <p className="text-[16px] text-secondary-400">이미지 등록</p>
              </div>
            </label>
            <div className="overflow-x-auto flex gap-[10px]">
              {itemData.images.map((image, index) => (
                <div
                  key={index}
                  className="relative w-[282px] h-[282px] shrink-0"
                >
                  <Image
                    fill
                    src={URL.createObjectURL(image)}
                    alt="상품 이미지"
                    className="object-cover rounded-[12px]"
                  />
                  <DeleteButton
                    onClick={() => {
                      const remainingImages = itemData.images.filter(
                        (tag, i) => i !== index,
                      );
                      setItemData((prev) => ({
                        ...prev,
                        images: remainingImages,
                      }));
                    }}
                    className="absolute right-[10px] top-[10px] z-[50]"
                  />
                </div>
              ))}
            </div>
          </div>
          {!validationResults.images && (
            <p className="text-error">이미지는 최대 3개까지 등록 가능합니다</p>
          )}
        </section>
        <FormField
          title="상품명"
          placeholder="상품명을 입력해주세요"
          value={itemData.name}
          errorMsg={
            itemData.name && !validationResults.name
              ? "10자 이내로 입력해주세요"
              : ""
          }
          onChange={(e) => {
            const input = e.target.value;
            if (!input.trim()) {
              setValidationResults((prev) => ({ ...prev, name: true }));
            }
            setItemData((prev) => ({ ...prev, name: e.target.value }));
            setValidationResults((prev) => ({
              ...prev,
              name: validateName(input),
            }));
          }}
        />
        <FormField
          title="상품 소개"
          placeholder="상품 소개를 입력해주세요"
          multiline={true}
          errorMsg={
            itemData.description && !validationResults.description
              ? "10자 이상 입력해주세요"
              : ""
          }
          value={itemData.description}
          onChange={(
            e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
          ) => {
            const input = e.target.value;
            setItemData((prev) => ({ ...prev, description: input }));
            if (!input.trim()) {
              return setValidationResults((prev) => ({
                ...prev,
                description: true,
              }));
            }
            setValidationResults((prev) => ({
              ...prev,
              description: validateDescription(input),
            }));
          }}
          className="h-[282px]"
        />
        <FormField
          title="판매가격"
          placeholder="판매 가격을 입력해주세요"
          value={itemData.price}
          errorMsg={
            itemData.price && !validationResults.price
              ? "숫자로 입력해주세요"
              : ""
          }
          onChange={(e) => {
            const input = e.target.value;
            setItemData((prev) => ({ ...prev, price: e.target.value }));
            if (!input.trim()) {
              setValidationResults((prev) => ({ ...prev, price: true }));
            }
            setValidationResults((prev) => ({
              ...prev,
              price: validateNumber(input),
            }));
          }}
        />
        <FormField
          title="태그"
          placeholder="태그를 입력해주세요"
          value={tagInput}
          errorMsg={
            tagInput && !validationResults.tag
              ? "5글자 이내로 입력해주세요"
              : ""
          }
          onChange={(e) => {
            const input = e.target.value.trim();
            if (!input) {
              setValidationResults((prev) => ({ ...prev, tag: true }));
            }
            setTagInput(input);
            setValidationResults((prev) => ({
              ...prev,
              tag: validateTag(input),
            }));
          }}
          onKeyDown={(e) => {
            if (e.key !== "Enter") return;

            e.preventDefault();

            if (
              !tagInput ||
              !validationResults.tag ||
              itemData.tags.includes(tagInput)
            ) {
              return;
            }

            setItemData((prev) => ({
              ...prev,
              tags: [...prev.tags, tagInput],
            }));

            setTagInput("");
          }}
        />
        <div className="flex gap-[12px]">
          {itemData.tags.map((tag, index) => (
            <div
              key={index}
              className="w-fit flex items-center gap-[9px] text-secondary-800 text-[16px]/[26px] bg-secondary-100 rounded-[26px] px-[12px] py-[5px]"
            >
              <p className="whitespace-nowrap">#{tag}</p>
              <DeleteButton
                onClick={() => {
                  const remainingTags = itemData.tags.filter(
                    (tag, i) => i !== index,
                  );
                  setItemData((prev) => ({
                    ...prev,
                    tags: remainingTags,
                  }));
                }}
              />
            </div>
          ))}
        </div>
      </main>
    </form>
  );
}
