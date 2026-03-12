import { useState } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import {
  User,
  BellRing,
  KeyboardMusic,
  CircleQuestionMark,
  LogOutIcon,
  Settings2,
  PencilIcon,
  CheckIcon,
  XIcon,
} from "lucide-react";
import { useNavigate } from "react-router";

// ================== Profile Component ==================
const Profile = () => {
  const { authUser, updateUser } = useAuthStore();
  const [editing, setEditing] = useState(false);

  const [profile, setProfile] = useState({
    photoURL: authUser?.photoURL || "",
    name: authUser?.name || "",
    email: authUser?.email || "",
    role: authUser?.role || "User",
    bio: authUser?.bio || "This is your bio",
  });

  const handleSave = () => {
    updateUser({
      photoURL: authUser.photoURL,
      name: authUser.displayName,
      role: profile.role,
      bio: profile.bio,
    });
    setEditing(false);
  };

  return (
    <div className="w-full mx-auto bg-white p-6 shadow rounded-xl space-y-6">
      <div className=" space-y-4">
        {/* <img
          src={profile.photoURL}
          alt="User Photo"
          className="w-20 h-20 rounded-full object-cover"
        /> */}
        <label className="block text-sm font-medium text-gray-600">
          PhotoURL
        </label>
        {editing ? (
          <input
            type="text"
            value={authUser.photoURL}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            className="border p-2 rounded w-full"
          />
        ) : (
          <p className="text-lg font-semibold">{authUser.photoURL}</p>
        )}
        {!editing && (
          <button
            className="ml-auto flex items-center gap-1 text-blue-500"
            onClick={() => setEditing(true)}
          >
            <PencilIcon size={18} /> Edit
          </button>
        )}
      </div>

      <div className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Name
          </label>
          {editing ? (
            <input
              type="text"
              value={authUser.displayName}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              className="border p-2 rounded w-full"
            />
          ) : (
            <p className="text-lg font-semibold">{authUser.displayName}</p>
          )}
        </div>

        {/* Email (cannot edit) */}
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Email
          </label>
          <p className="text-gray-500">{profile.email}</p>
        </div>

        {/* Role */}
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Role
          </label>
          {editing ? (
            <input
              type="text"
              value={profile.role}
              onChange={(e) => setProfile({ ...profile, role: e.target.value })}
              className="border p-2 rounded w-full"
            />
          ) : (
            <p className="text-gray-700">{profile.role}</p>
          )}
        </div>

        {/* Bio */}
        <div>
          <label className="block text-sm font-medium text-gray-600">Bio</label>
          {editing ? (
            <textarea
              value={profile.bio}
              onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
              className="border p-2 rounded w-full"
              rows={3}
            />
          ) : (
            <p className="text-gray-700">{profile.bio}</p>
          )}
        </div>
      </div>

      {/* Save / Cancel Buttons */}
      {editing && (
        <div className="flex gap-2 justify-end">
          <button className="btn btn-sm btn-primary" onClick={handleSave}>
            <CheckIcon size={16} /> Save
          </button>
          <button
            className="btn btn-sm btn-primary"
            onClick={() => setEditing(false)}
          >
            <XIcon size={16} /> Cancel
          </button>
        </div>
      )}
    </div>
  );
};

// ================== Notifications Component ==================
const Notifications = () => {
  // const [email, setEmail] = useState(true);
  // const [push, setPush] = useState(false);

  return (
    <div className="">
      {/* <h2 className="text-2xl font-bold mb-4">Notifications</h2> */}
      {/* <label className="flex justify-between items-center">
        Email Notifications
        <input type="checkbox" checked={email} onChange={() => setEmail(!email)} />
      </label>
      <label className="flex justify-between items-center">
        Push Notifications
        <input type="checkbox" checked={push} onChange={() => setPush(!push)} />
      </label> */}
    </div>
  );
};

