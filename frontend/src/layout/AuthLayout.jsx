import { Toaster } from "react-hot-toast";
import { Navigate, Outlet } from "react-router";
import { useAuthStore } from "../store/useAuthStore";
import { useEffect } from "react";
import PageLoader from "../components/PageLoader";

const AuthLayout = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) return <PageLoader />;
  if (authUser) return <Navigate to="/chat" replace />;
  return (
    <>
      <Toaster />
      <Outlet />
    </>
  );
};

export default AuthLayout;
