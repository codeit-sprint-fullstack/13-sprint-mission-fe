import React, { useState } from "react";
import "./RegisterForm.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import useValidation from "../../hooks/useValidation";

export default function RegisterForm() {
  // const [formdata, setFormdata] = useState({});
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [tags, setTags] = useState([]);
  const [taginput, setTaginput] = useState("");
  const formdata = { name, description, price, tags };

  const navigate = useNavigate();
  const errors = useValidation(name, description, price, taginput);

  async function postProduct() {
    try {
      const res = await fetch("https://sprint5-api.onrender.com/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formdata }),
      });
      if (!res.ok) throw new Error("생성 실패");
      const data = await res.json();
      navigate(`/products/${data._id}`);
    } catch (error) {
      console.error(error.message);
    }
  }

  const handleCreateProduct = () => {
    postProduct();
  };

  return (
    <div className="register-form">
      <div className="register-title-box">
        <p>상품 등록하기</p>
        <button
          type="button"
          onClick={() => handleCreateProduct()}
          disabled={Object.keys(errors).length > 0}
        >
          등록
        </button>
      </div>
      <div className="product-input-box">
        <div>
          <p>상품명</p>
          <input
            onChange={(e) => setName(e.target.value)}
            placeholder="상품명을 입력해주세요"
            value={name}
            style={errors.name && { border: "solid 2px red" }}
          />
          {errors.name && (
            <p style={{ color: "red", fontSize: 12 }}>{errors.name}</p>
          )}
        </div>
        <div>
          <p>상품 소개</p>
          <textarea
            placeholder="상품 소개를 입력해주세요"
            className="description-textarea"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            style={errors.description && { border: "solid 2px red" }}
          />
          {errors.description && (
            <p style={{ color: "red", fontSize: 12 }}>{errors.description}</p>
          )}
        </div>
        <div>
          <p>판매가격</p>
          <input
            placeholder="판매 가격을 입력해주세요"
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            type="number"
            style={errors.price && { border: "solid 2px red" }}
          />
          {errors.price && (
            <p style={{ color: "red", fontSize: 12 }}>{errors.price}</p>
          )}
        </div>
        <div>
          <p>태그</p>
          <input
            placeholder="태그 입력 후 <Enter>"
            onChange={(e) => setTaginput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key !== "Enter") return;
              if (!taginput.trim() || taginput.length > 5) return;

              setTags((prev) => [...prev, taginput]);
              setTaginput("");
            }}
            value={taginput}
            style={errors.taginput && { border: "solid 2px red" }}
          />
          {errors.taginput && (
            <p style={{ color: "red", fontSize: 12 }}>{errors.taginput}</p>
          )}
        </div>
        <div className="tags-container">
          {tags.map((tag, index) => (
            <div key={index} className="tag-box">
              <p>#{tag}</p>
              <button
                onClick={() => setTags(tags.filter((tag, i) => i !== index))}
              >
                ✖
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
