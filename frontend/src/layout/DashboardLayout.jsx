import { Link, NavLink, Outlet, useLocation } from "react-router";
import {
  BellIcon,
  LucidePhone,
  MessagesSquare,
  Settings,
  UsersIcon,
} from "lucide-react";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "../store/useAuthStore";
import { useMessageStore } from "../store/useMessageStore";
import IncomingCallModal from "../components/dashboard/messages/IncomingCallModal";
import { useEffect } from "react";
import PageLoader from "../components/PageLoader";

const DashboardLayout = () => {
  const { authUser, socket, connectSocket } = useAuthStore();
  const { selectedPartner } = useMessageStore();
  const location = useLocation();

  useEffect(() => {
    if (!authUser) return;
    connectSocket();
  }, [authUser, connectSocket]);

  if (!socket) return <PageLoader />;

  const sideMenus = [
    {
      title: "Chats",
      link: "/dashboard",
      icon: <MessagesSquare className="size-5" />,
    },
    {
      title: "Friends",
      link: "/dashboard/friends",
      icon: <UsersIcon className="size-5" />,
    },
    {
      title: "Calls",
      link: "/dashboard/calls",
      icon: <LucidePhone className="size-5" />,
    },
    {
      title: "Notifications",
      link: "/dashboard/notifications",
      icon: <BellIcon className="size-5" />,
    },
    // {
    //   title: "Profile",
    //   link: "/dashboard/profile",
    //   icon: <UserRoundPen className="size-5" />,
    // },
    {
      title: "Settings",
      link: "/dashboard/settings",
      icon: <Settings className="size-5" />,
    },
  ];

  const mobileMenus = sideMenus.slice(0, 5);
  const isChatDetailView =
    location.pathname.startsWith("/dashboard/chats/") ||
    (location.pathname === "/dashboard" && Boolean(selectedPartner));

  return (
    <div className="lg:drawer lg:drawer-open">
      <Toaster />
      <IncomingCallModal />
      <input
        id="my-drawer-4"
        type="checkbox"
        className="hidden lg:block drawer-toggle"
      />
      <div className="drawer-content h-screen flex flex-col relative overflow-hidden">
        {/* Page content here */}
        <div
          className={`h-full min-h-0 ${isChatDetailView ? "pb-0" : "pb-20"} lg:pb-0`}
        >
          <Outlet />
        </div>
      </div>

      {!isChatDetailView && (
        <>
          <Link
            to="/"
            aria-label="Go to home page"
            className="fixed bottom-22 right-3 z-50 inline-flex h-11 w-11 items-center justify-center rounded-full border border-base-content/20 bg-base-100 shadow-lg transition hover:scale-105 active:scale-95 lg:hidden"
          >
            <img
              src="/DashChat-logo.png"
              alt="Home"
              className="h-6 w-6 object-contain"
            />
          </Link>

          <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-base-content/20 bg-base-200/95 backdrop-blur lg:hidden">
            <ul className="grid grid-cols-5">
              {mobileMenus.map((menu, i) => (
                <li key={i}>
                  <NavLink
                    end
                    to={menu.link}
                    className={({ isActive }) =>
                      `flex flex-col items-center justify-center gap-1 py-2 text-[11px] font-medium ${
                        isActive
                          ? "text-primary bg-primary/10"
                          : "text-base-content/70 hover:text-base-content"
                      }`
                    }
                  >
                    {menu.icon}
                    <span className="leading-none">{menu.title}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </>
      )}

      <div className="hidden lg:block drawer-side is-drawer-close:overflow-visible z-50 border-r border-base-content/20">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-15 is-drawer-open:w-50 lg:is-drawer-open:w-40">
          <div className="w-full">
            <Link to="/" className="flex items-center justify-center gap-1">
              {/* <ShipWheelIcon className="size-10 text-primary" /> */}
              <img
                src="/DashChat-logo.png"
                alt="DashChat-logo"
                className="h-14 w-14 object-contain"
              />
              <span className="text-xl font-bold font-mono bg-clip-text text-transparent bg-linear-to-r from-primary to-secondary tracking-wider is-drawer-close:hidden">
                DashChat
              </span>
            </Link>
          </div>
          {/* Sidebar content here */}
          <ul className="menu w-full grow gap-1.5">
            {/* List item */}
            {sideMenus.map((menu, i) => (
              <li key={i}>
                <NavLink
                  end
                  to={menu.link}
                  // className={`normal-case is-drawer-close:tooltip is-drawer-close:tooltip-right py-3 rounded-full dashNavLink`}
                  className={({ isActive }) =>
                    `normal-case py-3 rounded-full is-drawer-close:tooltip is-drawer-close:tooltip-right active:text-base-content
    ${isActive ? "bg-primary/80 text-primary-content" : "hover:bg-primary/20"}`
                  }
                  data-tip={menu.title}
                >
                  {menu.icon}
                  <span className="is-drawer-close:hidden">{menu.title}</span>
                </NavLink>
              </li>
            ))}

            <li className="mt-auto">
              <Link
                to="/dashboard/profile"
                className="tooltip tooltip-right flex items-center gap-1 rounded-lg px-2 py-2 hover:bg-primary/20"
                data-tip={authUser?.name || "Profile"}
              >
                <div className="avatar">
                  <div className="w-8 rounded-full">
                    <img
                      src={authUser?.photoURL || "/default-avatar.jpg"}
                      alt="User Avatar"
                    />
                  </div>
                </div>
                <div className="flex-1 is-drawer-close:hidden">
                  <p className="font-semibold text-xs line-clamp-1">
                    {authUser?.name || "User"}
                  </p>
                  <p className="text-xs text-success flex items-center gap-1">
                    <span className="size-2 text-xs rounded-full bg-success inline-block" />
                    Online
                  </p>
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
