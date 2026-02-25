import { Link, Outlet } from "react-router";
import { MessageSquareText, Phone } from "lucide-react";

const ChatLayout = () => {
  return (
    <div>
      {/* Large view */}
      
      <div className="hidden md:grid drawer md:drawer-open">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        {/* Page content here */}
        <div className="drawer-content">
          <Outlet />
        </div>

        <div className="drawer-side overflow-visible">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div className="flex min-h-full flex-col items-start justify-center bg-primary/10 w-16">
            {/* Sidebar content here */}
            <ul className="menu gap-1 w-full grow">
              <Link to="/">
                <img src="/DashChat-logo.png" alt="DashChat Logo" />
              </Link>

              <li>
                <button
                  className="tooltip tooltip-right hover:bg-primary/20 rounded-full flex items-center justify-center w-12 h-12"
                  data-tip="Messages"
                >
                  {/* Settings icon */}
                  <MessageSquareText size={24} />
                </button>
              </li>
              <li>
                <button
                  className="tooltip tooltip-right hover:bg-primary/20 rounded-full flex items-center justify-center w-12 h-12"
                  data-tip="Calls"
                >
                  {/* Settings icon */}
                  <Phone size={24} />
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Mobile view */}
      <div className="block md:hidden">
        <Outlet />
      </div>
    </div>
  );
};

export default ChatLayout;
