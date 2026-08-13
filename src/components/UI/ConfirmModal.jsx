import styled from "styled-components";
import Modal from "./Modal";
import Button from "./Button";
import { ReactComponent as CheckIcon } from "../../assets/images/icons/ic_check.svg";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Content = styled.div`
  margin: 24px 0 32px;
`;

const StyledButton = styled(Button)`
  width: 88px;
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
}) {
  const handleClickConfirm = () => {
    onConfirm();
    onClose();
  };

  const handleClickReject = () => {
    onReject();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Container>
        <CheckIcon />
        <Content>{content}</Content>
        <Footer>
          <StyledButton onClick={handleClickConfirm}>네</StyledButton>
          <StyledButton $appearance="secondary" onClick={handleClickReject}>
            아니오
          </StyledButton>
        </Footer>
      </Container>
    </Modal>
  );
}

export default ConfirmModal;
