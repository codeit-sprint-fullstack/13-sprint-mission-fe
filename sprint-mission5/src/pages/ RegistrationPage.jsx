import styles from "./ RegistrationPage.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function RegistrationPage() {
  
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState([]);

  const [isSaved, setIsSaved] = useState(false);

  const isFormValid = 
  name.trim() !== "" &&
  description.trim() !== "" &&
  price.trim() !== "" &&
  tags.length > 0;

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!isFormValid) return;

    console.log("상품 등록 완료");
    navigate("/items/1")
  };

  const handleTagKeyDown = (event) => {
    if (event.key !== "Enter") return;

    event.preventDefault();

    if (tagInput.trim() === "") return;

    setTags([...tags, tagInput.trim()]);
    setTagInput("");
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <section className={styles.page}>
      <div className={styles.container}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formHeader}>
            <h1 className={styles.title}>상품 등록하기</h1>
            <button
             disabled={!isFormValid} 
             type="submit" 
             className={styles.submitButton}
             >
              등록
              </button>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>상품명</label>
            <input
              className={styles.input}
              type="text"
              placeholder="상품명을 입력해주세요"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>상품 소개</label>
            <textarea className={styles.textarea}
            placeholder="상품 소개를 입력해주세요" 
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>판매가격</label>
            <input
              className={styles.input}
              type="number"
              placeholder="판매 가격을 입력해주세요"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>태그</label>
            <div className={styles.tagInputWrapper}>
              <input
                className={styles.input}
                type="text"
                placeholder="태그를 입력해주세요"
                value={tagInput}
                onChange={(event) => setTagInput(event.target.value)}
                onKeyDown={handleTagKeyDown}
              />
            </div>

            <div className={styles.tagList}>
              {tags.map((tag) => (
                <span key={tag} className={styles.tagChip}>#{tag}
                
                <button
                type="button"
                className={styles.tagRemoveButton}
                onClick={() => handleRemoveTag(tag)}
                >
                <img src="/img/main/ic_X.svg" alt="태그 삭제" className={styles.imgX}/>
                </button> 
                </span>
              ))}
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

export default RegistrationPage;
