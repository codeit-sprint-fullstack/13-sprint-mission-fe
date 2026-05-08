import React from "react";
import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import "./Registration.css";
import postProduct from "../hooks/postProduct";

import x from "../assets/icons/ic_X.svg";

export default function Registration() {
  // const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    tags: "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // 폼 제출
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 태그 처리
      const handleDelete = (targetIndex) => {
        const currentTags = formData.tags.split(",").map((tag) => tag.trim());
        const updatedTagsArray = currentTags.filter(
          (_, index) => index !== targetIndex,
        );
        const updatedTagsString = updatedTagsArray.join(", ");
        tags({
          ...formData,
          tags: updatedTagsString,
        });
      };
      const tags = formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0);
      const productData = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        price: parseInt(formData.price),
        tags: tags,
      };

      // API 호출
      // const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
      // const response = await fetch(`${API_URL}/product`, {
      const response = await fetch(`http://localhost:3000/product`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "상품 등록에 실패했습니다.");
      }

      // const result = await response.json();
      const result = response.json();
      return result;
      // setSuccess(true);

      // setTimeout(() => {
      //   navigate(`/product/${result._id}`);
      // }, 1500);
    } catch (err) {
      console.error("에러:", err);
    } finally {
      setLoading(false);
      fetch(`http://localhost:3000/product`);
    }
  };

  return (
    <div className="registration-container">
      <div className="registration-wrapper">
        <h2>상품 등록하기</h2>
        <button className="regist-btn" type="submit">
          등록
        </button>
      </div>

      <form onSubmit={handleSubmit} className="registration-form">
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
          />
        </div>
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
          />
        </div>

        <div className="form-group">
          <label htmlFor="price" className="form-label">
            판매 가격
          </label>
          <div className="price-input-wrapper">
            <input
              // type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="판매 가격을 입력해주세요"
              className="form-input"
              min="0"
              disabled={loading}
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="tags" className="form-label">
            태그
          </label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            placeholder="태그를 입력해주세요"
            className="form-input"
            disabled={loading}
          />
          {formData.tags && (
            <div className="tags-preview">
              {formData.tags
                .split(",")
                .map((tag) => tag.trim())
                .filter((tag) => tag.length > 0)
                .map((tag, index) => (
                  <span key={index} className="tag-chip">
                    #{tag}
                    <button
                      type="button"
                      className="x-btn"
                      onClick={() => handleDelete(index)}
                    >
                      <img src={x} alt="삭제" />
                    </button>
                  </span>
                ))}
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
