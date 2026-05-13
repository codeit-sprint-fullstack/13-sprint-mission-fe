import styles from "../style/Registration.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Registration() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [tags, setTags] = useState("");
  const navigate = useNavigate();

  async function handleSubmit() {
    const productData = {
      name,
      description,
      price: Number(price),
      tags: tags.split(","),
    };
    try {
      const response = await fetch(
        "https://sprint-mission-5.onrender.com/products",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productData),
        },
      );

      const result = await response.json();

      console.log(result);
      alert("상품 등록 완료!");
      navigate(`/items/${result._id}`);
    } catch (error) {
      console.error(error);
      alert("등록 실패");
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>상품 등록하기</h1>
        <button
          type="button"
          className={styles.submitButton}
          onClick={handleSubmit}
        >
          등록
        </button>
      </div>
      <form className={styles.form}>
        <div className={styles.formGroup}>
          <label className={styles.label}>상품명</label>

          <input
            type="text"
            placeholder="상품명을 입력해주세요"
            className={styles.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      </form>
      <div className={styles.formGroup}>
        <label className={styles.label}>상품소개</label>

        <textarea
          placeholder="상품 소개를 입력해주세요"
          className={styles.textarea}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label}>판매가격</label>

        <input
          type="text"
          placeholder="판매 가격을 입력해주세요"
          className={styles.input}
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label}>태그</label>

        <input
          type="text"
          placeholder="태그를 입력해주세요"
          className={styles.input}
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
      </div>
    </div>
  );
}

// async function handleSubmit() {
//   const productData = {
//     name,
//     description,
//     price: Number(price),
//     tags: tags.split(","),
//   };

//   console.log(productData);

//   try {
//     console.log("fetch 시작");

//     const response = await fetch("http://localhost:3000/products", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(productData),
//     });

//     console.log("fetch 완료");

//     const result = await response.json();

//     console.log(result);

//     alert("상품 등록 완료!");
//   } catch (error) {
//     console.error(error);

//     alert("등록 실패");
//   }
// }
