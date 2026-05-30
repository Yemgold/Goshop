


import { useRewards } from "../../hooks/promoter/promoter.hooks";
import { PageHeader } from "../../components/ui/PageHeader";

type RewardItem = {
  id: string;
  title: string;
  description: string;
  points: number;
  redeemed: boolean;
};

type RewardsResponse = {
  totalPoints: number;
  availableRewards: number;
  redeemed: number;
  rewards: RewardItem[];
};

export default function Rewards() {
  const { data, isLoading, isError } = useRewards() as {
    data: RewardsResponse | undefined;
    isLoading: boolean;
    isError: boolean;
  };

  /* ================= LOADING ================= */
  if (isLoading) {
    return (
      <div className="p-6 text-gray-500">
        Loading rewards...
      </div>
    );
  }

  /* ================= ERROR ================= */
  if (isError || !data) {
    return (
      <div className="p-6 text-red-500">
        Failed to load rewards
      </div>
    );
  }

  const rewards = data.rewards ?? [];

  return (
    <div className="p-6 space-y-6">
      <PageHeader title="Rewards Center 🎁" />

      {/* SUMMARY CARD */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="border rounded-xl p-4 bg-white">
          <p className="text-sm text-gray-500">Total Points</p>
          <h2 className="text-2xl font-bold">
            {data.totalPoints ?? 0}
          </h2>
        </div>

        <div className="border rounded-xl p-4 bg-white">
          <p className="text-sm text-gray-500">
            Available Rewards
          </p>
          <h2 className="text-2xl font-bold">
            {data.availableRewards ?? 0}
          </h2>
        </div>

        <div className="border rounded-xl p-4 bg-white">
          <p className="text-sm text-gray-500">Redeemed</p>
          <h2 className="text-2xl font-bold">
            {data.redeemed ?? 0}
          </h2>
        </div>
      </div>

      {/* REWARD LIST */}
      <div className="grid md:grid-cols-2 gap-4">
        {rewards.length === 0 ? (
          <div className="text-gray-500 p-4">
            No rewards available
          </div>
        ) : (
          rewards.map((reward) => (
            <div
              key={reward.id}
              className="border rounded-xl p-4 space-y-2 bg-white shadow-sm"
            >
              {/* TITLE */}
              <h3 className="font-semibold text-lg">
                {reward.title}
              </h3>

              {/* DESCRIPTION */}
              <p className="text-sm text-gray-600">
                {reward.description}
              </p>

              {/* POINT COST */}
              <div className="text-sm font-medium">
                Cost: {reward.points ?? 0} points
              </div>

              {/* STATUS */}
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  reward.redeemed
                    ? "bg-gray-200 text-gray-600"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {reward.redeemed ? "Redeemed" : "Available"}
              </span>

              {/* ACTION */}
              <button
                disabled={reward.redeemed}
                className={`w-full mt-2 py-2 rounded-lg text-white text-sm ${
                  reward.redeemed
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-black"
                }`}
              >
                {reward.redeemed
                  ? "Already Claimed"
                  : "Redeem Reward"}
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}