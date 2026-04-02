import { BellRing, Settings, Volume2 } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import Breadcrumb from "../../components/dashboard/Breadcrumb";
import { useMessageStore } from "../../store/useMessageStore";

const NotificationSettings = () => {
  // Load saved settings or default
  const savedSettings = JSON.parse(
    localStorage.getItem("notificationSettings"),
  ) || {
    sound: true,
    browserNotification: false,
    enterToSend: false, // new toggle
  };

  const [sound, setSound] = useState(savedSettings.sound);
  const [browserNotification, setBrowserNotification] = useState(savedSettings.browserNotification);
  const [enterToSend, setEnterToSend] = useState(savedSettings.enterToSend);

  // Save to localStorage whenever toggles change
  useEffect(() => {
    localStorage.setItem(
      "notificationSettings",
      JSON.stringify({ sound, browserNotification, enterToSend })
    );
  }, [sound, browserNotification, enterToSend]);

  // Audio ref
  const messageSound = useRef(null);
  useEffect(() => {
    messageSound.current = new Audio("/sounds/notification.mp3");
  }, []);

  const playSound = () => {
     console.log("Playing sound...");
    if (!sound || !messageSound.current) return;
    messageSound.current.currentTime = 0;
    messageSound.current
      .play()
      .catch((err) => console.log("Audio blocked:", err));
  };

  const showDesktopNotification = (message) => {
    if (!browserNotification || !("Notification" in window)) return;

    const notify = () => {
      new Notification("New Message", {
        body: message.text || "You received a new message",
        icon: "/favicon.ico",
      });
    };

    if (Notification.permission === "granted") {
      notify();
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") notify();
      });
    }
  };

  // Messages from store
  const { messages } = useMessageStore();
  const lastMessageRef = useRef(null);

  // Trigger sound + desktop notification only for new messages
  useEffect(() => {
    if (messages.length === 0) return;
    const lastMessage = messages[messages.length - 1];

    if (lastMessage !== lastMessageRef.current) {
      lastMessageRef.current = lastMessage;

      if (sound) playSound();
      if (browserNotification) showDesktopNotification(lastMessage);
    }
  }, [messages, sound, browserNotification]);

  // Breadcrumb
  const pageFlow = [
    {
      label: "Settings",
      link: "/dashboard/settings",
      icon: <Settings size={16} />,
    },
    {
      label: "Notification",
      link: "/dashboard/notifications",
      icon: <BellRing size={16} />,
    },
  ];

  // Browser notification toggle with permission handling
  const toggleBrowserNotification = () => {
    if (!browserNotification && Notification.permission !== "granted") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") setBrowserNotification(true);
      });
    } else {
      setBrowserNotification(!browserNotification);
    }
  };

  return (
    <div className="w-full space-y-8">
      <Breadcrumb items={pageFlow} />

      <div className="mt-10 dark:bg-zinc-900 border rounded-xl p-6 space-y-10">
        {/* Message Sound */}
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
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BellRing className="text-gray-500" />
            <div>
              <p className="font-medium">Browser Notifications</p>
              <p className="text-sm text-gray-500">
                Receive desktop notifications even when the app is in
                background.
              </p>
            </div>
          </div>
          <label className="cursor-pointer">
            <input
              type="checkbox"
              checked={browserNotification}
              onChange={toggleBrowserNotification}
              className="toggle toggle-primary"
            />
          </label>
        </div>

        {/* Enter to Send */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <i className="text-gray-500">⌨️</i>
            <div>
              <p className="font-medium">Enter to Send</p>
              <p className="text-sm text-gray-500">
                Press Enter to send a message. Shift + Enter for a new line.
              </p>
            </div>
          </div>
          <label className="cursor-pointer">
            <input
              type="checkbox"
              checked={enterToSend}
              onChange={() => setEnterToSend(!enterToSend)}
              className="toggle toggle-primary"
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;
