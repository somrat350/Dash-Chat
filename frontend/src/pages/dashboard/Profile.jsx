import { useState, useEffect, useRef } from "react";
import { FiEdit2, FiCopy, FiCamera, FiLogOut } from "react-icons/fi";
import { useAuthStore } from "../../store/useAuthStore";

export default function ProfilePage() {
  const { authUser } = useAuthStore();

  const fileRef = useRef(null);

  const [profile, setProfile] = useState();
  const [editing, setEditing] = useState(null);
  const [temp, setTemp] = useState("");

  // Load saved profile
  useEffect(() => {
    const saved = localStorage.getItem("authUser");
    if (saved) JSON.parse(saved);
  }, []);

  // Save profile
  useEffect(() => {
    localStorage.setItem("authUser", JSON.stringify(authUser));
  }, [authUser]);

  const startEdit = (field) => {
    setEditing(field);

    if (field === "name") {
      setTemp(authUser.displayName);
    } else {
      setTemp(profile?.[field] || "");
    }
  };

  const saveEdit = () => {
    setProfile({ ...profile, [editing]: temp });
    setEditing(null);
  };

  const cancelEdit = () => {
    setEditing(null);
  };

  // COPY EMAIL
  const copyEmail = () => {
    navigator.clipboard.writeText(authUser.email);
    alert("Email copied!");
  };

  const changeImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      setProfile({ ...profile, image: reader.result });
    };

    reader.readAsDataURL(file);
  };

  // const logout = () => {
  //   localStorage.removeItem("profile");
  //   alert("Logged out");
  // };

  return (
    <div className="max-w-lg mx-auto p-6 space-y-6">
      {/* PROFILE HEADER */}

      <div className="bg-base-200 rounded-xl p-6 text-center shadow">
        <div className="relative w-fit mx-auto">
          <img
            src={authUser.photoURL}
            className="w-28 h-28 rounded-full object-cover"
          />

          <button
            onClick={() => fileRef.current.click()}
            className="absolute bottom-0 right-0 bg-base-100 p-2 rounded-full shadow"
          >
            <FiCamera />
          </button>

          <input type="file" ref={fileRef} onChange={changeImage} hidden />
        </div>

        {/* <h2 className="text-xl font-semibold mt-4">
          {authUser.displayName}
        </h2> */}
      </div>

      {/* PROFILE INFO */}

      <div className="bg-base-200 rounded-xl p-5 space-y-5 shadow">
        <Field
          label="Name"
          value={authUser.displayName}
          editing={editing === "name"}
          temp={temp}
          setTemp={setTemp}
          startEdit={() => startEdit("name")}
          save={saveEdit}
          cancel={cancelEdit}
        />

        {/* EMAIL WITH COPY BUTTON */}

        <div>
          <p className="text-sm text-gray-500">Email</p>

          <div className="flex items-center gap-2">
            <p className="font-medium">{authUser.email}</p>

            <button onClick={copyEmail}>
              <FiCopy size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* SETTINGS */}

      {/* <div className="bg-base-200 rounded-xl p-5 space-y-2 shadow">
        <button className="w-full text-left hover:bg-base-300 p-3 rounded-lg">
          Notifications
        </button>

        <button className="w-full text-left hover:bg-base-300 p-3 rounded-lg">
          Privacy
        </button>

        <button className="w-full text-left hover:bg-base-300 p-3 rounded-lg">
          Security
        </button>
      </div> */}

      {/* LOGOUT */}

      {/* <button
        onClick={logout}
        className="flex items-center gap-2 text-red-500"
      >
        <FiLogOut />
        Logout
      </button> */}
    </div>
  );
}

function Field({
  label,
  value,
  editing,
  temp,
  setTemp,
  startEdit,
  save,
  cancel,
}) {
  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <p className="text-sm text-gray-500">{label}</p>

        {!editing ? (
          <button onClick={startEdit}>
            <FiEdit2 size={16} />
          </button>
        ) : (
          <div className="flex gap-3 text-sm">
            <button onClick={save} className="text-green-500">
              Save
            </button>

            <button onClick={cancel} className="text-red-500">
              Cancel
            </button>
          </div>
        )}
      </div>

      {!editing ? (
        <p className="font-medium">{value}</p>
      ) : (
        <input
          value={temp}
          onChange={(e) => setTemp(e.target.value)}
          className="border rounded p-2 w-full"
        />
      )}
    </div>
  );
}


