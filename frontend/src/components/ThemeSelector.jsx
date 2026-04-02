import { Check, Sparkles } from "lucide-react";
import { useThemeStore } from "../store/useThemeStore";
import { THEMES } from "../constants/constants";

const ThemeSelector = ({ place = "navbar" }) => {
  const { theme, setTheme } = useThemeStore();
  const activeTheme = THEMES.find((themeOption) => themeOption.name === theme);
  const activePreview = activeTheme?.colors?.slice(0, 3) || [];

  return (
    <div
      className={`dropdown ${place === "navbar" ? "dropdown-end" : "dropdown-start"}  `}
    >
      {/* DROPDOWN TRIGGER */}
      {place === "navbar" ? (
        <button
          tabIndex={0}
          className="btn btn-ghost btn-circle border border-base-300/70 bg-base-100/70 backdrop-blur-sm hover:border-primary/50"
          aria-label="Open theme selector"
        >
          <div className="dropdown relative">
            <Sparkles className="size-4 text-primary" />
            <span className="absolute -right-3 -bottom-2 flex gap-0.5">
              {activePreview.map((color) => (
                <span
                  key={color}
                  className="size-1.5 rounded-full border border-base-100"
                  style={{ backgroundColor: color }}
                />
              ))}
            </span>
          </div>
        </button>
      ) : (
        <button
          tabIndex={0}
          className="btn btn-ghost bg-base-100 border border-slate-500"
        >
          Theme Switcher
          <Sparkles className="size-5" />
        </button>
      )}

      <div
        tabIndex={0}
        className={`dropdown-content ${place === "navbar" ? "dropdown-end" : "dropdown-start"}
        absolute mt-2 p-1 shadow-2xl bg-base-200 backdrop-blur-lg rounded-2xl
        w-60 border border-base-content/10 max-h-80 overflow-y-auto`}
      >
        <div className="space-y-1">
          {THEMES.map((themeOption) => (
            <button
              key={themeOption.name}
              className={`
              w-full px-4 py-3 rounded-xl flex items-center gap-3 transition-colors cursor-pointer
              ${
                theme === themeOption.name
                  ? "bg-primary/20 text-primary"
                  : "hover:bg-base-content/5"
              }
            `}
              onClick={() => setTheme(themeOption.name)}
            >
              {theme === themeOption.name ? (
                <Check className="size-4 text-primary" />
              ) : (
                <Sparkles className="size-4 text-base-content/60" />
              )}
              <span className="text-sm font-medium">{themeOption.label}</span>
              {/* THEME PREVIEW COLORS */}
              <div className="ml-auto flex gap-1">
                {themeOption.colors.map((color, i) => (
                  <span
                    key={i}
                    className="size-2 rounded-full"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
export default ThemeSelector;
