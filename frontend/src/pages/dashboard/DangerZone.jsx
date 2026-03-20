import { AlertTriangle, LogOut, OctagonAlert, Settings, Trash2,  UserX } from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore";
import Swal from "sweetalert2";
import Breadcrumb from "../../components/dashboard/Breadcrumb";

const DangerZone = () => {

    const pageFlow = [
    {
      label: "Settings",
      link: "/dashboard/settings",
      icon: <Settings size={16}></Settings>,
    },
    {
      label: "Dangerzone",
      link: "/dashboard/settings/danger",
      icon: <OctagonAlert size={16} />,
    },
  ];
  const { logoutUser } = useAuthStore();

  const handleClearHistory = () => {
    Swal.fire({
      title: "Clear Chat History?",
      text: "All messages will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, clear it",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("Chat history cleared");

        Swal.fire({
          title: "Cleared!",
          text: "Your chat history has been deleted.",
          icon: "success",
        });
      }
    });
  };

  const handleDeleteAccount = () => {
    Swal.fire({
      title: "Delete Account?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete account",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("Account deleted");

        Swal.fire({
          title: "Deleted!",
          text: "Your account has been deleted.",
          icon: "success",
        });
      }
    });
  };

  return (
    <div className="max-w-3xl space-y-8">
       <Breadcrumb items={pageFlow} />
      {/* Page Title */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold flex items-center gap-2 text-red-600">
          <AlertTriangle size={22} />
          Danger Zone
        </h2>
        <p className="text-sm text-gray-500">
          These actions are permanent and cannot be undone.
        </p>
      </div>

      {/* Danger Card */}
      <div className="border border-red-300 rounded-xl p-6 space-y-6  dark:bg-red-950/20">
        {/* Logout */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <LogOut className="text-red-500" />

            <div>
              <p className="font-medium">Logout</p>
              <p className="text-sm text-gray-500">
                Sign out from your account.
              </p>
            </div>
          </div>

          <button
            onClick={logoutUser}
            className="px-4 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-900"
          >
            Logout
          </button>
        </div>

        {/* Clear Chat History */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Trash2 className="text-red-500" />

            <div>
              <p className="font-medium">Clear Chat History</p>
              <p className="text-sm text-gray-500">
                Remove all chat messages permanently.
              </p>
            </div>
          </div>

          <button
            onClick={handleClearHistory}
            className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
          >
            Clear
          </button>
        </div>

        {/* Delete Account */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <UserX className="text-red-600" />

            <div>
              <p className="font-medium">Delete Account</p>
              <p className="text-sm text-gray-500">
                Permanently delete your account and all data.
              </p>
            </div>
          </div>

          <button
            onClick={handleDeleteAccount}
            className="px-4 py-2 rounded-lg bg-red-700 text-white hover:bg-red-800"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DangerZone;
