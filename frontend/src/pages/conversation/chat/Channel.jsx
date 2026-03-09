import React, { useState } from "react";
import { Radio, Plus, Search, LayoutDashboard, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";

const Channel = () => {
  const navigate = useNavigate();

  const initialChannels = [
    { id: 1, name: "FSD Freelance Help", update: "2:00 PM" },
    { id: 2, name: "Web Development Tips", update: "1:30 PM" },
  ];

  const [searchTerm, setSearchTerm] = useState("");

  const filteredChannels = initialChannels.filter((channel) =>
    channel.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="flex flex-col md:flex-row h-screen w-full bg-white overflow-hidden">
      <div className="md:hidden flex items-center gap-2 p-3 border-b border-gray-200">
        <button
          type="button"
          onClick={() => navigate("/conversation/chat")}
          className="btn btn-ghost btn-sm"
        >
          <ArrowLeft size={18} />
        </button>
        <h2 className="font-semibold text-gray-800">Channels</h2>
      </div>

      {/* lift side */}
      <div className="w-full md:w-1/3 min-w-[300px] border-r border-gray-200 flex flex-col h-full bg-white">
        <div className="p-4 flex justify-between items-center shrink-0">
          <h1 className="text-xl font-bold text-gray-800">Channels</h1>
          <Plus size={20} className="cursor-pointer text-gray-600" />
        </div>

        {/*search */}
        <div className="px-4 mb-2 shrink-0">
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3 top-2.5 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search channels..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-100 py-2 pl-10 pr-4 rounded-lg text-sm focus:outline-none"
            />
          </div>
        </div>

        {/* Channels list */}
        <div className="overflow-y-auto flex-grow custom-scrollbar px-2 pb-6">
          {/* list*/}
          <div className="mb-6">
            {filteredChannels.length > 0 ? (
              filteredChannels.map((channel) => (
                <div
                  key={channel.id}
                  className="flex items-center p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-50"
                >
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-3 shrink-0">
                    <Radio size={24} className="text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-gray-800">
                      {channel.name}
                    </p>
                    <p className="text-xs text-gray-400">
                      Last update: {channel.update}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-10 text-center text-gray-500 text-sm">
                No channels found
              </div>
            )}
          </div>

          {/* button  */}
          <div className="flex flex-col items-center gap-3 pt-4 border-t border-gray-50">
            <button className="flex items-center justify-center gap-2 w-full max-w-[280px] py-3 text-[#00a884] border border-[#00a884] rounded-full font-bold hover:bg-green-50 transition-all text-sm shadow-sm active:scale-95">
              <LayoutDashboard size={18} />
              <span>Discover</span>
            </button>
            <button className="flex items-center justify-center gap-2 w-full max-w-[280px] py-3 text-[#00a884] border border-[#00a884] rounded-full font-bold hover:bg-green-50 transition-all text-sm active:scale-95">
              <Radio size={18} />
              <span>Create Channel</span>
            </button>
          </div>
        </div>
      </div>

      {/* right side */}
      <div className="hidden md:flex flex-1 bg-gray-50 flex-col items-center justify-center text-center p-10 overflow-y-auto">
        <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mb-4 shrink-0 shadow-inner">
          <Radio size={40} className="text-gray-400" />
        </div>
        <h2 className="text-2xl font-semibold text-gray-700">
          Discover channels
        </h2>
        <p className="text-gray-500 mt-2 max-w-sm text-sm md:text-base leading-relaxed">
          Entertainment, sports, news, lifestyle, and more. Follow the channels
          that interest you.
        </p>
        <button className="mt-6 bg-[#00a884] hover:bg-[#06cf9c] text-white px-8 py-2.5 rounded-full font-bold transition-all shadow-md active:scale-95">
          Discover more
        </button>
      </div>
    </div>
  );
};

export default Channel;
