import { createBrowserRouter } from "react-router";
import PublicLayout from "../layout/PublicLayout";
import Home from "../pages/public/Home";
import AuthLayout from "../layout/AuthLayout";
import Register from "../pages/auth/Register";
import About from "../pages/public/About";
import Login from "../pages/auth/Login";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ChatLayout from "../layout/ChatLayout";
import Privacy from "../pages/public/Privacy";
import ProtectedRoute from "./ProtectedRoute";
import ChatHome from "../pages/conversation/chat/ChatHome";
import Contact from "../pages/public/Contact";
import Features from "../pages/public/Features";
import DashboardLayout from "../layout/DashboardLayout";
import DashHome from "../pages/dashboard/DashHome";
import Friends from "../pages/dashboard/Friends";
import Chats from "../pages/dashboard/Chats";
import Notifications from "../pages/dashboard/Notifications";
import Profile from "../pages/dashboard/Profile";
import Settings from "../pages/dashboard/Settings";
import Messages from "../pages/dashboard/Messages";
import Calls from "../pages/dashboard/Calls";

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
      {
        path: "/contact",
        Component: Contact,
      },
      {
        path: "/features",
        Component: Features,
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
    path: "/conversation",
    element: (
      <ProtectedRoute>
        <ChatLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        Component: ChatHome,
      },
      {
        path: "friends",
        Component: Friends,
      },
      {
        path: "chats",
        Component: Chats,
      },
      {
        path: "chats/:id",
        Component: Messages,
      },
      {
        path: "calls",
        Component: Calls,
      },
      {
        path: "notifications",
        Component: Notifications,
      },
      {
        path: "profile",
        element: <ProfilePage></ProfilePage>,
      },
      {
        path: "setting",
        element: <SettingPage></SettingPage>,
      },
      {
        path: "channel",
        element: <Channel></Channel>,
      },
      {
        path: "community",
        element: <Community></Community>,
      },
      {
        path: "calls",
        element: <CallsLayout></CallsLayout>,
        children: [
          {
            index: true,
            element: <Calls mode="recent"></Calls>,
          },
          {
            path: "recent",
            element: <Calls mode="recent"></Calls>,
          },
          {
            path: "missed",
            element: <Calls mode="missed"></Calls>,
          },
          {
            path: "scheduled",
            element: <Calls mode="scheduled"></Calls>,
          },
        ],
      },
    ],
  },
]);
export default router;
