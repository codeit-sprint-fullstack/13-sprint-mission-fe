import { useState, useEffect, useRef } from "react";

export function useDropdown(list) {
  const selectRef = useRef(null);
  const [currentValue, setCurrentValue] = useState(list[0]);
  const [showOptions, setShowOptions] = useState(false);

  const handleSelect = (value) => {
    setCurrentValue(value);
  };

  const toggleOptions = () => {
    setShowOptions((prev) => !prev);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setShowOptions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return { selectRef, currentValue, showOptions, toggleOptions, handleSelect };
}
