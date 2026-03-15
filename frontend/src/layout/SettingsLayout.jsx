import { NavLink, Outlet } from "react-router";
import {
  Settings2,
  User,
  Palette,
  Bell,
  Shield,
  AlertTriangle,
} from "lucide-react";

const SettingsLayout = () => {
  const settingsMenus = [
    { title: "Profile", link: "profile", icon: User },
    { title: "Appearance / Theme", link: "appearance", icon: Palette },
    { title: "Notifications", link: "notifications", icon: Bell },
    { title: "Privacy & Security", link: "privacy", icon: Shield },
    { title: "Danger Zone", link: "danger", icon: AlertTriangle, isDanger: true },
  ];

  return (
    <div className="flex h-full gap-6">

      {/* Sidebar */}
      <div className="w-64 border-r bg-base-100 p-4 flex flex-col">

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
                      menu.isDanger
                        ? ""
                        : ""
                    }

                    ${
                      isActive
                        ?"bg-primary/80 text-primary-content" : "hover:bg-primary/20"
                    }`
                  }
                >
                  <Icon size={18} />
                  {menu.title}
                </NavLink>
              </li>
            );
          })}

        </ul>

      </div>

      {/* Right content */}
      <div className="flex-1 p-6 overflow-y-auto">

        <Outlet />

      </div>

    </div>
  );
};

export default SettingsLayout;



