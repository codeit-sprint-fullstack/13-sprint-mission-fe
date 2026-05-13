import { useState } from "react";
import { useNavigate } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

function RegistrationPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const navigate = useNavigate();

  function handleTagAdd(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      if (!tagInput.trim()) return;
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  }

  function handleTagRemove(index) {
    setTags(tags.filter((tag, i) => i !== index));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await fetch(`${BASE_URL}/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          description,
          price: Number(price),
          tags,
        }),
      });
      if (!res.ok) throw new Error("등록 실패");
      const data = await res.json();
      navigate(`/items/${data._id}`);
    } catch (err) {
      alert(err?.message ?? "알 수 없는 오류");
    }
  }

  const isValid = name && description && price;

  return (
    <main>
      <div>
        <h1>상품 등록하기</h1>
        <button type="submit" form="registration-form" disabled={!isValid}>
          등록
        </button>
      </div>

      <form id="registration-form" onSubmit={handleSubmit}>
        <div>
          <label>상품명</label>
          <input
            type="text"
            placeholder="상품명을 입력해주세요"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label>상품 소개</label>
          <textarea
            placeholder="상품 소개를 입력해주세요"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div>
          <label>판매 가격</label>
          <input
            type="text"
            placeholder="판매 가격을 입력해주세요"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div>
          <label>태그</label>
          <input
            type="text"
            placeholder="태그를 입력 후 엔터를 눌러주세요"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleTagAdd}
          />
          <div>
            {tags.map((tag, index) => (
              <span key={index}>
                #{tag}
                <button type="button" onClick={() => handleTagRemove(index)}>
                  x
                </button>
              </span>
            ))}
          </div>
        </div>
      </form>
    </main>
  );
}

export default RegistrationPage;
