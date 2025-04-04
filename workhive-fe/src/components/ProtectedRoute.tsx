import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
  userType?: "BUSINESS" | "FREELANCER";
}

export default function ProtectedRoute({
  children,
  userType,
}: ProtectedRouteProps) {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  if (userType && currentUser.role !== userType) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
}
