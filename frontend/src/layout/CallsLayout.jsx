import { ArrowLeft } from "lucide-react";
import { NavLink, Outlet, useNavigate } from "react-router";

const CallsLayout = () => {
  const navigate = useNavigate();
  const tabClass = ({ isActive }) =>
    isActive ? "btn btn-sm btn-primary" : "btn btn-sm btn-ghost";

  return (
    <div className="h-screen border-l border-primary/30">
      <div className="hidden md:grid grid-cols-3 h-full w-full">
        <aside className="col-span-1 border-r border-primary/30 flex flex-col">
          <div className="p-4 border-b border-primary/20">
            <h2 className="text-lg font-semibold">Calls</h2>
          </div>

          <nav className="p-3">
            <div className="flex flex-col gap-2">
              <NavLink
                to=""
                end
                className={({ isActive }) => `${tabClass({ isActive })} w-full`}
              >
                Recent Calls
              </NavLink>
              <NavLink
                to="missed"
                className={({ isActive }) => `${tabClass({ isActive })} w-full`}
              >
                Missed Calls
              </NavLink>
              <NavLink
                to="scheduled"
                className={({ isActive }) => `${tabClass({ isActive })} w-full`}
              >
                Scheduled Calls
              </NavLink>
            </div>
          </nav>

          <div className="px-4 pb-4 text-sm opacity-70 mt-auto">
            Track your call history and quickly connect with your contacts.
          </div>
        </aside>

        <section className="col-span-2 h-full">
          <Outlet />
        </section>
      </div>

      <div className="md:hidden h-full">
        <div className="flex items-center gap-2 p-3 border-b border-primary/20">
          <button
            type="button"
            onClick={() => navigate("/conversation/chat")}
            className="btn btn-ghost btn-sm"
          >
            <ArrowLeft size={18} />
          </button>
          <h2 className="font-semibold">Calls</h2>
        </div>

        <div className="px-3 py-2 border-b border-primary/20">
          <div className="flex items-center gap-2 overflow-x-auto">
            <NavLink to="" end className={tabClass}>
              Recent
            </NavLink>
            <NavLink to="missed" className={tabClass}>
              Missed
            </NavLink>
            <NavLink to="scheduled" className={tabClass}>
              Scheduled
            </NavLink>
          </div>
        </div>

        <Outlet />
      </div>
    </div>
  );
};

export default CallsLayout;
