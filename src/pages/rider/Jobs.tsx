

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Order, DeliveryStatus } from "../../types/rider.types";
import { RiderService } from "../../services/rider.service";

const Jobs: React.FC = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<Order[]>([]);

  useEffect(() => {
    const orders = RiderService.getOrders();

    const available = orders.filter(
      (o) =>
        o.deliveryStatus === "Pending" ||
        o.deliveryStatus === "Assigned"
    );

    setJobs(available);
  }, []);

  const acceptJob = (id: string) => {
    const updated = RiderService.acceptOrder(id);

    const available = updated.filter(
      (o) =>
        o.deliveryStatus === "Pending" ||
        o.deliveryStatus === "Assigned"
    );

    setJobs(available);
  };

  const getStatusColor = (status: DeliveryStatus) => {
    switch (status) {
      case "Pending":
        return "bg-gray-100 text-gray-600";
      case "Assigned":
        return "bg-blue-100 text-blue-600";
      case "PickedUp":
        return "bg-yellow-100 text-yellow-700";
      case "EnRoute":
        return "bg-purple-100 text-purple-700";
      case "Delivered":
        return "bg-green-100 text-green-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold">
          Available Jobs
        </h1>
        <p className="text-sm text-gray-500">
          Accept a job to start delivering
        </p>
      </div>

      {/* EMPTY STATE */}
      {jobs.length === 0 && (
        <div className="text-center py-10 text-gray-500">
          No jobs available right now 🚫
        </div>
      )}

      {/* JOB LIST */}
      <div className="space-y-4">

        {jobs.map((job) => (
          <div
            key={job.id}
            className="bg-white border rounded-2xl p-4 shadow-sm hover:shadow-md transition"
          >

            {/* TOP ROW */}
            <div className="flex justify-between items-start">

              <div>
                <h2 className="font-semibold text-base">
                  Job #{job.id}
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  {job.pickup} → {job.dropoff}
                </p>
              </div>

              <span
                className={`text-xs px-2 py-1 rounded-full ${getStatusColor(
                  job.deliveryStatus
                )}`}
              >
                {job.deliveryStatus}
              </span>

            </div>

            {/* EARNINGS */}
            <div className="mt-3">
              <p className="text-lg font-bold">
                ₦{job.total.toLocaleString()}
              </p>
              <p className="text-xs text-gray-500">
                Estimated earnings
              </p>
            </div>

            {/* ACTIONS */}
            <div className="mt-4 flex gap-3">

              <button
                onClick={() => acceptJob(job.id)}
                className="flex-1 bg-black text-white py-2 rounded-xl font-medium"
              >
                Accept Job
              </button>

              <button
                onClick={() =>
                  navigate(`/rider/delivery/${job.id}`)
                }
                className="flex-1 border py-2 rounded-xl font-medium"
              >
                View Details
              </button>

            </div>

          </div>
        ))}

      </div>
    </div>
  );
};

export default Jobs;