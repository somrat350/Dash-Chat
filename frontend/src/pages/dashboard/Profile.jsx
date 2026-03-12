import { useState, useRef } from "react";
import { FiEdit2, FiSave, FiX } from "react-icons/fi";
import { useAuthStore } from "../../store/useAuthStore";

export default function ProfilePage() {
  const {authUser } = useAuthStore();

  const fileRef = useRef(null);

  // const [profilePic, setProfilePic] = useState(
  //   "https://i.pravatar.cc/150"
  // );

  const [profile, setProfile] = useState({
    name: "Michael Rodriguez",
    title: "Product Designer",
    location: "Los Angeles, California, USA",
    firstName: "Michael",
    lastName: "Rodriguez",
    email: "rodriguez@gmail.com",
    phone: "(213) 555-1234",
    bio: "Product Designer"
  });

  const [tempProfile, setTempProfile] = useState(profile);

  const [editHeader, setEditHeader] = useState(false);
  const [editInfo, setEditInfo] = useState(false);

  // image click
  const handleImageClick = () => {
    fileRef.current.click();
  };

  // image change
  const handleImageChange = (e) => {

    const file = e.target.files[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      (imageUrl);
    }

  };

  // input change
  const handleChange = (e) => {
    setTempProfile({
      ...tempProfile,
      [e.target.name]: e.target.value
    });
  };

  // save header
  const saveHeader = () => {
    setProfile(tempProfile);
    setEditHeader(false);
  };

  // save personal info
  const saveInfo = () => {
    setProfile(tempProfile);
    setEditInfo(false);
  };

  // cancel edit
  const cancelEdit = () => {
    setTempProfile(profile);
    setEditHeader(false);
    setEditInfo(false);
  };

  return (
    <div className="p-8 bg-base-200">

      <h1 className="text-2xl font-bold mb-6">
         Profile
      </h1>

      {/* Profile Header */}

      <div className="bg-base-100 rounded-xl p-6 flex justify-between shadow mb-6">

        <div className="flex items-center gap-4">

          {/* Profile Image */}

          <div className="relative">

            <img
              src={authUser.photoURL}
              className="w-20 h-20 rounded-full object-cover cursor-pointer"
              onClick={handleImageClick}
            />

            <div
              onClick={handleImageClick}
              className="absolute bottom-0 right-0 bg-black text-white p-1 rounded-full cursor-pointer"
            >
              <FiEdit2 size={14} />
            </div>

            <input
              type="file"
              ref={fileRef}
              className="hidden"
              accept="image/*"
              onChange={handleImageChange}
            />

          </div>

          {/* Profile Text */}

          <div>

            {editHeader ? (
              <>
                <input
                  name="name"
                  value={authUser.displayName}
                  onChange={handleChange}
                  className="input input-bordered mb-1"
                />

                <input
                  name="title"
                  value={tempProfile.title}
                  onChange={handleChange}
                  className="input input-bordered mb-1"
                />

                <input
                  name="location"
                  value={tempProfile.location}
                  onChange={handleChange}
                  className="input input-bordered"
                />
              </>
            ) : (
              <>
                <h2 className="text-lg font-semibold">
                  {authUser.displayName}
                </h2>

                <p className="text-gray-500 text-sm">
                  {profile.title}
                </p>

                <p className="text-gray-400 text-sm">
                  {profile.location}
                </p>
              </>
            )}

          </div>

        </div>

        {!editHeader ? (
          <button
            onClick={() => setEditHeader(true)}
            className="flex items-center gap-2 border px-4 py-2 rounded-2xl"
          >
            <FiEdit2 /> Edit
          </button>
        ) : (
          <div className="flex gap-2">

            <button
              onClick={saveHeader}
              className="flex items-center gap-2 bg-primary text-white px-3 py-2 rounded"
            >
              <FiSave /> Save
            </button>

            <button
              onClick={cancelEdit}
              className="flex items-center gap-2 border px-3 py-2 rounded"
            >
              <FiX /> Cancel
            </button>

          </div>
        )}

      </div>

      {/* Personal Information */}

      <div className="bg-base-100 rounded-xl p-6 shadow">

        <div className="flex justify-between mb-6">

          <h2 className="text-lg font-semibold">
            Personal Information
          </h2>

          {!editInfo ? (
            <button
              onClick={() => setEditInfo(true)}
              className="flex items-center gap-2 border px-4 py-2 rounded-xl"
            >
              <FiEdit2 /> Edit
            </button>
          ) : (
            <div className="flex gap-2">

              <button
                onClick={saveInfo}
                className="bg-primary text-white px-3 py-2 rounded flex gap-2 items-center"
              >
                <FiSave /> Save
              </button>

              <button
                onClick={cancelEdit}
                className="border px-3 py-2 rounded flex gap-2 items-center"
              >
                <FiX /> Cancel
              </button>

            </div>
          )}

        </div>

        {/* Grid Fields */}

        <div className="grid md:grid-cols-2 gap-6">

          <Field
            label="First Name"
            name="firstName"
            value={editInfo ? authUser.displayName : authUser.displayName}
            editing={editInfo}
            handleChange={handleChange}
          />

          <Field
            label="Last Name"
            name="lastName"
            value={editInfo ? tempProfile.lastName : profile.lastName}
            editing={editInfo}
            handleChange={handleChange}
          />

          <Field
            label="Email"
            name="email"
            value={editInfo ? authUser.email : authUser.email}
            editing={editInfo}
            handleChange={handleChange}
          />

          <Field
            label="Phone"
            name="phone"
            value={editInfo ? tempProfile.phone : profile.phone}
            editing={editInfo}
            handleChange={handleChange}
          />

        </div>

        {/* Bio */}

        <div className="mt-6">

          <label className="text-sm text-gray-500">
            Bio
          </label>

          {editInfo ? (
            <textarea
              name="bio"
              value={tempProfile.bio}
              onChange={handleChange}
              className="textarea textarea-bordered w-full mt-1"
            />
          ) : (
            <p className="mt-1">
              {profile.bio}
            </p>
          )}

        </div>

      </div>

    </div>
  );
}


function Field({ label, name, value, editing, handleChange }) {

  return (
    <div>

      <label className="text-sm text-gray-500">
        {label}
      </label>

      {editing ? (
        <input
          name={name}
          value={value}
          onChange={handleChange}
          className="input input-bordered w-full mt-1"
        />
      ) : (
        <p className="mt-1">
          {value}
        </p>
      )}

    </div>
  );
}