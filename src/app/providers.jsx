"use client";

import ThemeProvider from "@/providers/ThemeProvider";

export default function Providers({ children }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
