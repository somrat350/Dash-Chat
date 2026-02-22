import { createBrowserRouter } from "react-router";
import PublicLayout from "../layout/PublicLayout";
import Home from "../pages/public/Home";
import AuthLayout from "../layout/AuthLayout";
import Register from "../pages/auth/Register";
import About from "../pages/public/About";
import Login from "../pages/auth/Login";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ChatLayout from "../layout/ChatLayout";
import ChatHome from "../pages/chat/Home";
import Privacy from "../pages/public/Privacy";

const router = createBrowserRouter([
  {
    path: "/",
    Component: PublicLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/about",
        Component: About,
      },
      {
        path: "/privacy",
        Component: Privacy,
      },
    ],
  },
  {
    path: "/auth",
    Component: AuthLayout,
    children: [
      {
        path: "register",
        Component: Register,
      },
      {
        path: "login",
        Component: Login,
      },
      {
        path: "forgot-password",
        Component: ForgotPassword,
      },
    ],
  },
  {
    path: "/chat",
    Component: ChatLayout,
    children: [
      {
        path: "home",
        Component: ChatHome,
      },
    ],
  },
]);
export default router;
