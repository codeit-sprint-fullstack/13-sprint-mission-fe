import React, { useState } from "react";

const ListSearch = ({ onSearch }) => {
  const [text, setText] = useState();
  // 누르면 검색을 진행할 함수
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(text);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="search"
        placeholder="검색할 상품을 입력해주세요"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </form>
  );
};

export default ListSearch;
