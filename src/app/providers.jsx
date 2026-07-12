"use client";

import AuthProvider from "@/providers/AuthProvider";
import QueryProvider from "@/providers/QueryProvider";

export default function Providers({ children, initialUser }) {
  return (
    <QueryProvider>
      <AuthProvider initialUser={initialUser}>{children}</AuthProvider>
    </QueryProvider>
  );
}
