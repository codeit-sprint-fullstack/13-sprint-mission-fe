"use client";
import { useAuth } from "@/providers/AuthProvider";

export default function MarketPage() {
  const { user } = useAuth();
  return (
    <div
      onClick={() => {
        console.log(user);
      }}
      className="flex-1"
    >
      MarketPage
    </div>
  );
}
