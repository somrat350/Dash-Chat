import { Navigate } from "react-router";
import PageLoader from "../components/PageLoader";
import { useAuthStore } from "../store/useAuthStore";
import { useEffect } from "react";

const ProtectedRoute = ({ children }) => {
  const { authUser, userLoading, checkAuth, logoutUser } = useAuthStore();
  logoutUser()
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  if (userLoading) return <PageLoader />;
  if (!authUser) return <Navigate to="/auth/login" replace />;
  return children;
};

export default ProtectedRoute;
