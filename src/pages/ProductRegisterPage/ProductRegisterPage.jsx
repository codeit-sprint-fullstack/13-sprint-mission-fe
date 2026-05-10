import { useState } from "react";
import "./ProductRegisterPage.css";
import { useNavigate } from "react-router";
import deleteBtn from "../../assets/icon/ic_X.svg";
export default function ProductRegisterPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState([]);
  const handleSubmit = (e) => {
    e.preventDefault();

    const creatProduct = async () => {
      const res = await fetch(
        "https://one3-sprint-mission-be-62ar.onrender.com/products",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            description,
            price: Number(price),
            tags,
          }),
        },
      );
      const data = await res.json();
      console.log(data);
      navigate(`/items/${data._id}`);
    };
    creatProduct();
  };

  const addTags = (e) => {
    if (e.nativeEvent.isComposing) return;
    if (e.key === "Enter") {
      e.preventDefault();
      setTags([...tags, tag]);
      setTag("");
    }
  };

  return (
    <main className="registerPage">
      <div className="registerPageBox">
        <form onSubmit={handleSubmit} className="inputArea">
          <div className="topArea">
            <p className="topText">상품 등록하기</p>
            <button
              type="submit"
              className="registerBtn"
              onClick={handleSubmit}
            >
              등록
            </button>
          </div>
          <div className="nameInput">
            <p className="nameText">상품명</p>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="상품명을 입력해주세요"
            />
          </div>
          <div className="descriptionInput">
            <p className="descriptionText">상품 소개</p>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              type="text"
              placeholder="상품소개를 입력해주세요"
            />
          </div>
          <div className="priceInput">
            <p className="priceText">판매가격</p>
            <input
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              type="text"
              placeholder="판매 가격을 입력해주세요"
            />
          </div>
          <div className="tagsInput">
            <p className="tagText">태그</p>
            <input
              onKeyDown={addTags}
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              type="text"
              placeholder="태그를 입력해주세요"
            />
            <div className={tags.length > 0 ? "tagList" : ""}>
              {tags.map((tag, index) => {
                return (
                  <div className="chip" key={index}>
                    <span>#{tag}</span>

                    <button
                      type="button"
                      onClick={() => {
                        setTags(tags.filter((_, i) => i !== index));
                      }}
                    >
                      <img src={deleteBtn} alt="삭제버튼" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
