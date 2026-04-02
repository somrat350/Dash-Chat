import { NavLink, Outlet, useLocation } from "react-router";
import {
  ArrowLeft,
  Settings2,
  User,
  Palette,
  Bell,
  Shield,
  AlertTriangle,
  LogOut,
} from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

const SettingsLayout = () => {
  const { logoutUser } = useAuthStore();
  const location = useLocation();

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

  const isSettingsIndex = location.pathname === "/dashboard/settings";
  const activeMobileMenu = settingsMenus.find((menu) =>
    location.pathname.endsWith(`/settings/${menu.link}`),
  );

  return (
    <div className="flex h-full min-h-0 overflow-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:w-64 border-r p-4 flex-col">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
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

      {/* Content */}
      <div className="flex-1 min-h-0 overflow-y-auto p-4 md:p-6">
        <div className="md:hidden">
          {isSettingsIndex ? (
            <>
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Settings2 size={18} />
                Settings
              </h2>

              <ul className="flex flex-col gap-2">
                {settingsMenus.map((menu, idx) => {
                  const Icon = menu.icon;

                  return (
                    <li key={idx}>
                      <NavLink
                        to={menu.link}
                        className={({ isActive }) =>
                          `flex items-center gap-3 py-3 px-4 rounded-lg font-medium transition ${
                            isActive
                              ? "bg-primary/80 text-primary-content"
                              : "hover:bg-primary/20"
                          } ${menu.isDanger ? "text-error" : ""}`
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
            </>
          ) : (
            <>
              <div className="mb-4 flex items-center gap-2">
                <NavLink
                  to="/dashboard/settings"
                  className="btn btn-ghost btn-circle btn-sm"
                  aria-label="Back to settings menu"
                >
                  <ArrowLeft size={18} />
                </NavLink>
                <h2 className="text-base font-semibold">
                  {activeMobileMenu?.title || "Settings"}
                </h2>
              </div>
              <Outlet />
            </>
          )}
        </div>

        <div className="hidden md:block h-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default SettingsLayout;
