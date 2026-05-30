


import { useEffect, useState } from "react";
import {
  usePromoterProfile,
  useUpdateProfile,
} from "../../hooks/promoter/promoter.hooks";

/* ================= TYPES ================= */
type ProfileForm = {
  fullName: string;
  email: string;
  phone: string;
  avatar: string;
};

export default function PromoterSettings() {
  const { data, isLoading, isError } = usePromoterProfile();
  const { mutate: updateProfile, isPending } = useUpdateProfile();

  const [form, setForm] = useState<ProfileForm>({
    fullName: "",
    email: "",
    phone: "",
    avatar: "",
  });

  /* ================= LOAD DATA INTO FORM ================= */
  useEffect(() => {
    if (data) {
      setForm({
        fullName: data.fullName ?? "",
        email: data.email ?? "",
        phone: data.phone ?? "",
        avatar: data.avatar ?? "",
      });
    }
  }, [data]);

  /* ================= HANDLER ================= */
  const handleSave = () => {
    updateProfile({
      fullName: form.fullName,
      email: form.email,
      phone: form.phone,
      avatar: form.avatar,
    });
  };

  /* ================= LOADING ================= */
  if (isLoading) {
    return (
      <div className="p-6 text-gray-500">
        Loading settings...
      </div>
    );
  }

  /* ================= ERROR ================= */
  if (isError) {
    return (
      <div className="p-6 text-red-500">
        Failed to load profile
      </div>
    );
  }

  /* ================= UI ================= */
  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <h1 className="text-xl font-bold">Account Settings</h1>

      {/* ================= PROFILE FORM ================= */}
      <div className="border rounded-xl p-4 space-y-4 bg-white">
        <h2 className="font-semibold">Profile Information</h2>

        <input
          type="text"
          placeholder="Full Name"
          value={form.fullName}
          onChange={(e) =>
            setForm({ ...form, fullName: e.target.value })
          }
          className="w-full border p-2 rounded"
        />

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
          className="w-full border p-2 rounded"
        />

        <input
          type="text"
          placeholder="Phone"
          value={form.phone}
          onChange={(e) =>
            setForm({ ...form, phone: e.target.value })
          }
          className="w-full border p-2 rounded"
        />

        <input
          type="text"
          placeholder="Avatar URL"
          value={form.avatar}
          onChange={(e) =>
            setForm({ ...form, avatar: e.target.value })
          }
          className="w-full border p-2 rounded"
        />

        {/* PREVIEW */}
        {form.avatar && (
          <img
            src={form.avatar}
            alt="avatar"
            className="w-20 h-20 rounded-full object-cover"
          />
        )}

        <button
          onClick={handleSave}
          disabled={isPending}
          className={`px-4 py-2 rounded text-white ${
            isPending ? "bg-gray-400" : "bg-black"
          }`}
        >
          {isPending ? "Saving..." : "Save Changes"}
        </button>
      </div>

      {/* ================= INFO ================= */}
      <div className="text-sm text-gray-500">
        Manage your promoter account details. Changes apply immediately to your profile.
      </div>
    </div>
  );
}