import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <>
      <Toaster />
      <Outlet />
    </>
  );
};

export default AuthLayout;
