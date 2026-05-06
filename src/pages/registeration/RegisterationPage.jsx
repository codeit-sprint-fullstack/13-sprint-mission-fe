import React, { useState } from "react";
import { InputBlock, Button } from "@/components";
import styles from "./Registeration.module.css";

export default function RegisterationPage() {
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    tags: [],
  });
  const [tagInput, setTagInput] = useState("");

  return (
    <form className={styles.form}>
      <div className={styles.titleContainer}>
        <h2 className={styles.title}>상품 등록하기</h2>
        <Button variant="rectangle" disabled={true}>
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
            data.description.trim().length < 10 ? "10자 이상 입력해주세요" : ""
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
            if (tagInput.trim() && e.code === "Enter")
              setData((prev) => ({
                ...prev,
                tags: [...prev.tags, tagInput],
              }));
          }}
          className={styles.input}
        />
      </div>
    </form>
  );
}
