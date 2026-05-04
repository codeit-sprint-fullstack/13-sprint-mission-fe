function SearchInput({ keyword, setKeyword }) {
  return (
    <input
      value={keyword}
      onChange={(e) => setKeyword(e.target.value)}
      placeholder="검색"
    />
  );
}

export default SearchInput;
