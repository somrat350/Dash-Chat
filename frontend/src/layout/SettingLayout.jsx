import { Settings } from "lucide-react";

export default function SettingsLayout({ children }) {
  return (
    <div className="flex h-screen">

      {/* LEFT SIDE */}
      <div className="w-[420px] bg-[#f7f7f7] p-6 border-r overflow-y-auto">
        {children}
      </div>

      {/* RIGHT SIDE */}
      <div className="flex-1 flex items-center justify-center bg-[#efeae2]">

        <div className="text-center">
          <Settings size={60} className="mx-auto text-gray-400 mb-4" />
          <h2 className="text-3xl font-medium text-gray-700">
            Settings
          </h2>
        </div>

      </div>

    </div>
  );
}