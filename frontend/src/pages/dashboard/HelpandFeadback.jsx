
import SettingsLayout from "../../layout/SettingLayout";
import { useNavigate } from "react-router";
import {  MoveLeft, MoveLeftIcon } from "lucide-react";


export default function HelpandFeadback() {
    const navigate = useNavigate();



  return (
    <SettingsLayout>

      <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
        <MoveLeftIcon 
         className="cursor-pointer"
        onClick={() => navigate("/Dashboard/settings")} 
        />
       Help and feedback
      </h2>
      {/* help center */}
        <div
        onClick={() => navigate("")}
        className="flex justify-between items-center  py-4 cursor-pointer"
      >
        <div>
          <p>Help Center</p>
          <p className="text-gray-500 text-sm">Frequently ask question</p>
        </div>

       
      </div>

      {/* contacus*/}
      <div
        onClick={() => navigate("")}
        className="flex justify-between items-center  py-4 cursor-pointer"
      >
        <div>
          <p>Contac Us</p>
          <p className="text-gray-500 text-sm">Chat with support to get answers</p>
        </div>

       
      </div>
       {/* sendFeedback*/}
      <div
        onClick={() => navigate("")}
        className="flex justify-between items-center  py-4 cursor-pointer"
      >
        <div>
          <p>Send feedback</p>
          <p className="text-gray-500 text-sm">Technical issues,suggestion</p>
        </div>

       
      </div>
       {/* sendFeedback*/}
      <div
        onClick={() => navigate("")}
        className="flex justify-between items-center  py-4 cursor-pointer"
      >
        <div>
          <p>Terms and Privecy Policy</p>
          
        </div>

       
      </div>

      {/* {options.map((item) => (

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

      ))} */}

    </SettingsLayout>
  );
}