import React from "react";
import AuthProvider from "./AuthProvider";
import ModalProvider from "./ModalProvider";

export default function Providers({ children }) {
  return (
    <AuthProvider>
      {/* <ModalProvider>{children}</ModalProvider> */}
      {children}
    </AuthProvider>
  );
}
