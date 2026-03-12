import { ChevronRight, MoveLeft } from "lucide-react";
import { useNavigate } from "react-router";
import SettingsLayout from "../../layout/SettingLayout";
import { useState } from "react";

export default function Notifications() {
  const navigate = useNavigate();

  const [toggles, setToggles] = useState({
    message: true,
    preview: true,
    reaction: true,
    status: true,
    call: true,
  });

  const toggle = (key) => {
    setToggles({ ...toggles, [key]: !toggles[key] });
  };

  return (
    <SettingsLayout>
      <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
        <MoveLeft 
         className="cursor-pointer"
        onClick={() => navigate("/Dashboard/settings")} 
        />
        Notifications
      </h2>

      {/* Banner */}
      <div
        onClick={() => navigate("/banner-settings")}
        className="flex justify-between items-center border-b py-4 cursor-pointer"
      >
        <div>
          <p>Show notification banner</p>
          <p className="text-gray-500 text-sm">Always</p>
        </div>

        <ChevronRight />
      </div>

      {/* Badge */}
      <div
        onClick={() => navigate("/badge-settings")}
        className="flex justify-between items-center border-b py-4 cursor-pointer"
      >
        <div>
          <p>Show taskbar notification badge</p>
          <p className="text-gray-500 text-sm">Always</p>
        </div>

        <ChevronRight />
      </div>

      {/* Messages */}
      <p className="text-gray-500 text-sm mt-6 mb-2">Messages</p>

      <Toggle
        title="Message notifications"
        subtitle="Show notifications for new messages"
        value={toggles.message}
        onChange={() => toggle("message")}
      />

      <Toggle
        title="Show previews"
        value={toggles.preview}
        onChange={() => toggle("preview")}
      />

      <Toggle
        title="Show reaction notifications"
        value={toggles.reaction}
        onChange={() => toggle("reaction")}
      />

      <Toggle
        title="Status reactions"
        subtitle="Show notifications when you get likes on a status"
        value={toggles.status}
        onChange={() => toggle("status")}
      />

      {/* Calls */}
      <p className="text-gray-500 text-sm mt-6 mb-2">Calls</p>

      <Toggle
        title="Call notifications"
        subtitle="Show notifications for incoming calls"
        value={toggles.call}
        onChange={() => toggle("call")}
      />
    </SettingsLayout>
  );
}

function Toggle({ title, subtitle, value, onChange }) {
  return (
    <div className="flex justify-between items-center py-4 border-b">
      <div>
        <p className="text-[15px]">{title}</p>

        {subtitle && <p className="text-gray-500 text-sm">{subtitle}</p>}
      </div>

      <button
        onClick={onChange}
        className={`w-11 h-6 flex items-center rounded-full p-1 ${
          value ? "bg-green-500" : "bg-gray-300"
        }`}
      >
        <div
          className={`bg-white w-4 h-4 rounded-full transform ${
            value ? "translate-x-5" : ""
          }`}
        />
      </button>
    </div>
  );
}
