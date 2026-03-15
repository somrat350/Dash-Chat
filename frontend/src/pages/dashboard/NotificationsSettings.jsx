import { BellRing, Settings,  Volume2 } from "lucide-react";
import { useState } from "react";
import Breadcrumb from "../../components/dashboard/Breadcrumb";

const NotificationSettings = () => {
  const [sound, setSound] = useState(true);
  const [browserNotification, setBrowserNotification] = useState(false);

  const pageFlow = [
  {
    label: "Settings",
    link: "/dashboard/settings",
    icon: <Settings size={16}></Settings>,
  },
  {
    label: "Notification",
    link: "/dashboard/settings/notifications",
    icon: <BellRing size={16} />,
  },
];

  return (
    <div className="w-full space-y-8 ">
      <Breadcrumb items={pageFlow} />

      {/* Title */}
      {/* <div>
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          <BellRing size={22} />
          Notifications
        </h2>
        <p className="text-sm text-gray-500">
          Control how you receive notifications from the chat application.
        </p>
      </div> */}

      {/* Card */}
      <div className=" mt-10 dark:bg-zinc-900 border rounded-xl p-6 space-y-10">

        {/* Sound */}
        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">
            <Volume2 className="text-gray-500" />

            <div>
              <p className="font-medium">Message Sound</p>
              <p className="text-sm text-gray-500">
                Play a sound when a new message arrives.
              </p>
            </div>
          </div>

          <label className="cursor-pointer">
            <input
              type="checkbox"
              checked={sound}
              onChange={() => setSound(!sound)}
              className="toggle toggle-primary"
            />
          </label>

        </div>

        {/* Browser Notification */}
        <div className=" flex items-center justify-between ">

          <div className="flex items-center gap-3">
            <BellRing className="text-gray-500" />

            <div>
              <p className="font-medium">Browser Notifications</p>
              <p className="text-sm text-gray-500">
                Receive desktop notifications even when the app is in background.
              </p>
            </div>
          </div>

          <label className="cursor-pointer">
            <input
              type="checkbox"
              checked={browserNotification}
              onChange={() => setBrowserNotification(!browserNotification)}
              className="toggle toggle-primary"
            />
          </label>

        </div>

      </div>

    </div>
  );
};

export default NotificationSettings;
