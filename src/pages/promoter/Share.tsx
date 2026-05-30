


import { useMemo, useState } from "react";
import { toast } from "react-toastify";

import { usePromoterProfile } from "../../hooks/promoter/promoter.hooks";
import { PageHeader } from "../../components/ui/PageHeader";

export default function Share() {
  const { data, isLoading, isError } = usePromoterProfile();
  const [copied, setCopied] = useState(false);

  /* ================= LOADING ================= */
  if (isLoading) {
    return (
      <div className="p-6 text-gray-500">
        Loading share tools...
      </div>
    );
  }

  /* ================= ERROR ================= */
  if (isError || !data) {
    return (
      <div className="p-6 text-red-500">
        Failed to load promoter profile
      </div>
    );
  }

  /* ================= REFERRAL LINK ================= */
  const referralLink = useMemo(() => {
    return `${window.location.origin}/register?ref=${data.referralCode}`;
  }, [data.referralCode]);

  /* ================= COPY LINK ================= */
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      toast.success("Referral link copied!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy link");
    }
  };

  /* ================= SOCIAL SHARE ================= */
  const handleShare = (platform: "whatsapp" | "twitter" | "facebook") => {
    const text = encodeURIComponent(
      `Join using my referral link and get rewards!`
    );

    const url = encodeURIComponent(referralLink);

    const links = {
      whatsapp: `https://wa.me/?text=${text}%20${url}`,
      twitter: `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
    };

    window.open(links[platform], "_blank");
  };

  return (
    <div className="p-6 space-y-6">
      <PageHeader title="Share & Earn 🚀" />

      {/* REFERRAL INFO */}
      <div className="border rounded-xl p-5 bg-white space-y-3">
        <h2 className="font-semibold">
          Your Referral Code
        </h2>

        <div className="text-2xl font-bold tracking-wider">
          {data.referralCode}
        </div>

        <p className="text-sm text-gray-500">
          Share this link to earn commissions on every signup and purchase.
        </p>
      </div>

      {/* REFERRAL LINK BOX */}
      <div className="border rounded-xl p-4 bg-white space-y-3">
        <h3 className="font-semibold">
          Referral Link
        </h3>

        <div className="flex flex-col md:flex-row gap-2">
          <input
            readOnly
            value={referralLink}
            className="w-full border p-3 rounded-lg text-sm"
          />

          <button
            onClick={handleCopy}
            className="px-4 py-2 bg-black text-white rounded-lg"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>

      {/* SOCIAL SHARE */}
      <div className="border rounded-xl p-4 bg-white space-y-3">
        <h3 className="font-semibold">
          Share on Social Media
        </h3>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => handleShare("whatsapp")}
            className="px-4 py-2 bg-green-500 text-white rounded-lg"
          >
            WhatsApp
          </button>

          <button
            onClick={() => handleShare("twitter")}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Twitter
          </button>

          <button
            onClick={() => handleShare("facebook")}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
          >
            Facebook
          </button>
        </div>
      </div>

      {/* STATS */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="border rounded-xl p-4 bg-white">
          <p className="text-sm text-gray-500">
            Total Referrals
          </p>
          <h2 className="text-xl font-bold">
            {data.totalReferrals}
          </h2>
        </div>

        <div className="border rounded-xl p-4 bg-white">
          <p className="text-sm text-gray-500">
            Wallet Balance
          </p>
          <h2 className="text-xl font-bold">
            ₦{data.walletBalance.toLocaleString()}
          </h2>
        </div>

        <div className="border rounded-xl p-4 bg-white">
          <p className="text-sm text-gray-500">
            Total Earnings
          </p>
          <h2 className="text-xl font-bold">
            ₦{data.totalEarnings.toLocaleString()}
          </h2>
        </div>
      </div>

      {/* OPTIONAL QR PLACEHOLDER */}
      <div className="border rounded-xl p-6 bg-white text-center">
        <h3 className="font-semibold mb-2">
          QR Code (Optional)
        </h3>

        <div className="text-sm text-gray-500">
          You can integrate a QR library like <b>qrcode.react</b> here.
        </div>

        <div className="mt-3 text-xs text-gray-400 break-all">
          {referralLink}
        </div>
      </div>
    </div>
  );
}