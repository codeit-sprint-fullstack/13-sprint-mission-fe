"use client";

import AuthProvider from "@/providers/AuthProvider";
import RouteGuard from "@/providers/RouteGuard";
import QueryProvider from "@/providers/QueryProvider";

export default function Providers({ children }) {
  return (
    <QueryProvider>
      <AuthProvider>
        <RouteGuard>{children}</RouteGuard>
      </AuthProvider>
    </QueryProvider>
  );
}
