import {
  Settings2,
  User,
  Palette,
  Bell,
  Shield,
  AlertTriangle,
} from "lucide-react";

import { NavLink, Outlet } from "react-router";

const Settings = () => {
  const menu = [
    { name: "Profile Settings", path: "profile", icon: User },
    { name: "Appearance / Theme", path: "appearance", icon: Palette },
    { name: "Notifications", path: "notifications", icon: Bell },
    { name: "Privacy & Security", path: "privacy", icon: Shield },
    {
      name: "Danger Zone",
      path: "danger",
      icon: AlertTriangle,
      danger: true,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-base-100">

      {/* Sidebar */}
      <div className="w-full md:w-64 border-b md:border-r p-4">

        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Settings2 size={18} />
          Settings
        </h2>

        <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible">

          {menu.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-2 md:gap-3 p-2 rounded-lg whitespace-nowrap transition-all
                  
                  ${
                    item.danger
                      ? "text-red-500 hover:bg-red-100"
                      : "hover:bg-base-200"
                  }

                  ${
                    isActive
                      ? "bg-base-200 font-medium border-b-2 md:border-b-0 md:border-l-4 border-primary"
                      : ""
                  }
                  `
                }
              >
                <Icon size={18} />
                <span className="text-sm md:text-base">{item.name}</span>
              </NavLink>
            );
          })}

        </div>

      </div>

      {/* Content */}
      <div className="flex-1 p-4 md:p-6">
        <Outlet />
      </div>

    </div>
  );
};

export default Settings;