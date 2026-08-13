import styled from "styled-components";
import Modal from "./Modal";
import Button from "./Button";

const ModalContent = styled.div`
  padding: 47px;
`;

const ModalFooter = styled.div`
  display: flex;

  ${Button} {
    margin-left: auto;
  }
`;

function SimpleModal({ isOpen, text = "", onClose }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>{text}</ModalContent>
      <ModalFooter>
        <Button onClick={onClose}>확인</Button>
      </ModalFooter>
    </Modal>
  );
}

export default SimpleModal;
