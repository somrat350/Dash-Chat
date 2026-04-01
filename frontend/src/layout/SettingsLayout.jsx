import { useState } from "react";
import { NavLink, Outlet } from "react-router";
import {
  Settings2,
  User,
  Palette,
  Bell,
  Shield,
  AlertTriangle,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

const SettingsLayout = () => {
  const { logoutUser } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);

  const settingsMenus = [
    { title: "Profile", link: "profile", icon: User },
    { title: "Appearance / Theme", link: "appearance", icon: Palette },
    { title: "Notifications", link: "notifications", icon: Bell },
    { title: "Privacy & Security", link: "privacy", icon: Shield },
    {
      title: "Danger Zone",
      link: "danger",
      icon: AlertTriangle,
      isDanger: true,
    },
  ];

  return (
    <div className="flex h-[calc(100vh-64px)] overflow-hidden">

      {/*  Mobile Topbar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-base-100 border-b px-4 py-3 flex items-center justify-between">
        <button onClick={() => setIsOpen(true)}>
          <Menu />
        </button>
        <span className="font-semibold">Settings</span>
        <div />
      </div>

      {/*  Overlay (mobile) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/*  Sidebar */}
      <div
        className={`
          fixed md:static z-50 top-0 left-0 h-full w-64 bg-base-100 border-r p-4 flex flex-col
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* Mobile close */}
        <div className="flex items-center justify-between mb-6 md:hidden">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <Settings2 size={18} />
            Settings
          </h2>
          <button onClick={() => setIsOpen(false)}>
            <X />
          </button>
        </div>

        {/* Desktop title */}
        <h2 className="hidden md:flex text-xl font-bold mb-6 items-center gap-2">
          <Settings2 size={20} />
          Settings
        </h2>

        <ul className="flex flex-col gap-2 grow">
          {settingsMenus.map((menu, idx) => {
            const Icon = menu.icon;

            return (
              <li key={idx}>
                <NavLink
                  to={menu.link}
                  onClick={() => setIsOpen(false)} // mobile auto close
                  className={({ isActive }) =>
                    `flex items-center gap-3 py-3 px-4 rounded-lg font-medium transition

                    ${
                      isActive
                        ? "bg-primary/80 text-primary-content"
                        : "hover:bg-primary/20"
                    }

                    ${menu.isDanger ? "text-error" : ""}
                    `
                  }
                >
                  <Icon size={18} />
                  {menu.title}
                </NavLink>
              </li>
            );
          })}

          <li>
            <button
              onClick={logoutUser}
              className="w-full flex items-center gap-3 py-3 px-4 rounded-lg font-medium transition hover:bg-error/10 text-error"
            >
              <LogOut size={18} />
              Logout
            </button>
          </li>
        </ul>
      </div>

      {/*  Content */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 mt-14 md:mt-0">
        <Outlet />
      </div>
    </div>
  );
};

export default SettingsLayout;
