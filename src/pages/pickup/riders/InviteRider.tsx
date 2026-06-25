


import { useState } from "react";
import { useAuthStore } from "../../../store/auth.store";
import { useCreateRiderInvite } from "../../../hooks/pickup/useCreateRiderInvite";

export default function InviteRider() {
  const user = useAuthStore((state) => state.user);

  const [form, setForm] = useState({
    email: "",
    phone: "",
  });

  const {
  mutate: createInvite,
  isPending: loading,
} = useCreateRiderInvite();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  if (!user?.businessId) {
    alert("Business ID not found.");
    return;
  }

  if (!user?.pickupCenterId) {
    alert("Pickup Center ID not found.");
    return;
  }

  createInvite(
    {
      businessId: user.businessId,
      pickupCenterId: user.pickupCenterId,
      email: form.email.trim(),
      phone: form.phone.trim(),
    },
    {
      onSuccess: (response) => {
        console.log(response);

        alert(
          response?.message ||
            "Invitation sent successfully."
        );

        setForm({
          email: "",
          phone: "",
        });
      },

      onError: (error: any) => {
        console.error(error);

        alert(
          error?.response?.data?.message ||
            "Failed to send invitation."
        );
      },
    }
  );
};

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            Invite Rider
          </h1>

          <p className="text-gray-500 mt-2">
            Send an invitation to an existing
            registered user to become a rider in
            your pickup center.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div>
            <label className="block mb-2 font-medium">
              Rider Email
            </label>

            <input
              type="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
              placeholder="john@example.com"
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Phone Number
            </label>

            <input
              type="text"
              name="phone"
              required
              value={form.phone}
              onChange={handleChange}
              placeholder="08012345678"
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold mb-2">
              Invitation Information
            </h3>

            <ul className="text-sm text-gray-600 list-disc pl-5 space-y-1">
              <li>
                The rider must already have an
                account.
              </li>

              <li>
                An invitation email will be sent
                to the supplied email address.
              </li>

              <li>
                The rider becomes part of your
                pickup center only after accepting
                the invitation.
              </li>
            </ul>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition disabled:opacity-50"
          >
            {loading
              ? "Sending Invitation..."
              : "Send Invitation"}
          </button>
        </form>
      </div>
    </div>
  );
}