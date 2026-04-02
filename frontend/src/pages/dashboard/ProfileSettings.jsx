import { useState } from "react";
import { Copy, Check, UserRoundPen,  Settings } from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore";
import ComponentsLoader from "../../components/ComponentsLoader";
import toast from "react-hot-toast";
import Breadcrumb from "../../components/dashboard/Breadcrumb";
import { useForm } from "react-hook-form";

const pageFlow = [
  {
    label: "Settings",
    link: "/dashboard/settings",
    icon: <Settings size={16}></Settings>,
  },
  {
    label: "Profile",
    link: "/dashboard/settings/profile",
    icon: <UserRoundPen size={16} />,
  },
];

export default function ProfileSettings() {
  const [editing, setEditing] = useState(false);
  const [copied, setCopied] = useState(false);
  const { authUser, userLoading, updateProfile } = useAuthStore();
  const { register, handleSubmit } = useForm();

  if (userLoading) return <ComponentsLoader />;

  const handleUpdate = async (data) => {
    await updateProfile(data);
    setEditing(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(authUser?.email);
    setCopied(true);
    toast.success("Email copied success.");
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <>
      <div>
        <Breadcrumb items={pageFlow} />
      <div className="mt-6 sm:mt-10 mx-auto w-full max-w-5xl px-3 sm:px-6 space-y-8 sm:space-y-10">
  
  {/* ---------- Preview Section ---------- */}
  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 sm:gap-6 bg-base-200 rounded-2xl shadow p-4 sm:p-6">
    
    {/* Avatar */}
    <div className="avatar w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden shrink-0">
      <img
        src={authUser.photoURL || "/default-avatar.jpg"}
        alt={authUser.name}
        className="object-cover w-full h-full"
      />
    </div>

    {/* Info */}
    <div className="flex-1 w-full text-center sm:text-left space-y-1">
      <h2 className="text-base sm:text-lg font-semibold wrap-break-word">
        {authUser.name}
      </h2>

      <div className="flex items-center justify-center sm:justify-start gap-2 text-xs sm:text-sm opacity-70 flex-wrap">
        <span className="break-all">{authUser.email}</span>

        <button onClick={handleCopy}>
          {copied ? <Check size={14} /> : <Copy size={14} />}
        </button>
      </div>

      <p className="text-xs sm:text-sm text-primary">{authUser.role}</p>

      <p className="text-xs opacity-70 wrap-break-word">
        {authUser.bio}
      </p>
    </div>

    {/* Upload (hidden input trigger future use) */}
    <input type="file" className="hidden" accept="image/*" />
  </div>

  {/* ---------- Header ---------- */}
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
    <h2 className="font-semibold text-base sm:text-lg">
      Profile Information
    </h2>

    <div className="flex gap-2 sm:gap-3 flex-wrap">
      {!editing ? (
        <button
          onClick={() => setEditing(true)}
          className="btn btn-sm btn-primary w-full sm:w-auto"
        >
          Edit Profile
        </button>
      ) : (
        <>
          <button
            onClick={() => setEditing(false)}
            className="btn btn-sm w-full sm:w-auto"
          >
            Cancel
          </button>

          <button
            form="profileForm"
            type="submit"
            className="btn btn-sm btn-primary w-full sm:w-auto"
          >
            Save Changes
          </button>
        </>
      )}
    </div>
  </div>

  {/* ---------- Form ---------- */}
  <form
    id="profileForm"
    onSubmit={handleSubmit(handleUpdate)}
    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-5"
  >
    {/* Name */}
    <div className="flex flex-col gap-1 sm:gap-2">
      <label htmlFor="name" className="text-sm">
        Name
      </label>
      <input
        type="text"
        required
        defaultValue={authUser?.name}
        disabled={!editing}
        {...register("name")}
        id="name"
        placeholder="Name"
        className="input input-primary w-full rounded-xl sm:rounded-2xl text-sm"
      />
    </div>

    {/* Email */}
    <div className="flex flex-col gap-1 sm:gap-2">
      <label className="text-sm">Email</label>
      <input
        type="email"
        value={authUser?.email}
        disabled
        className="input input-primary w-full rounded-xl sm:rounded-2xl text-sm"
      />
    </div>

    {/* Image */}
    <div className="flex flex-col gap-1 sm:gap-2">
      <label htmlFor="photoURL" className="text-sm">
        Image
      </label>
      <input
        type="file"
        disabled={!editing}
        id="photoURL"
        className="file-input file-input-primary w-full rounded-xl sm:rounded-2xl text-sm"
      />
    </div>

    {/* Role */}
    <div className="flex flex-col gap-1 sm:gap-2">
      <label className="text-sm">Role</label>
      <input
        type="text"
        value={authUser?.role}
        disabled
        className="input input-primary w-full rounded-xl sm:rounded-2xl text-sm"
      />
    </div>

    {/* Bio */}
    <div className="flex flex-col gap-1 sm:gap-2 col-span-full">
      <label htmlFor="bio" className="text-sm">
        Bio
      </label>
      <textarea
        id="bio"
        className="textarea textarea-primary w-full rounded-xl sm:rounded-2xl text-sm"
        defaultValue={authUser?.bio}
        placeholder="Write about yourself..."
        {...register("bio")}
        disabled={!editing}
      />
    </div>
  </form>
</div>
      </div>
    </>
  );
}
