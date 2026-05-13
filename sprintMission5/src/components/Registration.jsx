import { useState } from "react";
import "/src/css/registration.css";
import { productAPI } from "../js/productAPI";

export default function Registration() {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState();
  const [tags, setTags] = useState([]);

  async function Registr() {
    const data = { name: name, description: desc, price: Number(price) };
    await productAPI.POST(data);
    setName("");
    setDesc("");
    setPrice("");
    setTags([]);
  }

  return (
    <div className="registr">
      <div className="registr-top">
        <h1>상품등록하기</h1>
        <button className="registr-btn" onClick={Registr}>
          등록
        </button>
      </div>
      <div className="registr-name">
        <span>상품명</span>
        <input
          type="text"
          placeholder="상품명을 입력 해주세요."
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </div>
      <div className="registr-name">
        <span>상품소개</span>
        <textarea
          className="desc"
          type="text"
          placeholder="상품소개를 입력 해주세요."
          value={desc}
          onChange={(e) => {
            setDesc(e.target.value);
          }}
        />
      </div>
      <div className="registr-name">
        <span>판매가격</span>
        <input
          type="text"
          placeholder="판매가격을 입력 해주세요."
          value={price}
          onChange={(e) => {
            setPrice(e.target.value);
          }}
        />
      </div>
      <div className="registr-name">
        <span>태그</span>
        <input
          type="text"
          placeholder="태그를 입력 해주세요."
          value={tags}
          onChange={(e) => {
            setTags(e.target.value);
          }}
        />
      </div>
    </div>
  );
}
