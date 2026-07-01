"use client";

import { createContext, useContext, useState } from "react";
import Modal from "../components/ui/Modal";

const ModalContext = createContext(null);

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};

export default function ModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  const openModal = (msg) => {
    setMessage(msg);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setMessage("");
  };

  return (
    <ModalContext.Provider value={{ isOpen, message, openModal, closeModal }}>
      {children}
      <Modal />
    </ModalContext.Provider>
  );
}
