import { Settings, SunMoon } from "lucide-react";
import { useEffect } from "react";
import { FaMobileButton } from "react-icons/fa6";
import ThemeSelector from "../../components/ThemeSelector";
import Breadcrumb from "../../components/dashboard/Breadcrumb";
import { useAppearanceStore } from "../../store/useAppearanceStore";



// Load Google Fonts
const loadGoogleFonts = () => {
  const link = document.createElement("link");
  link.href =
    "https://fonts.googleapis.com/css2?family=Inter&family=Poppins&family=Roboto&family=Open+Sans&display=swap";
  link.rel = "stylesheet";
  document.head.appendChild(link);
};

const pageFlow = [
  {
    label: "Settings",
    link: "/dashboard/settings",
    icon: <Settings size={16} />,
  },
  {
    label: "Appearance/Theme",
    link: "/dashboard/settings/appearance",
    icon: <SunMoon size={16} />,
  },
];

const AppearanceSettings = () => {
  //  All settings directly from store
  const {
    chatBgColor,
    chatBgImage,
    overlayOpacity,
    fontSize,
    fontFamily,
    enterToSend,
    autoDownload,
    setBackground,
    setEnterToSend,
    saveSettings,
    loadSettings,
  } = useAppearanceStore();


  useEffect(() => {
    loadGoogleFonts();
    loadSettings(); // load saved settings from localStorage
  }, []);

  const handleBgColorChange = (color) => setBackground({ chatBgColor: color });
  const handleBgImageChange = (image) => setBackground({ chatBgImage: image });
  const handleOverlayChange = (opacity) => setBackground({ overlayOpacity: opacity });
  const handleFontSizeChange = (size) => setBackground({ fontSize: size });
  const handleFontFamilyChange = (family) => setBackground({ fontFamily: family });
  const handleAutoDownloadChange = (value) => setBackground({ autoDownload: value });

  // Apply font size & family immediately
  useEffect(() => {
    const html = document.documentElement;
    if (fontSize === "small") html.style.fontSize = "14px";
    else if (fontSize === "medium") html.style.fontSize = "16px";
    else html.style.fontSize = "18px";

    document.body.style.fontFamily = `${fontFamily}, sans-serif`;
  }, [fontSize, fontFamily]);

  // Handle file upload for background
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => handleBgImageChange(reader.result);
    reader.readAsDataURL(file);
  };

  return (
    <div className="w-full px-3 sm:px-6 lg:px-8 py-6">
      <Breadcrumb items={pageFlow} />

      <div className="w-full mx-auto bg-base-200 p-4 sm:p-6 lg:p-8 rounded-xl shadow-lg space-y-8">
        {/* ---------- Theme Selector ---------- */}
        <section>
          <h2 className="text-lg sm:text-xl font-semibold mb-2">Theme Selector</h2>
          <ThemeSelector place="settings" />
        </section>

        {/* ---------- Chat Background ---------- */}
        <section className="space-y-4">
          <h2 className="text-lg sm:text-xl font-semibold">Chat Background</h2>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <input
              type="color"
              value={chatBgColor}
              onChange={(e) => handleBgColorChange(e.target.value)}
              className="w-16 h-10 border rounded cursor-pointer shrink-0"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="border p-2 rounded cursor-pointer w-full sm:w-auto"
            />
          </div>

          {chatBgImage && (
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-2">
              <span className="text-sm text-gray-500">Selected Image:</span>
              <button
                onClick={() => handleBgImageChange("")}
                className="btn btn-sm btn-warning w-full sm:w-auto"
              >
                Remove Image
              </button>
            </div>
          )}

          <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-2">
            <label className="shrink-0">Overlay Opacity:</label>
            <input
              type="range"
              min="0"
              max="0.7"
              step="0.05"
              value={overlayOpacity}
              onChange={(e) => handleOverlayChange(parseFloat(e.target.value))}
              className="flex-1"
            />
            <span className="shrink-0">{overlayOpacity}</span>
          </div>

          <div
            id="chatPreview"
            className="relative w-full h-48 sm:h-56 rounded border overflow-hidden flex items-end p-4 text-white"
          >
            <p>Chat preview text...</p>
          </div>
        </section>

        {/* Font Size */}
        <section>
          <h2 className="text-lg sm:text-xl font-semibold mb-2">Font Size</h2>
          <div className="flex flex-wrap gap-4">
            {["small", "medium", "large"].map((size) => (
              <label key={size} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="fontSize"
                  value={size}
                  checked={fontSize === size}
                  onChange={() => handleFontSizeChange(size)}
                  className="radio"
                />
                {size.charAt(0).toUpperCase() + size.slice(1)}
              </label>
            ))}
          </div>
        </section>

        {/* Font Family */}
        <section>
          <h2 className="text-lg sm:text-xl font-semibold mb-2">Font Family</h2>
          <select
            value={fontFamily}
            onChange={(e) => handleFontFamilyChange(e.target.value)}
            className="select select-bordered w-full sm:max-w-xs"
          >
            {["Inter", "Poppins", "Roboto", "Open Sans"].map((f) => (
              <option key={f}>{f}</option>
            ))}
          </select>
        </section>

        {/* Enter to Send */}
        <section className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold">Enter to Send</h2>
            <p className="text-gray-400 text-sm">
              Press Enter to send message instead of new line.
            </p>
          </div>
          <input
            type="checkbox"
            className="toggle toggle-primary"
            checked={enterToSend}
            onChange={(e) => setEnterToSend(e.target.checked)}
          />
        </section>

        {/* Media Auto Download */}
        <section className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold">Media Auto Download</h2>
            <p className="text-gray-400 text-sm">
              Automatically download incoming media.
            </p>
          </div>
          <input
            type="checkbox"
            className="toggle toggle-primary"
            checked={autoDownload}
            onChange={() => handleAutoDownloadChange(!autoDownload)}
          />


        </section>

        {/* Save Button */}
        <div className="text-center">
          <FaMobileButton
            onClick={saveSettings}
            className="btn btn-primary mt-4 text-xl sm:text-base"
          >
            Save Settings
          </FaMobileButton>
        </div>


      </div>

    </div>
  );
};


export default AppearanceSettings;
