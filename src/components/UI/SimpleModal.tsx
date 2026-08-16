import styled from "styled-components";
import Modal from "./Modal";
import Button from "./Button";

const Container = styled.div`
  display: flex;
  min-height: 170px;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
`;

const ModalContent = styled.p`
  margin: auto 0;
  color: #1f2937;
  font-size: 16px;
  font-weight: 500;
  text-align: center;
`;

const ConfirmButton = styled(Button)`
  width: 166px;
`;

interface SimpleModalProps {
  isOpen: boolean;
  text?: string;
  onClose: () => void;
}

function SimpleModal({ isOpen, text = "", onClose }: SimpleModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Container>
        <ModalContent>{text}</ModalContent>
        <ConfirmButton type="button" onClick={onClose}>
          확인
        </ConfirmButton>
      </Container>
    </Modal>
  );
}

export default SimpleModal;
