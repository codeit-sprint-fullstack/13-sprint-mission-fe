import { useState } from "react";
import { useNavigate } from "react-router";
import useProductForm from "../hooks/useProductForm";
import "../css/ProductCreatePage.css";


const ProductCreate = () => {
  const { values, errors, tags, setTags, handleChange, isFormValid } = useProductForm();
  const [tagInput, setTagInput] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    fetch("https://one3-sprint-mission-be-9guw.onrender.com/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: values.name,
        description: values.desc,
        price: Number(values.price),
        tags: tags,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        navigate(`/items/${data._id}`);
      })
      .catch((err) => console.error("상품 등록 실패:", err));
  };

  const handleTagKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const val = tagInput.trim();
      if (val.length > 0 && val.length <= 5 && !tags.includes(val)) {
        setTags([...tags, val]);
        setTagInput("");
      }
    }
  };


  return (
    <div className="product-container">
      <div className="product-header">
        <h1>상품 등록하기</h1>
        <button className="submit-btn" disabled={!isFormValid} onClick={handleSubmit}>
          등록
        </button>
      </div>

      {/* 상품명 섹션 */}
      <div className="form-group">
        <label className="form-label">상품명</label>
        <input
          type="text"
          className={`form-input ${errors.name ? "error-border" : ""}`}
          placeholder="상품명을 입력해주세요"
          name="name"
          value={values.name}
          onChange={handleChange}
        />
        {errors.name && <span className="error-msg">{errors.name}</span>}
      </div>

      {/* 상품 소개 섹션 */}
      <div className="form-group">
        <label className="form-label">상품 소개</label>
        <textarea
          className={`form-input text-area ${errors.desc ? "error-border" : ""}`}
          placeholder="상품 소개를 입력해주세요"
          name="desc"
          value={values.desc}
          onChange={handleChange}
        />
        {errors.desc && <span className="error-msg">{errors.desc}</span>}
      </div>

      {/* 판매가격 섹션 */}
      <div className="form-group">
        <label className="form-label">판매가격</label>
        <input
          className={`form-input ${errors.price ? "error-border" : ""}`}  
          placeholder="판매 가격을 입력해주세요"
          name="price"
          value={values.price}
          onChange={handleChange}
        />
        {errors.price && <span className="error-msg">{errors.price}</span>}
      </div>

      {/* 태그 섹션 */}
      <div className="form-group">
        <label className="form-label">태그</label>
        <input
          type="text"
          className="form-input"
          placeholder="태그를 입력하고 엔터를 누르세요"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={handleTagKeyDown}
        />
        <div className="tag-container">
          {tags.map((tag, index) => (
            <span key={index} className="tag">
              #{tag}{" "}
              <button className="tag-del" onClick={() => setTags(tags.filter((_, i) => i !== index))}>
                ×
              </button>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCreate;
