import styled, { css } from "styled-components";
import HeartIcon from "../../../assets/images/icons/ic_heart.svg?react";

const PillButton = styled.button`
  display: flex;
  gap: 4px;
  align-items: center;
  color: var(--gray-500);
  font-size: 16px;
  min-height: 40px;
  padding: 7px 12px;
  border-radius: 999px;
  border: 1px solid var(--gray-200);
  background: #fff;
  line-height: 24px;

  ${({ theme }) => css`
    &:hover svg {
      color: ${theme.colors.red[0]};
    }
  `}
`;

const StyledHeartIcon = styled(HeartIcon)`
  width: 24px;
  height: 24px;

  ${({ $active, theme }) =>
    $active &&
    css`
      color: ${theme.colors.red[0]};
    `}
`;

function LikeButton({ isFavorite, favoriteCount, onClick }) {
  return (
    <PillButton type="button" onClick={onClick} aria-pressed={isFavorite}>
      <StyledHeartIcon $active={isFavorite} />
      {favoriteCount.toLocaleString()}
    </PillButton>
  );
}

export default LikeButton;
