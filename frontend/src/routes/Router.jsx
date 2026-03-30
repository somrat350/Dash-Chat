import { createBrowserRouter } from "react-router";
import PublicLayout from "../layout/PublicLayout";
import Home from "../pages/public/Home";
import AuthLayout from "../layout/AuthLayout";
import Register from "../pages/auth/Register";
import About from "../pages/public/About";
import Login from "../pages/auth/Login";
import ForgotPassword from "../pages/auth/ForgotPassword";
import Privacy from "../pages/public/Privacy";
import ProtectedRoute from "./ProtectedRoute";
import Contact from "../pages/public/Contact";
import Features from "../pages/public/Features";
import FeatureDetails from "../pages/public/FeatureDetails";
import DashboardLayout from "../layout/DashboardLayout";
import DashHome from "../pages/dashboard/DashHome";
import Friends from "../pages/dashboard/Friends";
import Chats from "../pages/dashboard/Chats";
import Notifications from "../pages/dashboard/Notifications";
import Profile from "../pages/dashboard/Profile";
import Settings from "../pages/dashboard/Settings";
import Messages from "../pages/dashboard/Messages";
import Calls from "../pages/dashboard/Calls";
// import HelpandFeadback from "../pages/dashboard/HelpandFeadback";
import SettingsLayout from "../layout/SettingsLayout";
import ProfileSettings from "../pages/dashboard/ProfileSettings";
import AppearanceSettings from "../pages/dashboard/AppearanceSettings";

import PrivacySettings from "../pages/dashboard/PrivacySettings";
import DangerZone from "../pages/dashboard/DangerZone";
import NotificationSettings from "../pages/dashboard/NotificationsSettings";
import SettingsDefault from "../pages/dashboard/SettingsDefault";

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
      {
        path: "/features/:featureSlug",
        Component: FeatureDetails,
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
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        Component: Chats,
      },
      {
        path: "friends",
        Component: Friends,
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
        Component: Profile,
      },
      {
        path: "settings",
        Component: Settings,
      },
      {
        path: "settings",
        element: <SettingsLayout />,
        children: [
          {
            index: true,
            element: <SettingsDefault />,
          },
          {
            path: "profile",
            element: <ProfileSettings />,
          },
          {
            path: "appearance",
            element: <AppearanceSettings />,
          },
          {
            path: "notifications",
            element: <NotificationSettings />,
          },
          {
            path: "privacy",
            element: <PrivacySettings />,
          },
          {
            path: "danger",
            element: <DangerZone />,
          },
        ],
      },
    ],
  },
]);
export default router;
