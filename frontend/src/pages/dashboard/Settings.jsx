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
    {
      name: "Profile Settings",
      path: "profile",
      icon: User,
    },
    {
      name: "Appearance / Theme",
      path: "appearance",
      icon: Palette,
    },
    {
      name: "Notifications",
      path: "notifications",
      icon: Bell,
    },
    {
      name: "Privacy & Security",
      path: "privacy",
      icon: Shield,
    },
    {
      name: "Danger Zone",
      path: "danger",
      icon: AlertTriangle,
      danger: true,
    },
  ];

  return (
    <div className="h-full flex bg-base-100">

      {/* Sidebar */}
      <div className="w-64 border-r p-4">

        <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
          <Settings2 size={18} />
          Settings
        </h2>

        <div className="space-y-1">

          {menu.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 p-2 rounded-lg transition-all
                  
                  ${
                    item.danger
                      ? "text-red-500 hover:bg-red-100"
                      : "hover:bg-base-200"
                  }

                  ${isActive ? "bg-base-200 font-medium border-l-4 border-primary" : ""}
                  `
                }
              >
                <Icon size={18} />
                {item.name}
              </NavLink>
            );
          })}

        </div>

      </div>

      {/* Right Content */}
      <div className="flex-1 p-6">
        <Outlet />
      </div>

    </div>
  );
};

export default Settings;

