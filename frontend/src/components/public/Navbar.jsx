import { Link, NavLink, useLocation, useNavigate } from "react-router";
import {
  Bell,
  LayoutDashboard,
  LogOut,
  MessageCircle,
  User,
} from "lucide-react";
import Logo from "./Logo";
import { useEffect, useMemo, useState } from "react";
import ThemeSelector from "../ThemeSelector";
import { useAuthStore } from "../../store/useAuthStore";
import { useFriendStore } from "../../store/useFriendsStore";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const { authUser, userLoading, logoutUser } = useAuthStore();
  const { notifications, getNotifications } = useFriendStore();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!authUser?._id) return;
    getNotifications();
  }, [authUser?._id, getNotifications]);

  const unreadCount = useMemo(
    () => notifications.filter((notification) => notification.unread).length,
    [notifications],
  );

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Features", path: "/features" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Privacy", path: "/privacy" },
  ];

  const isDashboardRoute = location.pathname.startsWith("/dashboard");

  const closeMobileMenu = () => {
    const activeElement = document.activeElement;
    if (activeElement instanceof HTMLElement) {
      activeElement.blur();
    }
  };

  const handleLogout = async () => {
    closeMobileMenu();
    const isLoggedOut = await logoutUser();
    if (isLoggedOut) {
      navigate("/");
    }
  };

  return (
    <div
      className={`navbar bg-base-200 shadow-sm px-4 md:px-10 transition-all duration-500 ${scrolled ? "backdrop-blur-md shadow-md" : "bg-base-200"}`}
    >
      {/* Mobile View */}
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-1 p-2 shadow bg-base-200 rounded-box w-52"
          >
            {navLinks.map((link) => (
              <li key={link.name}>
                <NavLink
                  to={link.path}
                  onClick={closeMobileMenu}
                  className={({ isActive }) =>
                    isActive
                      ? "bg-primary text-white"
                      : "text-secondary text-[16px] hover:bg-gray-100 hover:text-green-700"
                  }
                >
                  {link.name}
                </NavLink>
              </li>
            ))}

            {authUser ? (
              <>
                <li>
                  <NavLink
                    to="/dashboard"
                    onClick={closeMobileMenu}
                    className="text-secondary text-[16px] hover:bg-gray-100 hover:text-green-700"
                  >
                    Continue Chat
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/notifications"
                    onClick={closeMobileMenu}
                    className="text-secondary text-[16px] hover:bg-gray-100 hover:text-green-700"
                  >
                    Notifications
                    {unreadCount > 0 ? ` (${unreadCount})` : ""}
                  </NavLink>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="text-secondary text-[16px] hover:bg-red-100 hover:text-red-600"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink
                    to="/auth/login"
                    onClick={closeMobileMenu}
                    className="text-secondary text-[16px] hover:bg-gray-100 hover:text-green-700"
                  >
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/auth/register"
                    onClick={closeMobileMenu}
                    className="text-secondary text-[16px] hover:bg-gray-100 hover:text-green-700"
                  >
                    Register
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>

        {/* Logo */}
        <div className="flex items-center gap-2">
          <Logo />
        </div>
      </div>

      {/* Desktop View - Center */}
      <div className="navbar-center hidden lg:flex lg:pr-14 xl:pr-12">
        <ul className="menu menu-horizontal px-1 gap-2">
          {navLinks.map((link) => (
            <li key={link.name}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `rounded-full px-4 py-2 text-[16px] font-medium transition ${
                    isActive
                      ? "bg-primary text-white"
                      : "bg-base-200 hover:bg-base-300 hover:text-primary"
                  }`
                }
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* Right Side - Button */}
      <div className="gap-2 navbar-end pl-2 lg:pl-4">
        <div className="tooltip tooltip-bottom ml-1 lg:ml-2" data-tip="Theme">
          <ThemeSelector />
        </div>

        {userLoading ? (
          <>
            <div className="hidden md:flex h-10 w-28 rounded-full bg-base-300 animate-pulse" />
            <div className="hidden md:flex h-10 w-28 rounded-full bg-base-300 animate-pulse" />
            <div className="h-10 w-10 rounded-full bg-base-300 animate-pulse" />
          </>
        ) : authUser ? (
          <>
            <Link
              to="/dashboard"
              className={`btn rounded-full hidden md:flex items-center gap-2 px-4 ${isDashboardRoute ? "btn-primary text-primary-content" : "btn-outline btn-primary"}`}
            >
              <LayoutDashboard size={18} />
              Continue Chat
            </Link>

            <Link
              to="/dashboard/notifications"
              className="btn btn-circle btn-ghost relative tooltip tooltip-bottom"
              aria-label="Notifications"
              data-tip="Notification"
            >
              <Bell size={20} />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-error text-white text-[10px] flex items-center justify-center">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              )}
            </Link>

            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle tooltip tooltip-bottom"
                data-tip={authUser?.name || "My account"}
              >
                <div className="avatar">
                  <div className="w-9 h-9 rounded-full border border-base-300 overflow-hidden">
                    {authUser?.photoURL ? (
                      <img
                        src={authUser.photoURL}
                        alt={authUser?.name || "User"}
                      />
                    ) : (
                      <div className="w-full h-full bg-base-300 flex items-center justify-center">
                        <User size={16} />
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-20 w-52 p-2 shadow"
              >
                <li className="px-2 py-1.5 pointer-events-none">
                  <p className="font-semibold text-sm truncate text-base-content">
                    {authUser?.name || "My account"}
                  </p>
                </li>
                <div className="h-px bg-base-200 my-1" />
                <li>
                  <Link to="/dashboard" className="flex items-center gap-2">
                    <LayoutDashboard size={16} /> Continue Chat
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/profile">Profile</Link>
                </li>
                <li>
                  <button type="button" onClick={handleLogout}>
                    <LogOut size={16} /> Logout
                  </button>
                </li>
              </ul>
            </div>
          </>
        ) : (
          <>
            <Link
              to="/auth/register"
              className="btn btn-ghost rounded-full hidden md:inline-flex"
            >
              Sign Up
            </Link>
            <Link
              to="/auth/login"
              className="btn btn-outline btn-success rounded-full flex items-center gap-2 px-5 lg:px-7 py-5 hover:bg-secondary hover:text-white text-base-content transition text-[16px] md:text-[18px] bg-base-100"
            >
              <MessageCircle size={22} />
              Start Chat
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
