import { Link,  Outlet, useNavigate } from "react-router";
import { Library, LogOut, MessageSquareText, Phone, Settings } from "lucide-react";
import { useMessageStore } from "../store/useMessageStore";

// import { useAuthStore } from "../store/useAuthStore";

const ChatLayout = () => {
 
   const { selectedPartner,  } = useMessageStore();
   const navigate = useNavigate();
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
            <ul className="menu gap-1 w-full grow space-y-2">
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
            <ul className="mt-auto space-y-2">
                 <li onClick={() => navigate("/conversation/setting")} >
                 <button
                  className=" rounded-full w-12 h-12"
                  data-tip="Settings"
                >
                  {/* Settings icon */}
                  <Settings size={24} />
                </button>

              </li>
              <li onClick={() => navigate("/conversation/profile")}>
               
                
                
                <img
          
                  src={selectedPartner?.photoURL || "/default-avatar.jpg"}
                  alt="profile"
                  className="w-12 h-12 rounded-full"
                />
              </li>
            </ul>
             
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
