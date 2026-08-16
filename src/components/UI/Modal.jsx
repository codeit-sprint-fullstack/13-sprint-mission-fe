import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  padding: 16px;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  width: ${({ $size }) => ($size === "small" ? "355px" : "540px")};
  max-width: 100%;
  min-height: ${({ $size }) => ($size === "small" ? "200px" : "250px")};
  padding: ${({ $size }) => ($size === "small" ? "24px" : "40px")};
  border-radius: 8px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  @media ${({ theme }) => theme.mediaQuery.mobile} {
    width: 327px;
    min-height: ${({ $size }) => ($size === "small" ? "180px" : "220px")};
    padding: 24px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
`;

function useScrollLock(enabled) {
  useEffect(() => {
    if (enabled) {
      document.body.style.overflow = "hidden"; // 스크롤 고정
      return () => {
        document.body.style.overflow = ""; // 스크롤 고정 해제
      };
    }
  }, [enabled]);
}

function Modal({ isOpen, closeButton = false, onClose, children, size = "large" }) {
  useScrollLock(isOpen);

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const preventOverlayClick = (e) => e.stopPropagation();

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <Overlay onClick={onClose}>
      <ModalWrapper
        $size={size}
        role="dialog"
        aria-modal="true"
        onClick={preventOverlayClick}
      >
        {closeButton && (
          <CloseButton type="button" aria-label="모달 닫기" onClick={onClose}>
            ×
          </CloseButton>
        )}
        {children}
      </ModalWrapper>
    </Overlay>,
    document.getElementById("modal-root")
  );
}

export default Modal;
