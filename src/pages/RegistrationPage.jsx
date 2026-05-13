import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../api/products.js";
import useProductValidation from "../hooks/useProductValidation.js";
import styles from "./RegistrationPage.module.css";

export default function RegistrationPage() {
  // 4개 input의 값을 객체 하나로 묶어서 관리.
  // useState 4개 따로 만드는 것보다 한 번에 다루기 편함.
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    tags: [],
  });
  const [tagInput, setTagInput] = useState("");

  // 제출 중인지 표시 (중복 클릭 방지 + UX)
  const [submitting, setSubmitting] = useState(false);

  const { errors, isValid } = useProductValidation(values, tagInput);
  //   console.log("errors:", errors, "isValid:", isValid);
  // 페이지 이동용 hook (등록 후 상세 페지이로)
  const navigate = useNavigate();

  // 모든 input의 onChange를 하나로 처리.
  // e.target.name (input의 name속성)을 키로 사용해서 해당 필드만 갱신.
  function handleChange(e) {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  function handleTagKeyDown(e) {
    //IME조합 중이면 그냥 무시
    if (e.nativeEvent.isComposing) return;

    // Enter 키 + 빈 값 아닐 때만 추가
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      const newTag = tagInput.trim();

      // 중복 방지 (옵션)
      if (!values.tags.includes(newTag)) {
        setValues((prev) => ({ ...prev, tags: [...prev.tags, newTag] }));
      }
      setTagInput("");
    }
  }

  function handleRemoveTag(tagToRemove) {
    setValues((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tagToRemove),
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault(); //form의 기본 새로고침 동작 막기

    if (submitting) return; // 중복 제출 방지
    setSubmitting(true);

    try {
      const newProduct = await createProduct({
        name: values.name,
        description: values.description,
        price: Number(values.price), //input의 value는 항상 문자열이라 숫자로 변환
        tags: values.tags,
      });

      //등록 성공 -> 해당 상품 상세 페이지로 이동
      navigate(`/products/${newProduct._id}`);
    } catch (err) {
      console.error(err);
      alert(err.message); // 임시 에러 표시. 심화에서 좀 더 다믐을 수도.
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <form className={styles.form} onSubmit={handleSubmit}>
          {/* 헤더는 form안으로 이동 - submit 버튼이 form의 일부이도록 */}
          <div className={styles.header}>
            <h1 className={styles.title}>상품 등록하기</h1>
            <button
              type="submit"
              className={styles.submitBtn}
              disabled={!isValid || submitting}
            >
              등록
            </button>
          </div>

          <div className={styles.field}>
            <label htmlFor="name" className={styles.label}>
              상품명
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className={`${styles.input} ${errors.name ? styles.inputError : ""}`}
              placeholder="상품명을 입력해주세요"
              value={values.name}
              onChange={handleChange}
            />
            {errors.name && (
              <p className={styles.errorMessage}>{errors.name}</p>
            )}
          </div>

          <div className={styles.field}>
            <label htmlFor="description" className={styles.label}>
              상품 소개
            </label>
            <textarea
              id="description"
              name="description"
              className={`${styles.input} ${styles.textarea} ${errors.description ? styles.inputError : ""}`}
              placeholder="상품 소개를 입력해주세요"
              value={values.description}
              onChange={handleChange}
            />
            {errors.description && (
              <p className={styles.errorMessage}>{errors.description}</p>
            )}
          </div>

          <div className={styles.field}>
            <label htmlFor="price" className={styles.label}>
              판매가격
            </label>
            <input
              id="price"
              name="price"
              type="number"
              className={`${styles.input} ${errors.price ? styles.inputError : ""}`}
              placeholder="판매 가격을 입력해주세요"
              value={values.price}
              onChange={handleChange}
            />
            {errors.price && (
              <p className={styles.errorMessage}>{errors.price}</p>
            )}
          </div>

          {/* 태그 (기본은 그냥 input. 심화에서 칩으로 확장) */}
          <div className={styles.field}>
            <label htmlFor="tags" className={styles.label}>
              태그
            </label>
            <input
              id="tags"
              type="text"
              className={`${styles.input} ${errors.tag ? styles.inputError : ""}`}
              placeholder="태그를 입력해주세요"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleTagKeyDown}
            />
            {errors.tag && <p className={styles.errorMessage}>{errors.tag}</p>}
            {/* 칩 영역 - 태그가 있을 때만 보여 */}
            {values.tags.length > 0 && (
              <div className={styles.tagList}>
                {values.tags.map((tag) => (
                  <span key={tag} className={styles.tagChip}>
                    #{tag}
                    <button
                      type="button"
                      className={styles.tagRemoveBtn}
                      onClick={() => handleRemoveTag(tag)}
                      aria-label={`${tag} 태그 제거`}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </form>
      </div>
    </main>
  );
}
