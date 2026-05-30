



import { useParams, useNavigate } from "react-router-dom";
import { useCampaignDetails } from "../../hooks/promoter/promoter.hooks";
import { PageHeader } from "../../components/ui/PageHeader";

type CampaignStatus = "active" | "paused" | "ended";

type CampaignItem = {
  productId: string;
  title: string;
  clicks: number;
  conversions: number;
  revenue: number;
};

type CampaignDetailsType = {
  id: string;
  title: string;
  description: string;
  commissionRate: number;
  status: CampaignStatus;
  startDate?: string;
  endDate?: string;

  totalClicks: number;
  totalConversions: number;
  totalRevenue: number;

  products?: CampaignItem[];
};

export default function CampaignDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // ✅ avoid calling API with empty id
  const campaignId = id ?? "";

  const { data, isLoading, isError } = useCampaignDetails(
    campaignId,
    {
      enabled: !!campaignId,
    } as any
  );

  const campaign = data as CampaignDetailsType | undefined;

  const products: CampaignItem[] = campaign?.products ?? [];

  if (isLoading) {
    return <div className="p-6 text-gray-500">Loading...</div>;
  }

  if (isError || !campaign) {
    return (
      <div className="p-6 text-red-500">
        Failed to load campaign

        <button
          onClick={() => navigate("/promoter/campaigns")}
          className="px-4 py-2 bg-black text-white rounded-lg mt-3 block"
        >
          Back
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <PageHeader title="Campaign Details" />

      {/* HEADER */}
      <div className="border p-4 rounded-xl">
        <h1 className="text-2xl font-bold">
          {campaign.title ?? "Untitled Campaign"}
        </h1>
        <p className="text-gray-600">
          {campaign.description ?? "No description provided"}
        </p>
      </div>

      {/* PRODUCTS */}
      <div className="border rounded-xl p-4">
        <h2 className="font-semibold mb-3">
          Product Performance
        </h2>

        {products.length === 0 ? (
          <p className="text-gray-500">
            No products found
          </p>
        ) : (
          <div className="space-y-3">
            {products.map((item) => (
              <div
                key={item.productId}
                className="flex justify-between border-b pb-2"
              >
                <div>
                  <p className="font-medium">
                    {item.title}
                  </p>
                  <p className="text-xs text-gray-500">
                    Clicks: {item.clicks ?? 0} | Conversions:{" "}
                    {item.conversions ?? 0}
                  </p>
                </div>

                <div className="text-sm font-bold">
                  ₦
                  {(item.revenue ?? 0).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* BACK BUTTON */}
      <button
        onClick={() =>
          navigate("/promoter/campaigns")
        }
        className="px-4 py-2 bg-black text-white rounded-lg"
      >
        Back
      </button>
    </div>
  );
}