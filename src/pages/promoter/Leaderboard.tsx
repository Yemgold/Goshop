

import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { PageHeader } from "../../components/ui/PageHeader";
import { useReferralStats } from "../../hooks/promoter/promoter.hooks";

import type { Referral } from "../../types/promoter.types";

type LeaderboardUser = Referral & {
  rank: number;
  score: number;
};

export default function Leaderboard() {
  const navigate = useNavigate();

  const { data, isLoading, isError } = useReferralStats();

  /**
   * SAFE DEFAULTS
   */
  const referrals: Referral[] = data?.referrals ?? [];

  /**
   * SORT + RANKING (SAFE)
   */
  const leaderboard: LeaderboardUser[] = useMemo(() => {
    if (!referrals.length) return [];

    return [...referrals]
      .map((user) => ({
        ...user,
        score:
          (user.totalOrders ?? 0) * 10 +
          (user.totalSpent ?? 0),
        rank: 0,
      }))
      .sort((a, b) => b.score - a.score)
      .map((user, index) => ({
        ...user,
        rank: index + 1,
      }));
  }, [referrals]);

  /* ================= LOADING ================= */
  if (isLoading) {
    return (
      <div className="p-6 text-gray-500">
        Loading leaderboard...
      </div>
    );
  }

  /* ================= ERROR ================= */
  if (isError) {
    return (
      <div className="p-6 text-red-500">
        Failed to load leaderboard data
      </div>
    );
  }

  const topPerformer = leaderboard.length > 0
    ? leaderboard[0].customerName
    : "N/A";

  return (
    <div className="p-6 space-y-6">
      <PageHeader title="Referral Leaderboard 🏆" />

      {/* SUMMARY */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="p-4 border rounded-xl bg-white">
          <p className="text-sm text-gray-500">
            Total Referrals
          </p>
          <h2 className="text-xl font-bold">
            {data?.totalReferrals ?? referrals.length}
          </h2>
        </div>

        <div className="p-4 border rounded-xl bg-white">
          <p className="text-sm text-gray-500">
            Total Earnings
          </p>
          <h2 className="text-xl font-bold">
            ₦{Number(data?.totalEarnings ?? 0).toLocaleString()}
          </h2>
        </div>

        <div className="p-4 border rounded-xl bg-white">
          <p className="text-sm text-gray-500">
            Top Performer
          </p>
          <h2 className="text-xl font-bold">
            {topPerformer}
          </h2>
        </div>
      </div>

      {/* TABLE */}
      <div className="border rounded-xl overflow-hidden bg-white">
        <div className="grid grid-cols-5 p-3 font-semibold text-sm bg-gray-100">
          <span>Rank</span>
          <span>Name</span>
          <span>Orders</span>
          <span>Total Spent</span>
          <span>Score</span>
        </div>

        {leaderboard.length === 0 ? (
          <div className="p-4 text-gray-500">
            No leaderboard data found
          </div>
        ) : (
          leaderboard.map((user) => (
            <div
              key={user.id}
              className="grid grid-cols-5 p-3 text-sm border-t hover:bg-gray-50"
            >
              <span className="font-bold">
                #{user.rank}
              </span>

              <span>{user.customerName}</span>

              <span>{user.totalOrders ?? 0}</span>

              <span>
                ₦{Number(user.totalSpent ?? 0).toLocaleString()}
              </span>

              <span className="font-semibold">
                {user.score}
              </span>
            </div>
          ))
        )}
      </div>

      {/* BACK BUTTON */}
      <button
        onClick={() => navigate("/promoter/analytics")}
        className="mt-4 px-4 py-2 rounded-lg bg-black text-white"
      >
        Back to Analytics
      </button>
    </div>
  );
}