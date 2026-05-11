import { useState } from "react";
import { useNavigate } from "react-router-dom";

/*import TagChip from "../components/TagChip";*/

import useValidation from "../hooks/useValidation";

import { createProduct } from "../services/productService";

import "../styles/registration.css";

function RegistrationPage() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState([]);

  const nameValidation = useValidation(name, "name");

  const descriptionValidation = useValidation(description, "description");

  const priceValidation = useValidation(price, "price");

  const tagValidation = useValidation(tagInput, "tag");

  const isDisabled =
    !name.trim() || !description.trim() || !price.trim() || tags.length === 0;

  const handleTagKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      if (!tagInput.trim()) return;
      if (tags.includes(tagInput.trim())) return;

      setTags((prev) => [...prev, tagInput.trim()]);
      setTagInput("");
    }
  };

  /*const removeTag = (tag) => {
    setTags(tags.filter((item) => item !== tag));
  };*/

  const handleSubmit = async () => {
    try {
      const product = await createProduct({
        name,
        description,
        price,
        tags,
      });

      navigate(`/items/${product._id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="registration-page">
      <div className="registration-top">
        <h1>상품 등록하기</h1>

        <button
          className="submit-btn"
          disabled={isDisabled}
          onClick={handleSubmit}
        >
          등록
        </button>
      </div>

      <div className="form-group">
        <label>상품명</label>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={!nameValidation.isValid ? "error-input" : ""}
          placeholder="상품명을 입력해주세요"
        />

        <p className="error-text">{nameValidation.error}</p>
      </div>

      <div className="form-group">
        <label>상품 소개</label>

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={!descriptionValidation.isValid ? "error-input" : ""}
          placeholder="상품 소개를 입력해주세요"
        />

        <p className="error-text">{descriptionValidation.error}</p>
      </div>

      <div className="form-group">
        <label>판매가격</label>

        <input
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className={!priceValidation.isValid ? "error-input" : ""}
          placeholder="판매 가격을 입력해주세요"
        />

        <p className="error-text">{priceValidation.error}</p>
      </div>

      <div className="form-group">
        <label>태그</label>

        <input
          type="text"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={handleTagKeyDown}
          placeholder="태그를 입력해주세요"
        />

        <p className="error-text">{tagValidation.error}</p>

        <div className="tag-list">
          {tags.map((tag, index) => (
            <span key={index}>#{tag}</span>
          ))}
        </div>
      </div>
    </main>
  );
}

export default RegistrationPage;
