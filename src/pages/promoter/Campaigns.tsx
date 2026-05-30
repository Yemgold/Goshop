



import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useCampaigns } from "../../hooks/promoter/promoter.hooks";
import { PageHeader } from "../../components/ui/PageHeader";

/* ================= TYPES ================= */
type StatusFilter = "all" | "active" | "paused" | "ended";

type Campaign = {
  id: string;
  title: string;
  description: string;
  commissionRate: number;
  status: "active" | "paused" | "ended";
  startDate?: string;
  endDate?: string;
};

export default function Campaigns() {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useCampaigns();

  const [filter, setFilter] = useState<StatusFilter>("all");

  /* ================= LOADING ================= */
  if (isLoading) {
    return <div className="p-6 text-gray-500">Loading campaigns...</div>;
  }

  /* ================= ERROR ================= */
  if (isError || !data) {
    return <div className="p-6 text-red-500">Failed to load campaigns</div>;
  }

  /* ================= SAFE DATA ================= */
  const campaigns: Campaign[] = Array.isArray(data) ? data : [];

  /* ================= FILTER ================= */
  const filtered = campaigns.filter((c) =>
    filter === "all" ? true : c.status === filter
  );

  return (
    <div className="p-6 space-y-6">
      <PageHeader title="Campaigns" />

      {/* FILTER BAR */}
      <div className="flex gap-2 flex-wrap">
        {(["all", "active", "paused", "ended"] as StatusFilter[]).map(
          (status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-3 py-1 rounded-full border text-sm ${
                filter === status ? "bg-black text-white" : "bg-white"
              }`}
            >
              {status.toUpperCase()}
            </button>
          )
        )}
      </div>

      {/* CAMPAIGN GRID */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.length === 0 ? (
          <p className="text-gray-500">No campaigns found</p>
        ) : (
          filtered.map((campaign) => (
            <div
              key={campaign.id}
              className="border rounded-xl p-4 shadow-sm bg-white space-y-2"
            >
              <h2 className="font-semibold text-lg">
                {campaign.title}
              </h2>

              <p className="text-sm text-gray-500">
                {campaign.description}
              </p>

              <div className="flex justify-between text-sm">
                <span>
                  Commission:{" "}
                  <b>{campaign.commissionRate}%</b>
                </span>

                <span
                  className={`font-medium ${
                    campaign.status === "active"
                      ? "text-green-600"
                      : campaign.status === "paused"
                      ? "text-yellow-600"
                      : "text-red-500"
                  }`}
                >
                  {campaign.status.toUpperCase()}
                </span>
              </div>

              <button
                onClick={() =>
                  navigate(
                    `/promoter/campaign-details/${campaign.id}`
                  )
                }
                className="w-full mt-2 py-2 rounded-lg bg-black text-white"
              >
                View Details
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}