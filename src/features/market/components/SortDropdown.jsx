import { useState } from "react";

function SortDropdown({ onSortChange }) {
  const [value, setValue] = useState("recent");

  const handleChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
    onSortChange(newValue);
  };

  return (
    <select value={value} onChange={handleChange}>
      <option value="recent">최신 순</option>
      <option value="favorite">좋아요 순</option>
    </select>
  );
}

export default SortDropdown;
