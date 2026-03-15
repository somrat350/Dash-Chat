import {  Eye, Ban, Lock, Settings,  HatGlasses } from "lucide-react";
import { useState } from "react";
import Breadcrumb from "../../components/dashboard/Breadcrumb";

const PrivacySettings = () => {
  const [lastSeen, setLastSeen] = useState("everyone");

  const blockedUsers = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Alex Smith" },
  ];
  const pageFlow = [
    {
      label: "Settings",
      link: "/dashboard/settings",
      icon: <Settings size={16}></Settings>,
    },
    {
      label: "Privacy and Security",
      link: "/dashboard/settings/privacy",
      icon:<HatGlasses size={16} />,
    },
  ];

  return (
    <div className=" max-w-3xl space-y-8">
      <Breadcrumb items={pageFlow} />

      {/* Page Title */}
      {/* <div>
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          <ShieldCheck size={22} />
          Privacy & Security
        </h2>
        <p className="text-sm text-gray-500">
          Manage your privacy settings and secure your account.
        </p>
      </div> */}

      {/* Last Seen */}
      <div className="mt-10 border rounded-xl p-6  dark:bg-zinc-900">
        <div className="flex items-center gap-2 mb-4">
          <Eye size={18} />
          <h3 className="font-semibold ">Last Seen</h3>
        </div>

        <p className="text-sm text-gray-500 mb-4">
          Control who can see when you were last active.
        </p>

        <select
          value={lastSeen}
          onChange={(e) => setLastSeen(e.target.value)}
          className="border rounded-lg p-2 w-64"
        >
          <option value="everyone">Everyone</option>
          <option value="contacts">Contacts Only</option>
          <option value="nobody">Nobody</option>
        </select>
      </div>

      {/* Blocked Users */}
      <div className="border rounded-xl p-6  dark:bg-zinc-900">
        <div className="flex items-center gap-2 mb-4">
          <Ban size={18} />
          <h3 className="font-semibold">Blocked Users</h3>
        </div>

        <p className="text-sm text-gray-500 mb-4">
          Manage users you have blocked.
        </p>

        <div className="space-y-3">
          {blockedUsers.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between border rounded-lg p-3"
            >
              <span>{user.name}</span>

              <button className="text-red-500 hover:underline">Unblock</button>
            </div>
          ))}
        </div>
      </div>

      {/* Change Password */}
      <div className="border rounded-xl p-6  dark:bg-zinc-900">
        <div className="flex items-center gap-2 mb-4">
          <Lock size={18} />
          <h3 className="font-semibold">Change Password</h3>
        </div>

        <p className="text-sm text-gray-500 mb-4">
          Update your password to keep your account secure.
        </p>

        <div className="space-y-3">
          <input
            type="password"
            placeholder="Current Password"
            className="border rounded-lg p-2 w-full"
          />

          <input
            type="password"
            placeholder="New Password"
            className="border rounded-lg p-2 w-full"
          />

          <input
            type="password"
            placeholder="Confirm New Password"
            className="border rounded-lg p-2 w-full"
          />

          <button className="bg-primary text-white px-4 py-2 rounded-lg">
            Update Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrivacySettings;
