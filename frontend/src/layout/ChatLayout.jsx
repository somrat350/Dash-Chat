import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import PageLoader from "../components/PageLoader";
import { Navigate } from "react-router";

const ChatLayout = () => {
  const { isCheckingAuth, checkAuth, authUser } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  if (isCheckingAuth) return <PageLoader />;
  if (!authUser) {
    return <Navigate to="/login" replace />;
  }
  return <div></div>;
};

export default ChatLayout;
