import React from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";

const Community = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen bg-white">
      <div className="md:hidden flex items-center gap-2 p-3 border-b border-gray-200">
        <button
          type="button"
          onClick={() => navigate("/conversation/chat")}
          className="btn btn-ghost btn-sm"
        >
          <ArrowLeft size={18} />
        </button>
        <h2 className="font-semibold text-gray-800">Community</h2>
      </div>

      <div className="p-4">
        <h2>Here we will implement the community section part.</h2>
      </div>
    </div>
  );
};

export default Community;
