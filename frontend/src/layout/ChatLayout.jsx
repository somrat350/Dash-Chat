import { NavLink, Outlet } from "react-router";
import { MessageSquareText, Phone, Radio, Settings, Users } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

const ChatLayout = () => {
  const { authUser, userLoading } = useAuthStore();
  if (userLoading) return;
  const baseClass =
    "flex items-center justify-center w-12 h-12 rounded-full transition-all duration-200 focus:outline-none focus:ring-0 focus:ring-offset-0";

  const normalClass = `${baseClass} hover:bg-primary/20`;
  const activeClass = `${baseClass} bg-primary text-white shadow-sm`;

  return (
    <div>
      {/* Desktop */}
      <div className="hidden md:grid drawer md:drawer-open">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

        {/* Page */}
        <div className="drawer-content">
          <Outlet />
        </div>

        {/* Sidebar */}
        <div className="drawer-side overflow-visible">
          <label htmlFor="my-drawer-4" className="drawer-overlay"></label>

          <div className="flex min-h-full flex-col items-center bg-primary/10 w-16 py-4">
            {/* Logo */}
            <NavLink to="/" className="mb-6">
              <img src="/DashChat-logo.png" alt="DashChat Logo" />
            </NavLink>

            <ul className="menu gap-2 w-full items-center">
              {/* Messages */}
              <li>
                <NavLink
                  to="/conversation/chat"
                  end
                  className={({ isActive }) =>
                    isActive ? activeClass : normalClass
                  }
                >
                  <MessageSquareText size={24} />
                </NavLink>
              </li>

              {/* Calls */}
              <li>
                <NavLink
                  to="/conversation/calls"
                  className={({ isActive }) =>
                    isActive ? activeClass : normalClass
                  }
                >
                  <Phone size={24} />
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/conversation/channel"
                  className={({ isActive }) =>
                    isActive ? activeClass : normalClass
                  }
                >
                  <Radio size={24} />
                </NavLink>
              </li>

              {/* Community */}
              <li>
                <NavLink
                  to="/conversation/community"
                  className={({ isActive }) =>
                    isActive ? activeClass : normalClass
                  }
                >
                  <Users size={24} />
                </NavLink>
              </li>
            </ul>

            {/* Bottom */}
            <ul className="menu mt-auto gap-2 items-center">
              {/* Settings */}
              <li>
                <NavLink
                  to="/conversation/setting"
                  className={({ isActive }) =>
                    isActive ? activeClass : normalClass
                  }
                >
                  <Settings size={24} />
                </NavLink>
              </li>

              {/* Profile */}
              <li>
                <NavLink
                  to="/conversation/profile"
                  className={({ isActive }) =>
                    isActive
                      ? "bg-primary rounded-full p-1 shadow-sm"
                      : "hover:bg-primary/20 rounded-full p-1 transition"
                  }
                >
                  <img
                    src={authUser?.photoURL || "/default-avatar.jpg"}
                    alt="profile"
                    className="w-10 h-10 rounded-full"
                  />
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className="block md:hidden">
        <Outlet />
      </div>
    </div>
  );
};

export default ChatLayout;
