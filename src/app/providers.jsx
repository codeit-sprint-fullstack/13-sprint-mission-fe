import AuthProvider from "@/providers/AuthProvider";
import RouteGuard from "@/providers/RouteGuard";
import ModalProvider from "../providers/ModalProvider";

export default function Providers({ children }) {
  return (
    <AuthProvider>
      <RouteGuard>
        <ModalProvider>{children}</ModalProvider>
      </RouteGuard>
    </AuthProvider>
  );
}
