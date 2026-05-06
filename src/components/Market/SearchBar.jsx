
function SearchBar({ keyword, onKeywordChange, orderBy, onOrderChange }) {
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

      <button className="upload-btn">상품 등록하기</button>

      <select 
        className="order-select"
        value={orderBy} 
        onChange={(e) => onOrderChange(e.target.value)}
      >
        <option value="recent">최신순</option>
        <option value="favorite">좋아요순</option>
      </select>
    </div>
  );
}

export default SearchBar;