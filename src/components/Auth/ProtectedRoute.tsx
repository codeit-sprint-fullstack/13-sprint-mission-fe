import type { PropsWithChildren } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function ProtectedRoute({ children }: PropsWithChildren) {
  const { user, isPending } = useAuth();
  const location = useLocation();

  if (isPending) return null;
  if (!user) {
    return <Navigate to="/signin" replace state={{ from: location.pathname }} />;
  }

  return children;
}
