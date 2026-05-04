

import React, { useState } from "react";
import { useUserProfile } from "../../hooks/useUserProfile"; 

const Profile: React.FC = () => {
  const { user, updateProfile } = useUserProfile();
  const [editing, setEditing] = useState(false);

  if (!user) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateProfile({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold">Account</h1>
        <p className="text-sm text-gray-500">
          Manage your profile
        </p>
      </div>

      {/* PROFILE CARD */}
      <div className="bg-white border rounded-2xl p-6 shadow-sm space-y-5">

        {/* AVATAR */}
        <div className="flex items-center gap-4">

          <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden">
            {user.avatar ? (
              <img
                src={user.avatar}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500">
                {user.name[0]}
              </div>
            )}
          </div>

          <div>
            <p className="font-semibold">{user.name}</p>
            <p className="text-xs text-gray-500">{user.role}</p>
          </div>

        </div>

        {/* FIELDS */}
        <div className="space-y-3">

          <input
            name="name"
            disabled={!editing}
            value={user.name}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Name"
          />

          <input
            name="email"
            disabled={!editing}
            value={user.email}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Email"
          />

          <input
            name="phone"
            disabled={!editing}
            value={user.phone}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Phone"
          />

        </div>

        {/* ACTIONS */}
        <div className="flex gap-3">

          {!editing ? (
            <button
              onClick={() => setEditing(true)}
              className="bg-black text-white px-4 py-2 rounded-xl"
            >
              Edit Profile
            </button>
          ) : (
            <>
              <button
                onClick={() => setEditing(false)}
                className="bg-green-600 text-white px-4 py-2 rounded-xl"
              >
                Save
              </button>

              <button
                onClick={() => setEditing(false)}
                className="border px-4 py-2 rounded-xl"
              >
                Cancel
              </button>
            </>
          )}

          {user.role === "promoter" && (
  <div className="bg-blue-50 border rounded-xl p-4 space-y-3">

    <h2 className="font-semibold">Promoter Account</h2>

    <p className="text-sm text-gray-600">
      Referral Code: {user.referralCode || "Not generated yet"}
    </p>

    <input
      name="accountName"
      placeholder="Account Name"
      className="w-full border p-2 rounded"
    />

    <input
      name="accountNumber"
      placeholder="Account Number"
      className="w-full border p-2 rounded"
    />

    <input
      name="bankName"
      placeholder="Bank Name"
      className="w-full border p-2 rounded"
    />

  </div>
)}

        </div>

      </div>
    </div>
  );
};

export default Profile;