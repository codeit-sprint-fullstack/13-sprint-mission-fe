import { useState } from "react";
import styled, { css } from "styled-components";

const Wrapper = styled.div`
  position: relative;
  z-index: 0;
`;

const Menu = styled.ul`
  ${({ $isOpen }) =>
    !$isOpen &&
    css`
      display: none;
    `}
  position: absolute;
  top: 110%;
  right: 0;
  z-index: 1;
  background: #fff;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  list-style: none;
`;

const ToggleButton = styled.button`
  background-color: none;
  border: none;
  outline: none;
`;

const MenuItem = styled.li`
  font-size: 16px;
  padding: 12px 41px;
  color: #1f2937;
  cursor: pointer;
`;

function ToggleMenu({ className, children, options, onSelect }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelectOption = (option) => {
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <Wrapper className={className}>
      <ToggleButton type="button" onClick={() => setIsOpen((v) => !v)}>
        {children}
      </ToggleButton>
      <Menu $isOpen={isOpen}>
        {options.map((option) => (
          <MenuItem
            key={option.value}
            onClick={() => handleSelectOption(option)}
          >
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </Wrapper>
  );
}

export default ToggleMenu;
