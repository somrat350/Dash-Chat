export default function EmptyChatState() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center bg-linear-to-br from-slate-50 to-slate-200">
      {/* Icon */}
      <div className="bg-white shadow-lg rounded-2xl p-6 animate-bounce">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-12 h-12 text-blue-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.8}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8 10h8M8 14h5m9 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>

      {/* Title */}
      <h2 className="text-2xl font-semibold mt-6">Select a conversation</h2>

      {/* Description */}
      <p className="text-gray-800 mt-2 max-w-md">
        Choose a contact from the sidebar to start chatting or continue your
        previous conversation.
      </p>
    </div>
  );
}
