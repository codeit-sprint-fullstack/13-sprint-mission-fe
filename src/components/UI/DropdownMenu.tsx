import { useEffect, useRef, useState } from "react";
import "./DropdownMenu.css";
import SortIcon from "../../assets/images/icons/ic_sort.svg?react";
import ArrowDownIcon from "../../assets/images/icons/ic_arrow_down.svg?react";
import type { SortOrder } from "../../types/models";

interface SortOption {
  value: SortOrder;
  label: string;
}

interface DropdownMenuProps {
  value?: SortOrder;
  onSortSelection: (value: SortOrder) => void;
}

const SORT_OPTIONS: SortOption[] = [
  { value: "recent", label: "최신순" },
  { value: "favorite", label: "좋아요순" },
];

function DropdownMenu({ value = "recent", onSortSelection }: DropdownMenuProps) {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const selectedLabel = SORT_OPTIONS.find((option) => option.value === value)?.label ?? "최신순";

  useEffect(() => {
    if (!isDropdownVisible) return undefined;

    const handlePointerDown = (event: PointerEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) setIsDropdownVisible(false);
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsDropdownVisible(false);
    };

    document.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isDropdownVisible]);

  const handleSelect = (option: SortOption) => {
    onSortSelection(option.value);
    setIsDropdownVisible(false);
  };

  return (
    <div className="sortButtonWrapper" ref={wrapperRef}>
      <button
        type="button"
        className="sortDropdownTriggerButton"
        aria-label={`정렬 기준: ${selectedLabel}`}
        aria-haspopup="menu"
        aria-expanded={isDropdownVisible}
        onClick={() => setIsDropdownVisible((visible) => !visible)}
      >
        <span className="sortDropdownLabel">{selectedLabel}</span>
        <ArrowDownIcon className="sortDropdownArrow" aria-hidden="true" />
        <SortIcon className="sortDropdownMobileIcon" aria-hidden="true" />
      </button>

      {isDropdownVisible && (
        <div className="dropdownMenu" role="menu" aria-label="정렬 기준 선택">
          {SORT_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              className={`dropdownItem${value === option.value ? " selected" : ""}`}
              role="menuitemradio"
              aria-checked={value === option.value}
              onClick={() => handleSelect(option)}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default DropdownMenu;
