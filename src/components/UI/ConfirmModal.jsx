import styled, { css } from "styled-components";
import Modal from "./Modal";
import Button from "./Button";
import CheckIcon from "../../assets/images/icons/ic_check.svg?react";

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledCheckIcon = styled(CheckIcon)`
  width: 24px;
  height: 24px;

  ${({ $destructive }) => $destructive && css`
    circle {
      fill: var(--red);
    }
  `}
`;

const Content = styled.p`
  margin: 24px 0 32px;
  color: var(--gray-800);
  font-size: 14px;
  font-weight: 500;
  line-height: 24px;
  text-align: center;
`;

const StyledButton = styled(Button)`
  width: 88px;

  ${({ $destructive, $appearance }) => $destructive && css`
    && {
      border-color: var(--red);
      background: ${$appearance === "secondary" ? "#fff" : "var(--red)"};
      color: ${$appearance === "secondary" ? "var(--red)" : "#fff"};
    }

    &&:hover,
    &&:focus {
      border-color: #d93434;
      background: ${$appearance === "secondary" ? "#fff5f5" : "#d93434"};
      color: ${$appearance === "secondary" ? "#d93434" : "#fff"};
    }
  `}
`;

const Footer = styled.div`
  display: flex;
  flex-direction: row-reverse;
  gap: 8px;
`;

function ConfirmModal({
  content,
  isOpen,
  onClose,
  onConfirm = () => {},
  onReject = () => {},
  tone = "destructive",
  confirmLabel = "네",
  rejectLabel,
}) {
  const destructive = tone === "destructive";

  const handleClickConfirm = () => {
    onConfirm();
    onClose();
  };

  const handleClickReject = () => {
    onReject();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="small">
      <Container>
        <StyledCheckIcon $destructive={destructive} />
        <Content>{content}</Content>
        <Footer>
          <StyledButton $destructive={destructive} onClick={handleClickConfirm}>
            {confirmLabel}
          </StyledButton>
          <StyledButton
            $destructive={destructive}
            $appearance="secondary"
            onClick={handleClickReject}
          >
            {rejectLabel ?? (destructive ? "취소" : "아니오")}
          </StyledButton>
        </Footer>
      </Container>
    </Modal>
  );
}

export default ConfirmModal;
