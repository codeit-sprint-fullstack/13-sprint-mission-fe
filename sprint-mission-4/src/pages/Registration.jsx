import React from "react";
import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./Registration.css";
// import { postProduct } from "../hooks/postProduct";

import x from "../assets/icons/ic_X.svg";

export default function Registration() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    tags: [],
  });
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tagInput, setTagInput] = useState("");
  // const [errors, setErrors] = useState({});
  // const handleDelete = (id) => {
  //   setFormData((prev) => prev.filter((el) => el.id !== id)); -> 배열이 아니라서 이렇게는 못함 ㅇㅇ
  // };
  const handleTagKeyDown = (e) => {
    if (e.key !== "Enter") return;
    e.preventDefault();
    const newTag = tagInput.trim();
    if (!newTag) return;
    setFormData((prev) => ({
      ...prev,
      tags: [...prev.tags, newTag],
    }));
    setTagInput("");
  };

  const handleDeleteTag = useCallback((tagToDelete) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToDelete),
    }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 폼 제출
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const productData = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        price: parseInt(formData.price),
        tags: formData.tags,
      };

      // API 호출
      const API_URL = import.meta.env.VITE_API_URL;
      const res = await fetch(`${API_URL}/product`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "상품 등록에 실패했습니다.");
      }
      const result = await res.json();
      setSuccess(true);
      setTimeout(() => {
        navigate(`/product/${result._id}`);
      }, 5000);
    } catch (err) {
      console.error("에러:", err);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return <h2>제출 성공</h2>;
  }

  return (
    <div className="registration-container">
      <div className="registration-wrapper">
        <h2>상품 등록하기</h2>
        <button
          className="regist-btn"
          type="submit"
          form="product-form"
          disabled={loading}
        >
          등록
        </button>
      </div>

      <form
        id="product-form"
        onSubmit={handleSubmit}
        className="registration-form"
      >
        {/* 상품명 */}
        <div className="form-group">
          <label htmlFor="name" className="form-label">
            상품명
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="상품명을 입력해주세요"
            className="form-input"
            required
          />
        </div>

        {/* 상품 소개 */}
        <div className="form-group">
          <label htmlFor="description" className="form-label">
            상품 소개
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="상품 소개를 입력해주세요"
            className="form-input-description"
            required
          />
        </div>

        {/* 판매 가격 */}
        <div className="form-group">
          <label htmlFor="price" className="form-label">
            판매 가격
          </label>
          <div className="price-input-wrapper">
            <input
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="판매 가격을 입력해주세요"
              className="form-input"
              min="0"
              disabled={loading}
              required
            />
          </div>
        </div>

        {/* 태그 */}
        <div className="form-group">
          <label htmlFor="tags" className="form-label">
            태그
          </label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleTagKeyDown}
            placeholder="태그를 입력해주세요"
            className="form-input"
          />

          {/* 태그 미리보기 */}
          {formData.tags.length > 0 && (
            <div className="tags-preview">
              {formData.tags.map((tag, index) => (
                <div key={index} className="tag-chip">
                  <span className="tag-chip-text">#{tag}</span>
                  <button
                    type="button"
                    className="x-btn"
                    onClick={() => handleDeleteTag(tag)}
                  >
                    <img src={x} alt="삭제" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
