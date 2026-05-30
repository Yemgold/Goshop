
import { Gift, Sparkles } from "lucide-react";

interface ReferralBadgeProps {
  referralCode?: string;
  totalReferrals?: number;
  earnings?: number;
}

export default function ReferralBadge({
  referralCode,
  totalReferrals = 0,
  earnings = 0,
}: ReferralBadgeProps) {
  return (
    <div
      className="
        relative
        overflow-hidden
        rounded-3xl
        border
        border-purple-200
        bg-gradient-to-br
        from-purple-600
        via-fuchsia-600
        to-pink-600
        p-6
        shadow-2xl
        text-white
      "
    >
      {/* Glow Effects */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-pink-300/20 rounded-full blur-2xl" />

      {/* Header */}
      <div className="relative flex items-center gap-3">
        <div
          className="
            w-14
            h-14
            rounded-2xl
            bg-white/15
            backdrop-blur-xl
            flex
            items-center
            justify-center
            border
            border-white/20
          "
        >
          <Gift size={28} />
        </div>

        <div>
          <p className="text-sm text-white/70">
            Viral Referral Program
          </p>

          <h2 className="text-2xl font-bold">
            Earn From Every Share 🚀
          </h2>
        </div>
      </div>

      {/* Referral Code */}
      <div
        className="
          relative
          mt-6
          rounded-2xl
          bg-white/10
          backdrop-blur-xl
          border
          border-white/20
          p-4
        "
      >
        <p className="text-xs uppercase tracking-widest text-white/70">
          Your Referral Code
        </p>

        <div className="flex items-center justify-between mt-2">
          <span className="text-xl font-bold tracking-wider">
            {referralCode || "SWAGA2026"}
          </span>

          <Sparkles size={20} className="text-yellow-300" />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mt-6">
        <div
          className="
            rounded-2xl
            bg-white/10
            border
            border-white/20
            backdrop-blur-xl
            p-4
          "
        >
          <p className="text-sm text-white/70">
            Total Referrals
          </p>

          <h3 className="text-3xl font-bold mt-1">
            {totalReferrals}
          </h3>
        </div>

        <div
          className="
            rounded-2xl
            bg-white/10
            border
            border-white/20
            backdrop-blur-xl
            p-4
          "
        >
          <p className="text-sm text-white/70">
            Earnings
          </p>

          <h3 className="text-3xl font-bold mt-1">
            ₦{earnings.toLocaleString()}
          </h3>
        </div>
      </div>

      {/* Bottom CTA */}
      <div
        className="
          relative
          mt-6
          rounded-2xl
          bg-black/20
          border
          border-white/10
          p-4
        "
      >
        <p className="text-sm text-white/80 leading-relaxed">
          Share your product links on WhatsApp, TikTok,
          Instagram, and Facebook to attract buyers and
          earn referral rewards automatically.
        </p>
      </div>
    </div>
  );
}