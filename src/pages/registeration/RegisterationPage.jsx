import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { nanoid } from "nanoid";
import { InputBlock, Button, TagChip } from "@/components";
import { postProduct } from "@/apis";
import styles from "./Registeration.module.css";

export default function RegisterationPage() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    tags: [],
    images: [],
  });
  const [tagInput, setTagInput] = useState("");

  const registerMutation = useMutation({
    mutationFn: postProduct,
  });

  return (
    <div className={styles.container}>
      <form
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault();
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            e.stopPropagation();
          }
        }}
      >
        <div className={styles.titleContainer}>
          <h2 className={styles.title}>상품 등록하기</h2>
          <Button
            variant="rectangle"
            disabled={false}
            onClick={() => {
              registerMutation.mutate({
                ...data,
                price: +data.price,
                tags: data.tags.map((t) => t.value),
              });
              navigate("/items");
            }}
          >
            등록
          </Button>
        </div>
        <div className={styles.inputBlocksContainer}>
          <InputBlock
            title="상품명"
            errorMsg={
              data.name.trim().length > 10 ? "10자 이내로 입력해주세요" : ""
            }
            placeholder="상품명을 입력해주세요"
            value={data.name}
            onChange={(e) => {
              setData((prev) => ({ ...prev, name: e.target.value }));
            }}
            className={styles.input}
          />
          <InputBlock
            title="상품 소개"
            errorMsg={
              data.description.trim().length < 10
                ? "10자 이상 입력해주세요"
                : ""
            }
            multiline={true}
            placeholder="상품 소개를 입력해주세요"
            value={data.description}
            onChange={(e) => {
              setData((prev) => ({ ...prev, description: e.target.value }));
            }}
            className={styles.textarea}
          />
          <InputBlock
            title="판매가격"
            errorMsg={isNaN(+data.price) ? "숫자로 입력해주세요" : ""}
            placeholder="판매 가격을 입력해주세요"
            value={data.price}
            onChange={(e) => {
              setData((prev) => ({ ...prev, price: e.target.value }));
            }}
            className={styles.input}
          />
          <InputBlock
            title="태그"
            errorMsg="5글자 이내로 입력해주세요"
            errorMsg={tagInput.length > 5 ? "5글자 이내로 입력해주세요" : ""}
            placeholder="태그를 입력해주세요"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => {
              if (tagInput.trim() && e.key === "Enter") {
                setData((prev) => ({
                  ...prev,
                  tags: [...prev.tags, { id: nanoid(), value: tagInput }],
                }));
                setTagInput("");
              }
            }}
            className={styles.input}
          />
        </div>
        <div className={styles.tagsContainer}>
          {data.tags.map((tag) => (
            <TagChip
              key={tag.id}
              text={tag.value}
              onClick={() => {
                setData((prev) => ({
                  ...prev,
                  tags: prev.tags.filter((t) => t.id !== tag.id),
                }));
              }}
            />
          ))}
        </div>
      </form>
    </div>
  );
}
