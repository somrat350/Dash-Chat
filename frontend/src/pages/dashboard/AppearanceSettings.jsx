
import { FileInput, Settings, SunMoon} from "lucide-react";
import { useState } from "react";
import { FaMobileButton } from "react-icons/fa6";
import ThemeSelector from "../../components/ThemeSelector";
import Breadcrumb from "../../components/dashboard/Breadcrumb";

const pageFlow = [
  {
    label: "Settings",
    link: "/dashboard/settings",
    icon: <Settings size={16}></Settings>,
  },
  {
    label: "Appearance/Theme",
    link: "/dashboard/settings/appearance",
    icon: <SunMoon size={16} />,
  },
];

const AppearanceSettings = () => {
 
  const [chatBg, setChatBg] = useState("#f0f0f0");
  const [fontSize, setFontSize] = useState("medium");
  const [fontFamily, setFontFamily] = useState("Inter");
  const [enterToSend, setEnterToSend] = useState(true);
  const [autoDownload, setAutoDownload] = useState(false);
  const [language, setLanguage] = useState("English");

 
  const handleBgChange = (e) => setChatBg(e.target.value);
  const handleFontSizeChange = (e) => setFontSize(e.target.value);

  const saveSettings = () => {
   
  };

  return (
    <div className="w-full">
      <Breadcrumb items={pageFlow} />
      <div className="max-w-2xl mx-auto bg-base-100 p-8 rounded-xl shadow-lg">

         {/* Theme Switcher */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Theme Switcher</h2>
          <p className="text-gray-500 mb-4">
            Choose between Light / Dark or any DaisyUI theme.
          </p>
      
          <ThemeSelector></ThemeSelector>
        </section>

        {/* Chat Background */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Chat Background</h2>
          <p className="text-gray-500 mb-4">
            Set a custom wallpaper or solid color for chat windows.
          </p>
          <div className="flex gap-4 items-center">
            <input
              type="color"
              value={chatBg}
              onChange={handleBgChange}
              className="w-16 h-10 border rounded-lg cursor-pointer"
            />
            <FileInput
              type="text"
              placeholder="Enter background hex code"
              value={chatBg}
              onChange={handleBgChange}
              className="w-full max-w-xs"
            />
          </div>
        </section>

        {/* Font Size */}
        <section className="mt-15">
          <h2 className="text-xl font-semibold mb-2">Font Size</h2>
          <p className="text-gray-500 mb-4">
            Adjust chat text size for better readability.
          </p>
          <div className="flex gap-6">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="fontSize"
                value="small"
                checked={fontSize === "small"}
                onChange={handleFontSizeChange}
                className="radio"
              />
              Small
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="fontSize"
                value="medium"
                checked={fontSize === "medium"}
                onChange={handleFontSizeChange}
                className="radio"
              />
              Medium
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="fontSize"
                value="large"
                checked={fontSize === "large"}
                onChange={handleFontSizeChange}
                className="radio"
              />
              Large
            </label>
          </div>
        </section>
        {/* Font Family */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold mt-10">Font Family</h2>

          <select
            className="select select-bordered w-full mb-10 max-w-xs"
            value={fontFamily}
            onChange={(e) => setFontFamily(e.target.value)}
          >
            <option>Inter</option>
            <option>Poppins</option>
            <option>Roboto</option>
            <option>Open Sans</option>
          </select>
        </section>

        {/* Enter to Send */}
        <section className="space-y-3">
          <div className="flex justify-between items-center">
            <div className="mt-3">
              <h2 className="text-xl mt-3 font-semibold">Enter to Send</h2>
              <p className="text-sm mb-8 text-gray-500">
                Press Enter to send message instead of creating a new line.
              </p>
            </div>

            <input
              type="checkbox"
              className="toggle toggle-primary"
              checked={enterToSend}
              onChange={() => setEnterToSend(!enterToSend)}
            />
          </div>
        </section>

        {/* Media Auto Download */}
        <section className="space-y-3">
          <div className="flex  justify-between items-center">
            <div>
              <h2 className="text-xl mt-3 font-semibold">Media Auto Download</h2>
              <p className="text-sm mb-6 text-gray-500">
                Automatically download incoming photos and videos.
              </p>
            </div>

            <input
              type="checkbox"
              className="toggle toggle-primary"
              checked={autoDownload}
              onChange={() => setAutoDownload(!autoDownload)}
            />
          </div>
        </section>

        {/* Message Font Style */}
        <section className="space-y-3">
          <h2 className="text-xl mt-4 font-semibold">Message Font Style</h2>

          <select className="select select-bordered mb-4 w-full max-w-xs">
            <option>Normal</option>
            <option>Serif</option>
            <option>Monospace</option>
          </select>
        </section>

        {/* Language */}
        <section className="space-y-3">
          <h2 className="text-xl f mt-2 font-semibold">Language</h2>

          <select
            className="select select-bordered mb-2 w-full max-w-xs"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option>English</option>
            <option>Bangla</option>
            <option>Hindi</option>
          </select>
        </section>

        <div className="text-center">
          <FaMobileButton
            onClick={saveSettings}
            className="btn btn-primary mt-4"
          >
            Save Settings
          </FaMobileButton>
        </div>
      </div>
    </div>
  );
};

export default AppearanceSettings;
