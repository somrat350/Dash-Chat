import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import PageLoader from "../components/PageLoader";
import { Link, Navigate } from "react-router";
import { MessageSquareText, Phone } from "lucide-react";
import Home from "../components/chats/mobile-view/Home";
import ChatHeader from "../components/chats/large-view/ChatHeader";
import Sidebar from "../components/chats/sidebar/Sidebar";

const ChatLayout = () => {
  const { isCheckingAuth, checkAuth, authUser } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  if (isCheckingAuth) return <PageLoader />;
  if (!authUser) {
    return <Navigate to="/login" replace />;
  }
  return (
    <div>
      <div className="drawer md:drawer-open ">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        {/* Page content here */}
        <div className="drawer-content">
          <div className="border-l border-primary/30 h-full w-full grid grid-cols-3">
            {/* Chat sidebar */}
            <div className="col-span-1 border-r border-primary/30 ">
            <Sidebar></Sidebar>
            </div>
            <div className="col-span-2">
              <ChatHeader />
            </div>
          </div>
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
        <Home />
      </div>
    </div>
  );
};

export default ChatLayout;
