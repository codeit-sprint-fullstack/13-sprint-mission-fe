// import SearchInput from "./SearchInput";
import SortDropdown from "./SortDropdown";

function HeaderArea({ keyword, onSearch, onSortChange }) {
  return (
    <div className="header-area">
      <h2>판매 중인 상품</h2>

      <div className="right">
        <input value={keyword} onChange={(e) => onSearch(e.target.value)} />
        <SortDropdown onSortChange={onSortChange} />
      </div>
    </div>
  );
}

export default HeaderArea;
