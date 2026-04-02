import { Settings, Settings2 } from "lucide-react";

const SettingsDefault = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-center">
      <Settings2 size={40} className="opacity-60 mb-3" />

      <h2 className="text-xl font-semibold">
        Select an option from the left menu
      </h2>

      <p className="text-gray-500 text-sm">Your settings will appear here</p>
    </div>
  );
};

export default SettingsDefault;
