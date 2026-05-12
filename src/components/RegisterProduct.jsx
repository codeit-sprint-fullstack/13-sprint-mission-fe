import useRegisterForm from "../hooks/useRegisterForm";
import "../styles/RegisterProduct.css";
import XIcon from "../assets/icons/ic_X.svg";
import { productApi } from "../api/productApi";
import { useNavigate } from "react-router";

function RegisterProduct() {
  const {
    values,
    errors,
    tags,
    handleChange,
    handleKeyDown,
    handleRemoveTag,
    handleValidate,
    isDisabled,
  } = useRegisterForm({
    name: "",
    intro: "",
    price: "",
    tag: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!handleValidate()) return;
      const processData = {
        name: values.name,
        description: values.intro,
        price: Number(values.price),
        tags: tags,
      };
      const newProduct = await productApi.createProduct(processData);
      alert("상품 등록을 성공했어요!");

      if (newProduct && newProduct._id) {
        navigate(`/items/${newProduct._id}`);
      } else {
        navigate("/registeration");
      }
    } catch (error) {
      console.error(`상품 등록에 실패했어요 ${error.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="register-product-section">
      <div className="register-section-top">
        <h2 className="register-page-title">상품 등록하기</h2>
        <button
          className={`register-submit-button ${!isDisabled ? "abled" : ""}`}
          type="submit"
          disabled={isDisabled}
        >
          등록
        </button>
      </div>
      <section className="register-input-section">
        <label className="register-product-title">
          <div className="register-input-title">상품명</div>
          <input
            name="name"
            type="text"
            value={values.name}
            onChange={handleChange}
            className={`register-input-box ${errors.name ? "input-error" : ""}`}
            placeholder="상품명을 입력해주세요"
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </label>
        <label className="register-product-intro">
          <div className="register-input-title">상품 소개</div>
          <textarea
            name="intro"
            value={values.intro}
            onChange={handleChange}
            className={`register-input-box register-input-box--intro ${errors.intro ? "input-error" : ""}`}
            placeholder="상품 소개를 입력해주세요"
          />
          {errors.intro && (
            <span className="error-message">{errors.intro}</span>
          )}
        </label>
        <label className="register-product-price">
          <div className="register-input-title">판매가격</div>
          <input
            name="price"
            type="text"
            value={values.price}
            onChange={handleChange}
            className={`register-input-box ${errors.price ? "input-error" : ""}`}
            placeholder="판매 가격을 입력해주세요"
          />
          {errors.price && (
            <span className="error-message">{errors.price}</span>
          )}
        </label>
        <label className="register-product-tag">
          <div className="register-input-title">태그</div>
          <input
            name="tag"
            type="text"
            value={values.tag}
            className={`register-input-box ${errors.tag ? "input-error" : ""}`}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="태그를 입력해주세요"
          />
          {errors.tag && <span className="error-message">{errors.tag}</span>}
          <div className="register-tag-container">
            {tags.map((tag, idx) => (
              <span key={idx} className="tag-item">
                <span className="tag-text">#{tag}</span>
                <img
                  src={XIcon}
                  className="tag-delete-button"
                  onClick={() => handleRemoveTag(idx)}
                />
              </span>
            ))}
          </div>
        </label>
      </section>
    </form>
  );
}

export default RegisterProduct;
