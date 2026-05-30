


import { useMemo } from "react";
import {
  TrendingUp,
  MousePointerClick,
  ShoppingBag,
  Share2,
  Users,
  ArrowUpRight,
} from "lucide-react";

import { Card } from "../../../components/ui/Card";
import { PageHeader } from "../../../components/ui/PageHeader";
import { Button } from "../../../components/ui/Button";

import { useVendorProducts } from "../../../hooks/vendor/useVendorProducts";

export default function ProductShareAnalytics() {
  /* ================= PRODUCTS ================= */
  const { data } = useVendorProducts(1, 100);

  const products = data?.products ?? [];

  /* ================= MOCK ANALYTICS ================= */
  const analytics = useMemo(() => {
    return products.map((product, index) => ({
      ...product,

      clicks: 120 + index * 23,
      shares: 45 + index * 12,
      conversions: 8 + index * 2,
      revenue: 15000 + index * 8500,

      platformBreakdown: {
        whatsapp: 60 + index * 5,
        facebook: 30 + index * 3,
        telegram: 12 + index,
      },
    }));
  }, [products]);

  /* ================= TOTALS ================= */
  const totals = useMemo(() => {
    return analytics.reduce(
      (acc, item) => {
        acc.clicks += item.clicks;
        acc.shares += item.shares;
        acc.conversions += item.conversions;
        acc.revenue += item.revenue;

        return acc;
      },
      {
        clicks: 0,
        shares: 0,
        conversions: 0,
        revenue: 0,
      }
    );
  }, [analytics]);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">

      {/* ================= HEADER ================= */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        <PageHeader title="Product Share Analytics" />

        <Button>
          Export Report
        </Button>
      </div>

      {/* ================= HERO ================= */}
      <div
        className="
          relative
          overflow-hidden
          rounded-3xl
          bg-gradient-to-r
          from-black
          via-gray-900
          to-black
          p-8
          text-white
          shadow-2xl
        "
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-white blur-3xl" />
        </div>

        <div className="relative z-10 max-w-3xl">

          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/10 px-4 py-2 rounded-full mb-5">
            <TrendingUp size={16} />
            Viral Commerce Dashboard
          </div>

          <h1 className="text-4xl md:text-5xl font-black leading-tight">
            Turn product shares into revenue 🚀
          </h1>

          <p className="text-white/70 mt-5 text-lg leading-relaxed">
            Track clicks, shares, conversions, and
            social performance across WhatsApp,
            Facebook, Telegram, and more.
          </p>
        </div>
      </div>

      {/* ================= OVERVIEW STATS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

        {/* CLICKS */}
        <Card className="p-6 rounded-3xl border shadow-sm">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-gray-500 text-sm">
                Total Clicks
              </p>

              <h2 className="text-3xl font-bold mt-2">
                {totals.clicks.toLocaleString()}
              </h2>
            </div>

            <div className="w-14 h-14 rounded-2xl bg-black text-white flex items-center justify-center">
              <MousePointerClick />
            </div>
          </div>

          <div className="flex items-center gap-2 mt-5 text-green-600 text-sm">
            <ArrowUpRight size={16} />
            +24% this week
          </div>
        </Card>

        {/* SHARES */}
        <Card className="p-6 rounded-3xl border shadow-sm">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-gray-500 text-sm">
                Total Shares
              </p>

              <h2 className="text-3xl font-bold mt-2">
                {totals.shares.toLocaleString()}
              </h2>
            </div>

            <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center">
              <Share2 />
            </div>
          </div>

          <div className="flex items-center gap-2 mt-5 text-green-600 text-sm">
            <ArrowUpRight size={16} />
            Viral growth increasing
          </div>
        </Card>

        {/* CONVERSIONS */}
        <Card className="p-6 rounded-3xl border shadow-sm">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-gray-500 text-sm">
                Conversions
              </p>

              <h2 className="text-3xl font-bold mt-2">
                {totals.conversions.toLocaleString()}
              </h2>
            </div>

            <div className="w-14 h-14 rounded-2xl bg-green-600 text-white flex items-center justify-center">
              <ShoppingBag />
            </div>
          </div>

          <div className="flex items-center gap-2 mt-5 text-green-600 text-sm">
            <ArrowUpRight size={16} />
            High buyer intent
          </div>
        </Card>

        {/* REVENUE */}
        <Card className="p-6 rounded-3xl border shadow-sm">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-gray-500 text-sm">
                Revenue
              </p>

              <h2 className="text-3xl font-bold mt-2">
                ₦{totals.revenue.toLocaleString()}
              </h2>
            </div>

            <div className="w-14 h-14 rounded-2xl bg-purple-600 text-white flex items-center justify-center">
              <Users />
            </div>
          </div>

          <div className="flex items-center gap-2 mt-5 text-green-600 text-sm">
            <ArrowUpRight size={16} />
            Social traffic converting
          </div>
        </Card>

      </div>

      {/* ================= PRODUCT ANALYTICS ================= */}
      <div className="space-y-6">

        <div>
          <h2 className="text-2xl font-bold">
            Product Performance
          </h2>

          <p className="text-gray-500 mt-1">
            See which products are performing best
            across social sharing platforms.
          </p>
        </div>

        <div className="grid gap-6">

          {analytics.map((product) => {
            const image =
              product.media?.[0]?.url ||
              "/images/products.png";

            return (
              <Card
                key={product._id}
                className="
                  overflow-hidden
                  rounded-3xl
                  border
                  shadow-sm
                "
              >
                <div className="grid md:grid-cols-[220px_1fr]">

                  {/* IMAGE */}
                  <div className="relative h-full min-h-[220px] bg-gray-100">

                    <img
                      src={image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />

                    <div
                      className="
                        absolute
                        top-4
                        left-4
                        bg-black/70
                        text-white
                        px-3
                        py-1
                        rounded-full
                        text-xs
                        backdrop-blur-xl
                      "
                    >
                      🔥 Viral Product
                    </div>
                  </div>

                  {/* CONTENT */}
                  <div className="p-6 space-y-6">

                    {/* TOP */}
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">

                      <div>
                        <h3 className="text-2xl font-bold">
                          {product.name}
                        </h3>

                        <p className="text-gray-500 mt-2 max-w-xl">
                          Track how this product
                          performs when shared on
                          social media platforms.
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="text-sm text-gray-500">
                          Revenue Generated
                        </p>

                        <h2 className="text-3xl font-black">
                          ₦
                          {product.revenue.toLocaleString()}
                        </h2>
                      </div>
                    </div>

                    {/* METRICS */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

                      <div className="rounded-2xl border p-4">
                        <p className="text-gray-500 text-sm">
                          Clicks
                        </p>

                        <h4 className="text-2xl font-bold mt-2">
                          {product.clicks}
                        </h4>
                      </div>

                      <div className="rounded-2xl border p-4">
                        <p className="text-gray-500 text-sm">
                          Shares
                        </p>

                        <h4 className="text-2xl font-bold mt-2">
                          {product.shares}
                        </h4>
                      </div>

                      <div className="rounded-2xl border p-4">
                        <p className="text-gray-500 text-sm">
                          Orders
                        </p>

                        <h4 className="text-2xl font-bold mt-2">
                          {product.conversions}
                        </h4>
                      </div>

                      <div className="rounded-2xl border p-4">
                        <p className="text-gray-500 text-sm">
                          Conversion Rate
                        </p>

                        <h4 className="text-2xl font-bold mt-2">
                          {Math.round(
                            (product.conversions /
                              product.clicks) *
                              100
                          )}
                          %
                        </h4>
                      </div>

                    </div>

                    {/* PLATFORM BREAKDOWN */}
                    <div className="space-y-4">

                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-lg">
                          Traffic Sources
                        </h4>

                        <p className="text-sm text-gray-500">
                          Social breakdown
                        </p>
                      </div>

                      <div className="space-y-4">

                        {/* WHATSAPP */}
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span>WhatsApp</span>
                            <span>
                              {
                                product.platformBreakdown
                                  .whatsapp
                              }
                              %
                            </span>
                          </div>

                          <div className="h-3 rounded-full bg-gray-100 overflow-hidden">
                            <div
                              className="h-full bg-green-500 rounded-full"
                              style={{
                                width: `${product.platformBreakdown.whatsapp}%`,
                              }}
                            />
                          </div>
                        </div>

                        {/* FACEBOOK */}
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span>Facebook</span>
                            <span>
                              {
                                product.platformBreakdown
                                  .facebook
                              }
                              %
                            </span>
                          </div>

                          <div className="h-3 rounded-full bg-gray-100 overflow-hidden">
                            <div
                              className="h-full bg-blue-500 rounded-full"
                              style={{
                                width: `${product.platformBreakdown.facebook}%`,
                              }}
                            />
                          </div>
                        </div>

                        {/* TELEGRAM */}
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span>Telegram</span>
                            <span>
                              {
                                product.platformBreakdown
                                  .telegram
                              }
                              %
                            </span>
                          </div>

                          <div className="h-3 rounded-full bg-gray-100 overflow-hidden">
                            <div
                              className="h-full bg-sky-500 rounded-full"
                              style={{
                                width: `${product.platformBreakdown.telegram}%`,
                              }}
                            />
                          </div>
                        </div>

                      </div>
                    </div>

                    {/* ACTIONS */}
                    <div className="flex flex-wrap gap-4 pt-2">

                      <Button>
                        Boost Product
                      </Button>

                      <Button variant="secondary">
                        Generate Viral Link
                      </Button>

                    </div>

                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}