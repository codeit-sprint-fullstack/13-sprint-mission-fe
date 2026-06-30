import AuthProvider from "@/providers/AuthProvider";
import QueryProvider from "@/providers/QueryProvider";

export default function Providers({ children }) {
  return (
    <AuthProvider>
      <QueryProvider>{children}</QueryProvider>
    </AuthProvider>
  );
}