// ================== Keyboard Shortcuts Component ==================
const KeyboardShortcuts = () => (
  <div className="max-w-xl mx-auto bg-white p-6 shadow rounded-xl space-y-4">
    <h2 className="text-2xl font-bold mb-4">Keyboard Shortcuts</h2>
    <ul className="list-disc ml-5 space-y-1">
      <li>Ctrl + N → New Chat</li>
      <li>Ctrl + K → Search</li>
      <li>Ctrl + Enter → Send Message</li>
    </ul>
  </div>
);

// ================== Help & Feedback Component ==================
const HelpFeedback = () => (
  <div className="max-w-xl mx-auto bg-white p-6 shadow rounded-xl space-y-4">
    <h2 className="text-2xl font-bold mb-4">Help & Feedback</h2>
    <textarea
      placeholder="Write your feedback..."
      className="border w-full p-3 rounded h-32"
    />
    <button className="bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
  </div>
);

// ================== Main SettingsDashboard ==================

const SettingsDashboard = () => {
  const { logoutUser, authUser } = useAuthStore();
  const [active, setActive] = useState(null);
  const navigate = useNavigate();

  const menu = [
    { name: "Profile", icon: User, component: <Profile /> },
    { name: "Notifications", icon: BellRing, component: <Notifications /> },
    {
      name: "Keyboard Shortcuts",
      icon: KeyboardMusic,
      component: <KeyboardShortcuts />,
    },
    {
      name: "Help & Feedback",
      icon: CircleQuestionMark,
      component: <HelpFeedback />,
    },
  ];

  return (
    <div className="h-full flex bg-base-100">
      {/* Sidebar */}
      <div className="w-[350px] border-r p-5 space-y-4">
        <h2 className="text-xl font-semibold">Settings</h2>

        {/* View Profile */}
        <div
          className={`flex items-center justify-center gap-3 p-3 rounded-xl bg-base-200 cursor-pointer
            ${active === "Profile" ? "ring-2 ring-blue-400" : ""}`}
          onClick={() => setActive("Profile")}
        >
          <img
            src={authUser?.photoURL}
            alt="profile"
            className="w-14 h-14 rounded-full"
          />
          <div>
            <p className="font-semibold">{authUser?.name}</p>
            <p className="text-sm opacity-60">View your profile</p>
          </div>
        </div>

        {/* Menu */}
        <div className="space-y-2 mt-4">
          {menu.map((item) => (
            // Inside menu.map
            <button
              key={item.name}
              className={`flex items-center gap-3 p-3 rounded-lg w-full text-left
    ${active === item.name ? "bg-blue-100 text-blue-600" : "hover:bg-base-200"}`}
              onClick={() => {
                if (item.name === "Notifications") {
                  navigate("/settings/notifications");
                } else {
                  setActive(item.name);
                }
              }}
            >
              <item.icon size={20} />
              <div className="flex flex-col items-start">
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p className="text-sm text-gray-400">
                  {item.name === "Profile"
                    ? "Edit your profile"
                    : item.name === "Notifications"
                      ? "Manage notifications"
                      : item.name === "Keyboard Shortcuts"
                        ? "Quick actions"
                        : "Help center & feedback"}
                </p>
              </div>
            </button>
          ))}

          <button
            className="flex items-center gap-3 rounded-lg hover:bg-red-100 text-red-600 w-full p-3 mt-2"
            onClick={logoutUser}
          >
            <LogOutIcon size={24} />
            <span className="text-lg font-semibold">Logout</span>
          </button>
        </div>
      </div>

      {/* Right Content */}
      <div className="flex-1 p-6">
        {menu.find((item) => item.name === active)?.component || (
          <div className="flex flex-col items-center justify-center h-full opacity-70">
            <Settings2 size={40} className="mb-3" />
            <h2 className="text-xl font-semibold text-center">
              Select an option from the left menu
            </h2>
            <p className="text-sm text-center">
              Your settings will appear here
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsDashboard;
