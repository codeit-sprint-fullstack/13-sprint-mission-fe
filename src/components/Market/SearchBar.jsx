import { useNavigate } from "react-router";

function SearchBar({ keyword, onKeywordChange, orderBy, onOrderChange }) {
  const navigate = useNavigate();

  return (
    <div className="list-controls">
      <div className="search-bar">
        <input 
          type="text" 
          placeholder="상품을 검색해보세요"
          value={keyword}
          onChange={(e) => onKeywordChange(e.target.value)}
        />
      </div>

      <button className="upload-btn"
      onClick={() => navigate('/registration')}>상품 등록하기</button>

      <select
        className="order-select"
        value={orderBy}
        onChange={(e) => onOrderChange(e.target.value)}
      >
        <option value="recent">최신순</option>
      </select>
    </div>
  );
}

export default SearchBar;