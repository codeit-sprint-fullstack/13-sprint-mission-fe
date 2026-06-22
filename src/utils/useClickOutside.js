import { useEffect, useRef } from "react";

export default function useClickOutside(onClickOutside, { isActive = true }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!isActive) return;

    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        onClickOutside();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isActive, onClickOutside]);

  return ref;
}
