import { Settings, SunMoon } from "lucide-react";
import { useState, useEffect } from "react";
import { FaMobileButton } from "react-icons/fa6";
import ThemeSelector from "../../components/ThemeSelector";
import Breadcrumb from "../../components/dashboard/Breadcrumb";
import { useAppearanceStore } from "../../../../backend/src/controllers/useAppearanceStore";

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

// Default settings with empty color/image (normal background)
const defaultSettings = {
  chatBgColor: "",
  chatBgImage: "",
  overlayOpacity: 0.3,
  fontSize: "medium",
  fontFamily: "Inter",
  enterToSend: true,
  autoDownload: false,
  language: "English",
};

const AppearanceSettings = () => {
  const { setBackground } = useAppearanceStore();
  useEffect(() => loadGoogleFonts(), []);

  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem("chatSettings");
    return saved ? JSON.parse(saved) : defaultSettings;
  });

  const handleChange = (key, value) => {
    setSettings((prev) => {
      const updated = { ...prev, [key]: value };

      
      setBackground(updated);

      return updated;
    });
  };

  const handleBgImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      handleChange("chatBgImage", reader.result);
    };
    reader.readAsDataURL(file);
  };

  const saveSettings = () => {
    localStorage.setItem("chatSettings", JSON.stringify(settings));
    alert("Settings saved!");
  };

  // Apply body & preview background
  // useEffect(() => {
  //   const body = document.body;

  //   // Apply color only if user selected
  //   if (settings.chatBgColor) body.style.backgroundColor = settings.chatBgColor;
  //   else body.style.backgroundColor = ""; // normal default

  //   // Apply image only if user selected
  //   if (settings.chatBgImage) {
  //     body.style.backgroundImage = `linear-gradient(rgba(0,0,0,${settings.overlayOpacity}), rgba(0,0,0,${settings.overlayOpacity})), url(${settings.chatBgImage})`;
  //     body.style.backgroundSize = "cover";
  //     body.style.backgroundPosition = "center";
  //   } else body.style.backgroundImage = "none";

  //   document.documentElement.style.fontSize =
  //     settings.fontSize === "small" ? "14px" :
  //     settings.fontSize === "medium" ? "16px" : "18px";
  //   body.style.fontFamily = `${settings.fontFamily}, sans-serif`;

  //   // Preview box
  //   const preview = document.getElementById("chatPreview");
  //   if (preview) {
  //     preview.style.backgroundColor = settings.chatBgColor || ""; // default if empty
  //     if (settings.chatBgImage) {
  //       preview.style.backgroundImage = `linear-gradient(rgba(0,0,0,${settings.overlayOpacity}), rgba(0,0,0,${settings.overlayOpacity})), url(${settings.chatBgImage})`;
  //       preview.style.backgroundSize = "cover";
  //       preview.style.backgroundPosition = "center";
  //     } else preview.style.backgroundImage = "none";
  //   }
  // }, [settings]);

  // font size
  useEffect(() => {
    const html = document.documentElement; // root element
    if (settings.fontSize === "small") html.style.fontSize = "14px";
    else if (settings.fontSize === "medium") html.style.fontSize = "16px";
    else html.style.fontSize = "18px";
  }, [settings.fontSize]);

  // font family
  useEffect(() => {
    document.body.style.fontFamily = `${settings.fontFamily}, sans-serif`;
  }, [settings.fontFamily]);

  // Language demo
  useEffect(() => {
    const langElement = document.getElementById("example-language-text");
    if (!langElement) return;
    if (settings.language === "Bangla")
      langElement.textContent = "হ্যালো, আপনি বাংলা ভাষা নির্বাচন করেছেন!";
    else if (settings.language === "Hindi")
      langElement.textContent = "नमस्ते, आपने हिंदी भाषा चुनी है!";
    else langElement.textContent = "Hello, you selected English!";
  }, [settings.language]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && settings.enterToSend) {
      e.preventDefault();
      console.log("Message Sent:", e.target.value);
      e.target.value = "";
    }
  };

  return (
    <div className="w-full px-3 sm:px-6 lg:px-8 py-6">
      <Breadcrumb items={pageFlow} />

      <div className="w-full mx-auto bg-base-200 p-4 sm:p-6 lg:p-8 rounded-xl shadow-lg space-y-8">
        {/* ---------- Theme Selector ---------- */}
        <section>
          <h2 className="text-lg sm:text-xl font-semibold mb-2">
            Theme Selector
          </h2>
          <ThemeSelector />
        </section>

        {/* ---------- Chat Background ---------- */}
        <section className="space-y-4">
          <h2 className="text-lg sm:text-xl font-semibold">Chat Background</h2>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <input
              type="color"
              value={settings.chatBgColor}
              onChange={(e) => handleChange("chatBgColor", e.target.value)}
              className="w-16 h-10 border rounded cursor-pointer shrink-0"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleBgImage}
              className="border p-2 rounded cursor-pointer w-full sm:w-auto"
            />
          </div>

          {/* Remove Image */}
          {settings.chatBgImage && (
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-2">
              <span className="text-sm text-gray-500">Selected Image:</span>
              <button
                onClick={() => handleChange("chatBgImage", "")}
                className="btn btn-sm btn-warning w-full sm:w-auto"
              >
                Remove Image
              </button>
            </div>
          )}

          {/* Overlay Opacity */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-2">
            <label className="shrink-0">Overlay Opacity:</label>
            <input
              type="range"
              min="0"
              max="0.7"
              step="0.05"
              value={settings.overlayOpacity}
              onChange={(e) =>
                handleChange("overlayOpacity", parseFloat(e.target.value))
              }
              className="flex-1"
            />
            <span className="shrink-0">{settings.overlayOpacity}</span>
          </div>

          {/* Preview Box */}
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
                  checked={settings.fontSize === size}
                  onChange={(e) => handleChange("fontSize", e.target.value)}
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
            value={settings.fontFamily}
            onChange={(e) => handleChange("fontFamily", e.target.value)}
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
            checked={settings.enterToSend}
            onChange={() => handleChange("enterToSend", !settings.enterToSend)}
          />
        </section>

        {/* Media Auto Download */}
        <section className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold">
              Media Auto Download
            </h2>
            <p className="text-gray-400 text-sm">
              Automatically download incoming media.
            </p>
          </div>
          <input
            type="checkbox"
            className="toggle toggle-primary"
            checked={settings.autoDownload}
            onChange={() =>
              handleChange("autoDownload", !settings.autoDownload)
            }
          />
        </section>

        {/* Language */}
        {/* <section>
      <h2 className="text-lg sm:text-xl font-semibold mb-2">Language</h2>
      <select
        value={settings.language}
        onChange={e => handleChange("language", e.target.value)}
        className="select select-bordered w-full sm:max-w-xs mb-2"
      >
        {["English","Bangla","Hindi"].map(lang => <option key={lang}>{lang}</option>)}
      </select>
      <p id="example-language-text" className="text-gray-400"></p>
    </section> */}

        {/* Save Button */}
        <div className="text-center">
          <FaMobileButton
            onClick={saveSettings}
            className="btn btn-primary mt-4 text-xl sm:text-base"
          >
            Save Settings
          </FaMobileButton>
        </div>

        {/* Example Chat Input */}
        <div>
          <textarea
            placeholder="Type message here..."
            className="textarea textarea-bordered w-full"
            onKeyUp={handleKeyPress}
          />
        </div>
      </div>
    </div>
  );
};

export default AppearanceSettings;
