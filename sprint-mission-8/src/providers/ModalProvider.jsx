"use client";
import Modal from "@/components/ui/modal/Modal";
import React, { createContext, useContext, useState } from "react";

const ModalContext = createContext(null);
export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within an modalProvider");
  }
  return context;
};

export default function ModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState(null);
  const [type, setType] = useState("alert");
  const open = (content, type) => {
    setContent(content);
    setType(type);
    setIsOpen(true);
  };
  const close = () => {
    setIsOpen(false);
    setContent(null);
  };

  return (
    <ModalContext.Provider value={{ open, close, isOpen, content, type }}>
      {children}
      {isOpen ? (
        <Modal close={close} isOpen={isOpen} content={content} type={type} />
      ) : (
        <></>
      )}
    </ModalContext.Provider>
  );
}
