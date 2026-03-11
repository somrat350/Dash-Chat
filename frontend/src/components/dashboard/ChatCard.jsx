import { MessagesSquare } from "lucide-react";

const ChatCard = () => {
  return (
    <>
      <div className="card bg-base-200 shadow-xl border border-white/5 hover:border-primary transition-all duration-300">
        <div className="card-body p-5">
          <div className="flex items-center gap-4">
            <div className="avatar relative">
              <div className="w-14 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img
                  src="https://i.pravatar.cc/150?u=fake@pravatar.com"
                  alt="User"
                />
              </div>
              <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-base-200 bg-success"></span>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="card-title text-sm font-bold truncate">
                  Md Osamabin Somrat
                </h2>
                <div className="badge badge-primary badge-outline badge-xs">
                  Friend
                </div>
              </div>
              <p className="text-xs text-gray-400 truncate">
                Last: Hey, how are you doing?
              </p>
              <span className="text-[10px] opacity-50">
                Last seen: 2 mins ago
              </span>
            </div>
          </div>

          <div className="card-actions pt-4 border-t border-white/5 gap-2 mt-6">
            <button className="btn btn-primary flex-1 btn-circle btn-sm md:btn-md gap-2">
              <MessagesSquare size={18} />
              Messages
            </button>

            <button className="btn btn-outline btn-primary btn-circle btn-sm md:btn-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatCard;
