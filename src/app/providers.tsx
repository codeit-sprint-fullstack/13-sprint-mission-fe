"use client";

import AuthProvider from "@/providers/AuthProvider";
import QueryProvider from "@/providers/QueryProvider";
import React from "react";
import type { User } from "@/types/user";

export default function Providers({
  children,
  initialUser,
}: {
  children: React.ReactNode;
  initialUser: User | null;
}) {
  return (
    <QueryProvider>
      <AuthProvider initialUser={initialUser}>{children}</AuthProvider>
    </QueryProvider>
  );
}
