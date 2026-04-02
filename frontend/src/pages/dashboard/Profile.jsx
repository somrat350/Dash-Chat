import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore";
import ComponentsLoader from "../../components/ComponentsLoader";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";

export default function ProfilePage() {
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
      <div className="p-4 md:p-6">
        <div className=" mx-auto space-y-10 w-full">
          {/* ---------- Preview Section ---------- */}

          <div className="flex flex-col sm:flex-row items-center gap-6 bg-base-200 rounded-2xl shadow p-6 ">
            <div className="avatar rounded-full w-24 h-24 overflow-hidden">
              <img
                src={authUser.photoURL || "/default-avatar.jpg"}
                alt={authUser.name}
              />
            </div>

            <div className="flex-1 space-y-1 ">
              <h2 className="text-lg font-semibold">{authUser.name}</h2>

              <div className="flex items-center gap-2 text-sm opacity-70">
                <span className="break-all">{authUser.email}</span>

                <button onClick={handleCopy}>
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                </button>
              </div>

              <p className="text-sm text-primary">{authUser.role}</p>

              <p className="text-xs opacity-70">{authUser.bio}</p>
            </div>

            <input type="file" className="hidden" accept="image/*" />
          </div>

          {/* ---------- Edit Section ---------- */}

          <div className="flex justify-between mb-6">
            <h2 className="font-semibold text-lg">Profile Information</h2>

            <div className="flex items-center gap-4">
              {!editing ? (
                <button
                  onClick={() => setEditing(true)}
                  className="btn btn-sm btn-primary"
                >
                  Edit Profile
                </button>
              ) : (
                <>
                  <button
                    onClick={() => setEditing(false)}
                    className="btn btn-sm"
                  >
                    Cancel
                  </button>
                  <button
                    form="profileForm"
                    type="submit"
                    className="btn btn-sm btn-primary"
                  >
                    Save Changes
                  </button>
                </>
              )}
            </div>
          </div>

          <form
            id="profileForm"
            onSubmit={handleSubmit(handleUpdate)}
            className="grid sm:grid-cols-2 gap-5"
          >
            {/* Name */}
            <div className="flex flex-col gap-2">
              <label htmlFor="name">Name</label>
              <div className="relative">
                <input
                  type="text"
                  required
                  defaultValue={authUser?.name}
                  disabled={!editing}
                  {...register("name")}
                  id="name"
                  placeholder="Name"
                  className="input input-primary w-full rounded-2xl"
                />
              </div>
            </div>

            {/* Email -- Never Editable */}
            <div className="flex flex-col gap-2">
              <label>Email</label>
              <div className="relative">
                <input
                  type="email"
                  value={authUser?.email}
                  disabled={true}
                  className="input input-primary w-full rounded-2xl"
                />
              </div>
            </div>

            {/* Profile image */}
            <div className="flex flex-col gap-2">
              <label htmlFor="photoURL">Image</label>
              <div className="relative">
                <input
                  type="file"
                  disabled={!editing}
                  // {...register("photoURL")}
                  id="photoURL"
                  className="file-input file-input-primary w-full rounded-2xl"
                />
              </div>
            </div>

            {/* Role */}
            <div className="flex flex-col gap-2">
              <label>Role</label>
              <div className="relative">
                <input
                  type="text"
                  value={authUser?.role}
                  disabled={true}
                  className="input input-primary w-full rounded-2xl"
                />
              </div>
            </div>

            {/* Bio */}
            <div className="flex flex-col gap-2 col-span-full">
              <label htmlFor="bio">Bio</label>
              <div className="relative">
                <textarea
                  id="bio"
                  className="textarea textarea-primary w-full rounded-2xl"
                  defaultValue={authUser?.bio}
                  placeholder="Write about your self..."
                  {...register("bio")}
                  disabled={!editing}
                ></textarea>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
