import React from "react";
import AuthProvider from "./AuthProvider";
import ModalProvider from "./ModalProvider";
import RouteGuard from "./RouteGaurd";
import QueryProvider from "./QueryProvider";

export default function Providers({ children }) {
  return (
    <AuthProvider>
      <QueryProvider>
        <RouteGuard>
          <ModalProvider>{children}</ModalProvider>
        </RouteGuard>
      </QueryProvider>
    </AuthProvider>
  );
}
