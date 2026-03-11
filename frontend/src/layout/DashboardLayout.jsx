import { Link, NavLink, Outlet } from "react-router";
import {
  BellIcon,
  HomeIcon,
  MessagesSquare,
  PanelLeft,
  Settings,
  ShipWheelIcon,
  UserRoundPen,
  UsersIcon,
} from "lucide-react";
import ThemeSelector from "../components/ThemeSelector";

const DashboardLayout = () => {
  const sideMenus = [
    {
      title: "Home",
      link: "/dashboard",
      icon: <HomeIcon className="size-5" />,
    },
    {
      title: "Friends",
      link: "/dashboard/friends",
      icon: <UsersIcon className="size-5" />,
    },
    {
      title: "Chats",
      link: "/dashboard/chats",
      icon: <MessagesSquare className="size-5" />,
    },
    {
      title: "Notifications",
      link: "/dashboard/notifications",
      icon: <BellIcon className="size-5" />,
    },
    {
      title: "Profile",
      link: "/dashboard/profile",
      icon: <UserRoundPen className="size-5" />,
    },
    {
      title: "Settings",
      link: "/dashboard/settings",
      icon: <Settings className="size-5" />,
    },
  ];

  return (
    <div className="drawer lg:drawer-open">
      <input
        id="my-drawer-4"
        defaultChecked
        type="checkbox"
        className="drawer-toggle"
      />
      <div className="drawer-content h-screen flex flex-col relative overflow-y-auto">
        {/* Navbar */}
        <nav className="navbar w-full bg-base-200 sticky top-0 z-50 pl-4">
          <label
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className="btn btn-circle btn-primary btn-sm"
          >
            {/* Sidebar toggle icon */}
            <PanelLeft size={20} />
          </label>
          <div className="px-4 flex justify-end w-full">
            <ThemeSelector />
          </div>
        </nav>
        {/* Page content here */}
        <div className="p-4 sm:p-6">
          <Outlet />
        </div>
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-15 is-drawer-open:w-54">
          <div className="px-2 py-2.5">
            <Link to="/" className="flex items-center justify-center gap-2.5">
              <ShipWheelIcon className="size-10 text-primary" />
              <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-linear-to-r from-primary to-secondary tracking-wider is-drawer-close:hidden">
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

            <div className="mt-auto">
              <div className="flex items-center gap-3">
                <div className="avatar">
                  <div className="w-10 rounded-full">
                    <img src={"/default-avatar.jpg"} alt="User Avatar" />
                  </div>
                </div>
                <div className="flex-1 is-drawer-close:hidden">
                  <p className="font-semibold text-sm">Md Osamabin Somrat</p>
                  <p className="text-xs text-success flex items-center gap-1">
                    <span className="size-2 rounded-full bg-success inline-block" />
                    Online
                  </p>
                </div>
              </div>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
