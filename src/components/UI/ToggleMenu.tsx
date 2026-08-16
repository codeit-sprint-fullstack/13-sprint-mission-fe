import { useEffect, useRef, useState, type ReactNode } from "react";
import styled, { css } from "styled-components";

const Wrapper = styled.div`
  position: relative;
  z-index: 2;
`;

export interface MenuOption<T extends string = string> {
  value: T;
  label: string;
}

interface ToggleMenuProps<T extends string> {
  className?: string;
  children: ReactNode;
  options: MenuOption<T>[];
  onSelect: (option: MenuOption<T>) => void;
  label?: string;
}

const Menu = styled.ul<{ $isOpen: boolean }>`
  ${({ $isOpen }) => !$isOpen && css`display: none;`}
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  z-index: 20;
  width: 130px;
  overflow: hidden;
  border: 1px solid var(--gray-200);
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 4px 12px rgba(17, 24, 39, 0.08);
  list-style: none;
`;

const ToggleButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background: transparent;
`;

const MenuItem = styled.button`
  display: flex;
  width: 100%;
  min-height: 48px;
  align-items: center;
  justify-content: center;
  padding: 12px 16px;
  border-bottom: 1px solid var(--gray-200);
  color: var(--gray-800);
  font-size: 14px;
  font-weight: 500;
  line-height: 24px;
  white-space: nowrap;

  &:hover,
  &:focus-visible {
    background-color: var(--gray-100);
  }

  li:last-child & {
    border-bottom: 0;
  }
`;

function ToggleMenu<T extends string>({
  className,
  children,
  options,
  onSelect,
  label = "더보기",
}: ToggleMenuProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return undefined;

    const handlePointerDown = (event: PointerEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) setIsOpen(false);
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleSelectOption = (option: MenuOption<T>) => {
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <Wrapper className={className} ref={wrapperRef}>
      <ToggleButton
        type="button"
        aria-label={label}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((value) => !value)}
      >
        {children}
      </ToggleButton>
      <Menu $isOpen={isOpen} role="menu">
        {options.map((option) => (
          <li key={option.value}>
            <MenuItem
              type="button"
              role="menuitem"
              onClick={() => handleSelectOption(option)}
            >
              {option.label}
            </MenuItem>
          </li>
        ))}
      </Menu>
    </Wrapper>
  );
}

export default ToggleMenu;
