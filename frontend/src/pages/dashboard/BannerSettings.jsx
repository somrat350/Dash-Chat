import { useState } from "react";
import SettingsLayout from "../../layout/SettingLayout";
import { useNavigate } from "react-router";
import { MoveLeft } from "lucide-react";


export default function BannerSettings() {
    const navigate = useNavigate();

  const [selected, setSelected] = useState("Always");

  const options = [
    "Always",
    "When app is open",
    "Never"
  ];

  return (
    <SettingsLayout>

      <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
         <MoveLeft 
         className="cursor-pointer"
        onClick={() => navigate("/Dashboard/notifications")} 
        />
        Show notification banner
        
      </h2>

      {options.map((item) => (

        <div
          key={item}
          onClick={() => setSelected(item)}
          className="flex justify-between items-center border-b py-4 cursor-pointer"
        >

          <p>{item}</p>

          <div
            className={`w-5 h-5 rounded-full border flex items-center justify-center ${
              selected === item
                ? "border-green-500"
                : "border-gray-400"
            }`}
          >
            {selected === item && (
              <div className="w-3 h-3 bg-green-500 rounded-full"/>
            )}
          </div>

        </div>

      ))}

    </SettingsLayout>
  );
}