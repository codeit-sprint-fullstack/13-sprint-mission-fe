import type { MouseEventHandler } from "react";
import styled from "styled-components";
import CloseIcon from "../../assets/images/icons/ic_x.svg?react";

const Button = styled.button`
  flex: 0 0 auto;
  background-color: ${({ theme }) => theme.colors.gray[500]};
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    width: 12px;
    height: 12px;
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray[600]};
  }
`;

interface DeleteButtonProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
  label: string;
}

function DeleteButton({ onClick, label }: DeleteButtonProps) {
  return (
    <Button type="button" aria-label={`${label} 삭제`} onClick={onClick}>
      <CloseIcon />
    </Button>
  );
}

export default DeleteButton;
