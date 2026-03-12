import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore";

export default function ProfilePage() {
  const [editing, setEditing] = useState(false);
  const [copied, setCopied] = useState(false);
  const { authUser } = useAuthStore();

  const [profile, setProfile] = useState({
    name: "Lili Akter",
    email: "limaakter@gmail.com",
    role: "Frontend Developer",
    photo: "https://i.pravatar.cc/150?img=5",
    bio: "I love building chat applications.",
  });

  const [temp, setTemp] = useState(profile);

  const handleChange = (e) => {
    setTemp({ ...temp, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setProfile(temp);
    setEditing(false);
  };
  const handleCancel = () => {
    setTemp(profile);
    setEditing(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);

    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="p-8 bg-base-200 min-h-screen">
      <div className=" mx-auto space-y-10 w-full">
        {/* ---------- Preview Section ---------- */}

        <div className=" flex-row gap-6 card bg-base-100  shadow p-6 ">
          <div className="avatar ">
            <div className="w-20 rounded-full">
              <img src={authUser?.photoURL || profile.photo} />
            </div>
          </div>

          <div className="space-y-1 ">
            <h2 className="text-lg font-semibold">{authUser.displayName}</h2>

            <div className="flex items-center gap-2 text-sm opacity-70">
              {authUser.email}

              <button onClick={handleCopy}>
                {copied ? <Check size={14} /> : <Copy size={14} />}
              </button>
            </div>

            <p className="text-sm">{profile.role}</p>

            <p className="text-xs opacity-70">{profile.bio}</p>
          </div>
        </div>

        {/* ---------- Edit Section ---------- */}

        <div className="card bg-base-100 shadow p-10">
          <div className="flex justify-between mb-6">
            <h2 className="font-semibold text-lg">Profile Information</h2>

            {!editing ? (
              <button
                onClick={() => setEditing(true)}
                className="btn btn-sm btn-primary"
              >
                Edit
              </button>
            ) : (
              <div className="flex gap-2">
                <button onClick={handleSave} className="btn btn-sm btn-primary">
                  Save
                </button>

                <button onClick={handleCancel} className="btn btn-sm btn-primary">
                  Cancel
                </button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-10">
            {/* Name */}

            <div>
              <label className="text-sm">Name</label>

              {editing ? (
                <input
                  name="name"
                  value={authUser.displayName}
                  onChange={handleChange}
                  className="input mt-2 input-bordered p-4 w-full"
                />
              ) : (
                <p className="mt-1">{authUser.displayName}</p>
              )}
            </div>

            {/* Email */}

            <div>
              <label className="text-sm">Email</label>

              <p className="mt-1">{authUser.email}</p>
            </div>

            {/* Photo URL */}

            <div>
              <label className="text-sm">Profile Photo</label>

              {editing ? (
                <input
                  name="photo"
                  value={authUser.photoURL}
                  onChange={handleChange}
                  className="input mt-2 p-4 input-bordered w-full"
                />
              ) : (
                <p className="mt-1 break-all">{authUser.photoURL}</p>
              )}
            </div>

            {/* Role */}

            <div>
              <label className="text-sm">Role</label>

              {editing ? (
                <input
                  name="role"
                  value={temp.role}
                  onChange={handleChange}
                  className="input mt-2 p-4 input-bordered w-full"
                />
              ) : (
                <p className="mt-1">{profile.role}</p>
              )}
            </div>
          </div>

          {/* Bio */}

          <div className="mt-8">
            <label className="text-sm">Bio</label>

            {editing ? (
              <textarea
                name="bio"
                value={temp.bio}
                onChange={handleChange}
                className="textarea mt-2 p-4 textarea-bordered w-full"
              />
            ) : (
              <p className="mt-1">{profile.bio}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
