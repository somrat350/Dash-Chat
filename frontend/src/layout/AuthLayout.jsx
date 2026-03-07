import { Toaster } from "react-hot-toast";
import { Navigate, Outlet } from "react-router";
import { useAuthStore } from "../store/useAuthStore";
import { useEffect } from "react";
import PageLoader from "../components/PageLoader";
import PageTitleManager from "../components/PageTitleManager";

const AuthLayout = () => {
  const { checkAuth, userLoading, authUser } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (userLoading) return <PageLoader />;
  if (authUser) {
    return <Navigate to="/conversation/chat" replace />;
  }
  return (
    <>
      <PageTitleManager />
      <Toaster />
      <Outlet />
    </>
  );
};

export default AuthLayout;
