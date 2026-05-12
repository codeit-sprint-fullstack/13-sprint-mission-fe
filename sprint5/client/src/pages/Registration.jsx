/**
 * [상품 등록 페이지]

 */
import React, { useState } from "react";
import useFormValidation from "../hooks/useFormValidation";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import "./Registration.css";

const Registration = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
  });
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState([]);

  const nameError = useFormValidation(formData.name, "name");
  const descError = useFormValidation(formData.description, "description");
  const priceError = useFormValidation(formData.price, "price");
  const tagError = useFormValidation(tagInput, "tag");

  const isFormValid =
    formData.name &&
    formData.description &&
    formData.price &&
    !nameError &&
    !descError &&
    !priceError &&
    tags.length > 0;

  const handleTagKeyDown = (e) => {
    if (e.key === "Enter" && tagInput.trim() && !tagError) {
      e.preventDefault();
      if (!tags.includes(tagInput)) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput("");
    }
  };

  const removeTag = (indexToRemove) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  // [서버로 데이터 전송]
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/api/items", { ...formData, tags });
      alert("상품 등록 성공!");
      navigate(`/items`);
    } catch (err) {
      alert("등록 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="registration-container">
      <header className="reg-header">
        <h2>상품 등록하기</h2>
        <button
          className={`submit-btn ${isFormValid ? "active" : ""}`}
          disabled={!isFormValid}
          onClick={handleSubmit}
        >
          등록
        </button>
      </header>

      <div className="input-group">
        <label>상품명</label>
        <input
          className={nameError ? "error-border" : ""}
          placeholder="티셔츠"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        {nameError && <p className="error-text">{nameError}</p>}
      </div>

      <div className="input-group">
        <label>상품 소개</label>
        <textarea
          className={descError ? "error-border" : ""}
          placeholder="상품 소개를 입력해주세요"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />
        {descError && <p className="error-text">{descError}</p>}
      </div>

      <div className="input-group">
        <label>판매가격</label>
        <input
          className={priceError ? "error-border" : ""}
          placeholder="숫자로 입력해주세요"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
        />
        {priceError && <p className="error-text">{priceError}</p>}
      </div>

      <div className="input-group">
        <label>태그</label>
        <input
          className={tagError ? "error-border" : ""}
          placeholder="정말 멋있는 티셔츠"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={handleTagKeyDown}
        />
        {tagError && <p className="error-text">{tagError}</p>}

        <div className="tag-chips">
          {tags.map((tag, index) => (
            <div key={index} className="chip">
              #{tag}
              <span className="remove-icon" onClick={() => removeTag(index)}>
                ✕
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Registration;
