


// src/pages/pickup/riders/RiderDetails.tsx

import { useNavigate } from "react-router-dom";

export default function RiderDetails() {
  const navigate = useNavigate();

  // Dummy data (replace with API)
  const rider = {
    fullName: "John Doe",
    email: "john@example.com",
    phone: "08012345678",
    status: "Active",
    invitationStatus: "Accepted",
    joined: "12 June 2026",
    vehicle: "Motorcycle",
    rating: 4.9,
    completedOrders: 245,
    pendingOrders: 6,
    earnings: 245000,
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="bg-white rounded-xl shadow p-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">
            Rider Details
          </h1>

          <p className="text-gray-500 mt-2">
            View rider profile and manage rider activities.
          </p>
        </div>

        <button
          onClick={() => navigate(-1)}
          className="px-5 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
        >
          Back
        </button>
      </div>

      {/* Profile */}
      <div className="bg-white rounded-xl shadow p-6">
        <div className="flex items-center gap-6">

          <div className="w-24 h-24 rounded-full bg-blue-600 text-white flex items-center justify-center text-4xl font-bold">
            {rider.fullName.charAt(0)}
          </div>

          <div>

            <h2 className="text-2xl font-semibold">
              {rider.fullName}
            </h2>

            <p className="text-gray-500">
              {rider.email}
            </p>

            <p className="text-gray-500">
              {rider.phone}
            </p>

            <div className="mt-3 flex gap-3">

              <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm">
                {rider.status}
              </span>

              <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm">
                {rider.invitationStatus}
              </span>

            </div>

          </div>

        </div>
      </div>

      {/* Statistics */}

      <div className="grid md:grid-cols-4 gap-5">

        <div className="bg-white rounded-xl shadow p-5">
          <p className="text-gray-500">
            Completed Orders
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {rider.completedOrders}
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <p className="text-gray-500">
            Pending Orders
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {rider.pendingOrders}
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <p className="text-gray-500">
            Rating
          </p>

          <h2 className="text-3xl font-bold mt-2">
            ⭐ {rider.rating}
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <p className="text-gray-500">
            Earnings
          </p>

          <h2 className="text-3xl font-bold mt-2">
            ₦{rider.earnings.toLocaleString()}
          </h2>
        </div>

      </div>

      {/* Information */}

      <div className="bg-white rounded-xl shadow p-6">

        <h2 className="text-xl font-semibold mb-6">
          Rider Information
        </h2>

        <div className="grid md:grid-cols-2 gap-6">

          <div>

            <p className="text-gray-500 text-sm">
              Vehicle
            </p>

            <p className="font-semibold">
              {rider.vehicle}
            </p>

          </div>

          <div>

            <p className="text-gray-500 text-sm">
              Joined
            </p>

            <p className="font-semibold">
              {rider.joined}
            </p>

          </div>

          <div>

            <p className="text-gray-500 text-sm">
              Email
            </p>

            <p className="font-semibold">
              {rider.email}
            </p>

          </div>

          <div>

            <p className="text-gray-500 text-sm">
              Phone Number
            </p>

            <p className="font-semibold">
              {rider.phone}
            </p>

          </div>

        </div>

      </div>

      {/* Actions */}

      <div className="bg-white rounded-xl shadow p-6">

        <h2 className="text-xl font-semibold mb-5">
          Rider Actions
        </h2>

        <div className="flex flex-wrap gap-4">

          <button className="px-5 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700">
            Assign Orders
          </button>

          <button className="px-5 py-3 rounded-lg bg-yellow-500 text-white hover:bg-yellow-600">
            Suspend Rider
          </button>

          <button className="px-5 py-3 rounded-lg bg-green-600 text-white hover:bg-green-700">
            Activate Rider
          </button>

          <button className="px-5 py-3 rounded-lg bg-red-600 text-white hover:bg-red-700">
            Remove Rider
          </button>

        </div>

      </div>

    </div>
  );
}