import { createBrowserRouter } from "react-router";
import PublicLayout from "../layout/PublicLayout";
import Home from "../pages/public/Home";
import AuthLayout from "../layout/AuthLayout";
import Register from "../pages/auth/Register";
import About from "../pages/public/About";
import Privacy from "../components/public/home/privacy/Privacy";


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
        path:"/privacy",
        Component: Privacy
        
      }
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "register",
        Component: Register,
      },
    ],
  },
]);
export default router;
