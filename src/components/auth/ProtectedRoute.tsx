
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedUserTypes?: ('candidate' | 'employer')[];
}

export const ProtectedRoute = ({ 
  children,
  allowedUserTypes
}: ProtectedRouteProps) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  if (allowedUserTypes && user.user_metadata.user_type) {
    if (!allowedUserTypes.includes(user.user_metadata.user_type)) {
      return <Navigate to="/" replace />;
    }
  }

  return <>{children}</>;
};
