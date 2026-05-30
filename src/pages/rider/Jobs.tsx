

import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getRiderJobs, acceptRiderJob } from "../../services/Rider/rider.service"; 

import type {
  Order,
  DeliveryStatus,
} from "../../types/rider.types";

const Jobs: React.FC = () => {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState<Order[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(false);

  const [acceptingId, setAcceptingId] =
    useState<string | null>(null);

  // =========================
  // LOAD JOBS
  // =========================

  const loadJobs = async () => {
    try {
      setLoading(true);
      setError(false);

      const response = await getRiderJobs();

      setJobs(response);
    } catch (error) {
      console.error(error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadJobs();
  }, []);

  // =========================
  // FILTER AVAILABLE JOBS
  // =========================

  const availableJobs = useMemo(() => {
    return jobs.filter(
      (job) =>
        job.deliveryStatus === "Pending" ||
        job.deliveryStatus === "Assigned"
    );
  }, [jobs]);

  // =========================
  // ACCEPT JOB
  // =========================

  const handleAcceptJob = async (
    orderId: string
  ) => {
    try {
      setAcceptingId(orderId);

      await acceptRiderJob(orderId);

      setJobs((prev) =>
        prev.map((job) =>
          job.id === orderId
            ? {
                ...job,
                riderId: "rider-1",
                deliveryStatus:
                  "Assigned" as DeliveryStatus,
              }
            : job
        )
      );
    } catch (error) {
      console.error(error);
      alert("Failed to accept job");
    } finally {
      setAcceptingId(null);
    }
  };

  // =========================
  // STATUS COLORS
  // =========================

  const getStatusColor = (
    status: DeliveryStatus
  ) => {
    switch (status) {
      case "Pending":
        return "bg-gray-100 text-gray-700";

      case "Assigned":
        return "bg-blue-100 text-blue-700";

      case "PickedUp":
        return "bg-yellow-100 text-yellow-700";

      case "EnRoute":
        return "bg-purple-100 text-purple-700";

      case "Delivered":
        return "bg-green-100 text-green-700";

      case "Cancelled":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // =========================
  // LOADING STATE
  // =========================

  if (isLoading) {
    return (
      <div className="p-6 max-w-5xl mx-auto space-y-4">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="h-40 rounded-2xl bg-gray-100 animate-pulse"
          />
        ))}
      </div>
    );
  }

  // =========================
  // ERROR STATE
  // =========================

  if (isError) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-500 mb-4">
          Failed to load rider jobs
        </p>

        <button
          onClick={loadJobs}
          className="px-4 py-2 bg-black text-white rounded-xl"
        >
          Retry
        </button>
      </div>
    );
  }

  // =========================
  // UI
  // =========================

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">

      {/* HEADER */}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">
            Available Jobs
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Accept delivery requests near you
          </p>
        </div>

        <button
          onClick={loadJobs}
          className="border px-4 py-2 rounded-xl text-sm font-medium"
        >
          Refresh
        </button>
      </div>

      {/* EMPTY STATE */}

      {availableJobs.length === 0 && (
        <div className="bg-white border rounded-2xl p-10 text-center">
          <p className="text-lg font-semibold">
            No available jobs
          </p>

          <p className="text-sm text-gray-500 mt-2">
            New delivery requests will appear here
          </p>
        </div>
      )}

      {/* JOBS */}

      <div className="space-y-4">
        {availableJobs.map((job) => (
          <div
            key={job.id}
            className="bg-white border rounded-2xl p-5 shadow-sm hover:shadow-md transition"
          >

            {/* TOP */}

            <div className="flex justify-between items-start gap-4">

              <div className="space-y-2">

                <div className="flex items-center gap-3">
                  <h2 className="font-semibold text-lg">
                    #{job.id}
                  </h2>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      job.deliveryStatus
                    )}`}
                  >
                    {job.deliveryStatus}
                  </span>
                </div>

                <div className="space-y-1 text-sm text-gray-600">

                  <p>
                    <span className="font-medium">
                      Pickup:
                    </span>{" "}
                    {job.pickup}
                  </p>

                  <p>
                    <span className="font-medium">
                      Dropoff:
                    </span>{" "}
                    {job.dropoff}
                  </p>

                  {job.customerName && (
                    <p>
                      <span className="font-medium">
                        Customer:
                      </span>{" "}
                      {job.customerName}
                    </p>
                  )}
                </div>
              </div>

              {/* PRICE */}

              <div className="text-right">
                <p className="text-2xl font-bold">
                  ₦{job.total.toLocaleString()}
                </p>

                <p className="text-xs text-gray-500">
                  Estimated earnings
                </p>
              </div>
            </div>

            {/* ITEMS */}

            {job.items.length > 0 && (
              <div className="mt-4 border-t pt-4">
                <p className="text-sm font-medium mb-2">
                  Order Items
                </p>

                <div className="space-y-2">
                  {job.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between text-sm"
                    >
                      <span>
                        {item.name} × {item.quantity}
                      </span>

                      <span>
                        ₦
                        {(
                          item.price * item.quantity
                        ).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ACTIONS */}

            <div className="mt-5 flex gap-3">

              <button
                onClick={() =>
                  handleAcceptJob(job.id)
                }
                disabled={
                  acceptingId === job.id
                }
                className="flex-1 bg-black text-white py-3 rounded-xl font-medium disabled:opacity-50"
              >
                {acceptingId === job.id
                  ? "Accepting..."
                  : "Accept Job"}
              </button>

              <button
                onClick={() =>
                  navigate(
                    `/rider/jobs/${job.id}`
                  )
                }
                className="flex-1 border py-3 rounded-xl font-medium"
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