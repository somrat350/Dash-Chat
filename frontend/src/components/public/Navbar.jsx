import { Link, NavLink, useLocation, useNavigate } from "react-router";
import {
  Bell,
  LayoutDashboard,
  LogOut,
  MessageCircle,
  User,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";
import Logo from "./Logo";
import { useEffect, useMemo, useState, useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import toast from "react-hot-toast";
import ThemeSelector from "../ThemeSelector";
import { useAuthStore } from "../../store/useAuthStore";
import { useMessageStore } from "../../store/useMessageStore";
import { useNotificationStore } from "../../store/useNotificationStore";
import { CHAT_FEATURES } from "../../constants/chatFeaturesData";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // Open features dropdown if on /features or subroute on initial load
  const location = useLocation();
  const isFeaturesRoute = location.pathname.startsWith("/features");
  const [featuresOpen, setFeaturesOpen] = useState(isFeaturesRoute);
  const featuresMenuRef = useRef(null);
  const featuresButtonRef = useRef(null);
  const { authUser, userLoading, logoutUser, socket } = useAuthStore();
  const { getUserById } = useMessageStore();
  const { getNotifications } = useNotificationStore();
  const navigate = useNavigate();
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useLayoutEffect(() => {
    if (!featuresMenuRef.current) return;

    const ctx = gsap.context(() => {
      if (featuresOpen) {
        const tl = gsap.timeline();
        tl.fromTo(
          featuresMenuRef.current,
          { opacity: 0, scale: 0.95, y: -10 },
          { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: "back.out" },
        ).fromTo(
          "[data-feature-item]",
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.3, stagger: 0.08 },
          "-=0.2",
        );
      }
    }, featuresMenuRef);

    return () => ctx.revert();
  }, [featuresOpen]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        featuresMenuRef.current &&
        !featuresMenuRef.current.contains(e.target) &&
        !featuresButtonRef.current?.contains(e.target)
      ) {
        setFeaturesOpen(false);
      }
    };

    if (featuresOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [featuresOpen]);

  // Auto-close features dropdown on navigation away from /features
  useEffect(() => {
    if (!location.pathname.startsWith("/features")) {
      setFeaturesOpen(false);
    } else {
      setFeaturesOpen(true);
    }
  }, [location.pathname]);

  useEffect(() => {
    if (!authUser?._id) return;
    const fetchNotifications = async () => {
      try {
        const data = await getNotifications();
        const unreadNotifications = data.filter((d) => !d.isRead);
        setUnreadCount(unreadNotifications?.length);
      } catch (error) {
        console.error("Failed to fetch notifications", error);
      }
    };

    fetchNotifications();
  }, [authUser?._id, getNotifications]);

  useEffect(() => {
    if (!authUser?._id || !socket) return;

    const isDashboardPage = location.pathname.startsWith("/dashboard");
    if (isDashboardPage) return;

    const notificationSound = new Audio("/sounds/notification.mp3");
    notificationSound.preload = "auto";
    notificationSound.volume = 0.8;

    const handleIncomingMessageAlert = async (newMessage) => {
      const isIncomingForMe =
        String(newMessage?.receiverId || "") === String(authUser._id);
      const isFromMe =
        String(newMessage?.senderId || "") === String(authUser._id);

      if (!isIncomingForMe || isFromMe) return;

      notificationSound.pause();
      notificationSound.currentTime = 0;
      notificationSound.play().catch(() => {});

      let senderName = "Someone";
      try {
        const sender = await getUserById(newMessage?.senderId);
        if (sender?.name) senderName = sender.name;
      } catch (error) {
        console.log(error);
        // Keep fallback sender name when API fails
      }

      toast(`${senderName} sent a message`);
    };

    socket.on("newMessage", handleIncomingMessageAlert);

    return () => {
      socket.off("newMessage", handleIncomingMessageAlert);
    };
  }, [authUser?._id, getUserById, location.pathname, socket]);

  // Order: Home, About, Contact, Privacy, Features (Features handled separately)
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Privacy", path: "/privacy" },
  ];

  const isDashboardRoute = location.pathname.startsWith("/dashboard");
  // isFeaturesRoute already declared above

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
      className={`navbar sticky top-0 z-50 px-4 md:px-10 transition-all duration-500 ${
        scrolled
          ? "bg-base-100/55 backdrop-blur-xl backdrop-saturate-150 border-b border-base-300/60 shadow-md"
          : "bg-base-200 shadow-sm"
      }`}
    >
      {/* Mobile View */}
      <div className="navbar-start flex items-center">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost lg:hidden transition-all duration-200 ml-[-10px] sm:ml-0"
            aria-label="Toggle menu"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
          >
            <span className="relative block w-6 h-6">
              <Menu
                className={`h-6 w-6 absolute left-0 top-0 transition-all duration-200 ${mobileMenuOpen ? "opacity-0 scale-90 rotate-45" : "opacity-100 scale-100 rotate-0"}`}
              />
              <X
                className={`h-6 w-6 absolute left-0 top-0 transition-all duration-200 ${mobileMenuOpen ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-90 rotate-45"}`}
              />
            </span>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-1 p-2 shadow bg-base-200 rounded-box w-52"
          >
            {/* Home */}
            <li>
              <NavLink
                to="/"
                onClick={closeMobileMenu}
                className={({ isActive }) =>
                  isActive
                    ? "bg-primary text-white"
                    : "text-secondary text-[16px] hover:bg-gray-100 hover:text-green-700"
                }
              >
                Home
              </NavLink>
            </li>
            {/* About */}
            <li>
              <NavLink
                to="/about"
                onClick={closeMobileMenu}
                className={({ isActive }) =>
                  isActive
                    ? "bg-primary text-white"
                    : "text-secondary text-[16px] hover:bg-gray-100 hover:text-green-700"
                }
              >
                About
              </NavLink>
            </li>
            {/* Contact */}
            <li>
              <NavLink
                to="/contact"
                onClick={closeMobileMenu}
                className={({ isActive }) =>
                  isActive
                    ? "bg-primary text-white"
                    : "text-secondary text-[16px] hover:bg-gray-100 hover:text-green-700"
                }
              >
                Contact
              </NavLink>
            </li>
            {/* Privacy */}
            <li>
              <NavLink
                to="/privacy"
                onClick={closeMobileMenu}
                className={({ isActive }) =>
                  isActive
                    ? "bg-primary text-white"
                    : "text-secondary text-[16px] hover:bg-gray-100 hover:text-green-700"
                }
              >
                Privacy
              </NavLink>
            </li>
            {/* Features (last) */}
            <li>
              <NavLink
                to="/features"
                onClick={closeMobileMenu}
                className={({ isActive }) =>
                  isActive
                    ? "bg-primary text-white"
                    : "text-secondary text-[16px] hover:bg-gray-100 hover:text-green-700"
                }
              >
                Features
              </NavLink>
            </li>

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
        <div className="flex items-center">
          <Logo />
        </div>
      </div>

      {/* Desktop View - Center */}
      <div className="navbar-center hidden lg:flex lg:pr-14 xl:pr-12">
        <ul className="menu menu-horizontal px-1 gap-2">
          {/* Home */}
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-[16px] font-medium transition ${
                  isActive
                    ? "bg-primary text-white"
                    : "bg-base-200 hover:bg-base-300 hover:text-primary"
                }`
              }
            >
              Home
            </NavLink>
          </li>
          {/* About */}
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-[16px] font-medium transition ${
                  isActive
                    ? "bg-primary text-white"
                    : "bg-base-200 hover:bg-base-300 hover:text-primary"
                }`
              }
            >
              About
            </NavLink>
          </li>
          {/* Contact */}
          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-[16px] font-medium transition ${
                  isActive
                    ? "bg-primary text-white"
                    : "bg-base-200 hover:bg-base-300 hover:text-primary"
                }`
              }
            >
              Contact
            </NavLink>
          </li>
          {/* Privacy */}
          <li>
            <NavLink
              to="/privacy"
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-[16px] font-medium transition ${
                  isActive
                    ? "bg-primary text-white"
                    : "bg-base-200 hover:bg-base-300 hover:text-primary"
                }`
              }
            >
              Privacy
            </NavLink>
          </li>
          {/* Features Dropdown (last) */}
          <li className="relative">
            <button
              ref={featuresButtonRef}
              onClick={() => {
                // Always navigate to /features if not already there
                if (!location.pathname.startsWith("/features")) {
                  navigate("/features");
                } else {
                  setFeaturesOpen((open) => !open);
                }
              }}
              className={`rounded-full px-4 py-2 text-[16px] font-medium transition flex items-center gap-1 ${
                featuresOpen
                  ? "bg-primary text-white"
                  : "bg-base-200 hover:bg-base-300 hover:text-primary"
              }`}
              aria-expanded={featuresOpen}
              aria-haspopup="menu"
            >
              Features
              <ChevronDown
                size={18}
                className={`transition-transform duration-300 ${
                  featuresOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Features Menu */}
            {featuresOpen && (
              <div
                ref={featuresMenuRef}
                className="absolute top-full left-0 mt-2 w-96 bg-base-100 rounded-2xl shadow-2xl border border-base-300/80 p-4 z-50"
              >
                <div className="grid grid-cols-1 gap-3">
                  {CHAT_FEATURES.map((feature) => (
                    <Link
                      key={feature.slug}
                      to={`/features/${feature.slug}`}
                      data-feature-item
                      onClick={() => setFeaturesOpen(false)}
                      className="group p-3 rounded-xl hover:bg-base-200 transition-all duration-300 flex items-start gap-3"
                    >
                      <div
                        className={`h-10 w-10 rounded-lg bg-linear-to-br ${feature.color} flex items-center justify-center shrink-0 group-hover:shadow-lg group-hover:scale-110 transition-all duration-300 overflow-hidden`}
                      >
                        <img
                          src={feature.img}
                          alt={feature.name}
                          className="h-6 w-6 object-contain"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-base-content text-sm group-hover:text-primary transition-colors">
                          {feature.name}
                        </h4>
                        <p className="text-base-content/70 text-xs line-clamp-2">
                          {feature.description}
                        </p>
                      </div>
                      <div className="text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                        →
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="mt-3 pt-3 border-t border-base-300">
                  <Link
                    to="/features"
                    onClick={() => setFeaturesOpen(false)}
                    className="text-center text-sm font-medium text-primary hover:text-primary/80 transition py-1 block"
                  >
                    View all features →
                  </Link>
                </div>
              </div>
            )}
          </li>
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
                <span className="absolute -top-1 -right-1 min-w-4.5 h-4.5 px-1 rounded-full bg-error text-white text-[10px] flex items-center justify-center">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              )}
            </Link>

            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle tooltip tooltip-left"
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
              className="btn btn-success rounded-full flex items-center gap-2 px-3 sm:px-5 lg:px-7 py-2.5 sm:py-5 text-white text-xs sm:text-[16px] md:text-[18px] transition hover:shadow-lg min-h-0 h-9 sm:h-auto"
            >
              <MessageCircle size={18} className="sm:w-[22px] sm:h-[22px]" />
              <span className="hidden xs:inline">Start Chat</span>
              <span className="inline xs:hidden">Start Chat</span>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
