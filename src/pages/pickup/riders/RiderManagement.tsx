

// src/pages/pickup/riders/RiderManagement.tsx

import { Link } from "react-router-dom";
import { useState } from "react";

export default function RiderManagement() {
  const [search, setSearch] = useState("");

  // Replace with API later
  const riders = [
    {
      id: "1",
      name: "John Doe",
      email: "john@gmail.com",
      phone: "08012345678",
      status: "Active",
      orders: 54,
      rating: 4.9,
    },
    {
      id: "2",
      name: "Mary James",
      email: "mary@gmail.com",
      phone: "08087654321",
      status: "Pending",
      orders: 0,
      rating: 0,
    },
    {
      id: "3",
      name: "Peter Obi",
      email: "peter@gmail.com",
      phone: "08145678901",
      status: "Suspended",
      orders: 18,
      rating: 4.5,
    },
  ];

  const filtered = riders.filter(
    (r) =>
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.phone.includes(search)
  );

  return (
    <div className="p-8 bg-gray-100 min-h-screen">

      {/* Header */}

      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">
            Rider Management
          </h1>

          <p className="text-gray-500 mt-2">
            Manage all riders attached to your pickup center.
          </p>
        </div>

        <Link
          to="/pickup/riders/invite"
          className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700"
        >
          + Invite Rider
        </Link>
      </div>

      {/* Statistics */}

      <div className="grid md:grid-cols-4 gap-5 mb-8">

        <div className="bg-white rounded-xl shadow p-5">
          <h3 className="text-gray-500">
            Total Riders
          </h3>

          <p className="text-3xl font-bold mt-2">
            32
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <h3 className="text-gray-500">
            Active
          </h3>

          <p className="text-3xl font-bold text-green-600 mt-2">
            26
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <h3 className="text-gray-500">
            Pending
          </h3>

          <p className="text-3xl font-bold text-yellow-600 mt-2">
            4
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <h3 className="text-gray-500">
            Suspended
          </h3>

          <p className="text-3xl font-bold text-red-600 mt-2">
            2
          </p>
        </div>

      </div>

      {/* Search */}

      <div className="bg-white rounded-xl shadow p-5 mb-6">

        <input
          type="text"
          placeholder="Search by rider name or phone..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="w-full border rounded-lg px-4 py-3"
        />

      </div>

      {/* Rider Table */}

      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-50">

            <tr className="text-left">

              <th className="p-4">
                Rider
              </th>

              <th className="p-4">
                Phone
              </th>

              <th className="p-4">
                Status
              </th>

              <th className="p-4">
                Orders
              </th>

              <th className="p-4">
                Rating
              </th>

              <th className="p-4">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {filtered.map((rider) => (

              <tr
                key={rider.id}
                className="border-t hover:bg-gray-50"
              >

                <td className="p-4">
                  <div>
                    <p className="font-semibold">
                      {rider.name}
                    </p>

                    <p className="text-sm text-gray-500">
                      {rider.email}
                    </p>
                  </div>
                </td>

                <td className="p-4">
                  {rider.phone}
                </td>

                <td className="p-4">

                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium
                    ${
                      rider.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : rider.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {rider.status}
                  </span>

                </td>

                <td className="p-4">
                  {rider.orders}
                </td>

                <td className="p-4">
                  {rider.rating > 0
                    ? `⭐ ${rider.rating}`
                    : "-"}
                </td>

                <td className="p-4">

                  <Link
                    to={`/pickup/riders/${rider.id}`}
                    className="text-blue-600 hover:underline mr-4"
                  >
                    View
                  </Link>

                  {rider.status === "Active" ? (
                    <button className="text-red-600 hover:underline">
                      Suspend
                    </button>
                  ) : (
                    <button className="text-green-600 hover:underline">
                      Activate
                    </button>
                  )}

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}