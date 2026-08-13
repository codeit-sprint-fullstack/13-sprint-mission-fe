import styled, { css } from "styled-components";
import { ReactComponent as HeartIcon } from "../../../assets/images/icons/ic_heart.svg";

const PillButton = styled.button`
  display: flex;
  gap: 4px;
  align-items: center;
  color: var(--gray-500);
  font-size: 16px;
  padding: 4px 12px;
  border-radius: 999px;
  border: 1px solid var(--gray-200);

  ${({ theme }) => css`
    &:hover svg {
      color: ${theme.colors.red};
    }
  `}
`;

const StyledHeartIcon = styled(HeartIcon)`
  width: 24px;
  height: 24px;

  ${({ $active, theme }) =>
    $active &&
    css`
      color: ${theme.colors.red};
    `}
`;

function LikeButton({ isFavorite, favoriteCount, onClick }) {
  return (
    <PillButton onClick={onClick}>
      <StyledHeartIcon $active={isFavorite} />
      {favoriteCount.toLocaleString()}
    </PillButton>
  );
}

export default LikeButton;
