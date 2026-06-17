import { useState } from "react";
import { useAuthStore } from "../../../store/auth.store"; 

import { PageHeader } from "../../../components/ui/PageHeader";
import { SectionCard } from "../../../components/ui/SectionCard";
import { StatCard } from "../../../components/ui/StatCard";
import { Button } from "../../../components/ui/Button";

import CreateRateModal from "../../../components/product/CreateRateModal";
import { createBusinessShippingRate } from "../../../services/vendor/vendor.api.service";

import { useBusinessShippingRates } from "../../../hooks/shipping/useBusinessShippingRates";

import type { BusinessShippingRate } from "../../../types";

export default function DeliveryRate() {
  const businessId = useAuthStore((state) => state.user?.businessId);

  const [openRow, setOpenRow] = useState<string | null>(null);
  const [openModal, setOpenModal] = useState(false);

const {
  data = [],
  isLoading,
  isError,
  refetch,
} = useBusinessShippingRates(businessId || "");   


  /* ================= LOADING ================= */

  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <div className="h-8 w-56 bg-gray-200 rounded animate-pulse" />
        <div className="h-96 bg-gray-200 rounded animate-pulse" />
      </div>
    );
  }

  /* ================= ERROR ================= */

  if (isError) {
    return (
      <div className="p-6 text-center text-red-500">
        Failed to load delivery rates
      </div>
    );
  }

  /* ================= EMPTY ================= */

  if (!data || data.length === 0) {
    return (
      <>
        <div className="p-6 max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <PageHeader
              title="Delivery Rates"
              subtitle="Configure delivery fees by state and weight"
            />

            <Button onClick={() => setOpenModal(true)}>
              Add Rate
            </Button>
          </div>

          <SectionCard title="No Delivery Rate Found">
            <div className="py-20 text-center text-gray-500">
              No delivery pricing has been configured yet.
            </div>
          </SectionCard>
        </div>

        <CreateRateModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          businessId={businessId || ""}
          onCreate={async (payload) => {
            await createBusinessShippingRate(payload);
            await refetch();
          }}
        />
      </>
    );
  }

  /* ================= SAFE DATA ================= */

/* ================= SAFE DATA ================= */

const totalRoutes = data.length;

const totalWeightRanges = data.reduce(
  (acc, rate) => acc + rate.weightRanges.length,
  0
);

const originState =
  data.length > 0
    ? data[0].originState
    : "-";

  /* ================= UI ================= */

  return (
    <>
      <div className="p-6 max-w-7xl mx-auto space-y-6">

        {/* HEADER */}
        <div className="flex justify-between items-center">
          <PageHeader
            title="Delivery Rate"
            subtitle="Vendor shipping configuration"
          />

          <Button onClick={() => setOpenModal(true)}>
            Add Rate
          </Button>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard title="Total Routes" value={totalRoutes} />
          <StatCard title="Weight Ranges" value={data.length? totalWeightRanges / data.length: 0}/>
          <StatCard title="Origin State" value={originState} />
        </div>

        {/* TABLE */}


      <SectionCard title="Shipping Rate Configuration">

  {/* MOBILE VIEW */}
  <div className="block md:hidden space-y-4">
    {data.map((rate: BusinessShippingRate) => {
      const isOpen = openRow === rate._id;

      return (
        <div
          key={rate._id}
          className="border rounded-lg bg-white shadow-sm"
        >
          <div className="p-4 space-y-2">
            <div>
              <p className="text-xs text-gray-500">Origin</p>
              <p className="font-medium">{rate.originState}</p>
            </div>

            <div>
              <p className="text-xs text-gray-500">Destination</p>
              <p className="font-semibold text-blue-600">
                {rate.destinationState}
              </p>
            </div>

            <Button
              className="w-full"
              onClick={() =>
                setOpenRow(isOpen ? null : rate._id)
              }
            >
              {isOpen ? "Hide Weight Ranges" : "View Weight Ranges"}
            </Button>
          </div>

          {isOpen && (
            <div className="border-t bg-gray-50 p-3 space-y-3">
              {rate.weightRanges.map((range, i) => (
                <div
                  key={i}
                  className="border rounded p-3 bg-white"
                >
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-gray-500">Range</p>
                      <p>
                        {range.min}kg - {range.max ?? "∞"}kg
                      </p>
                    </div>

                    <div>
                      <p className="text-gray-500">Fee</p>
                      <p className="font-bold text-green-600">
                        ₦{range.price.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-3">
                    <Button className="flex-1 !h-8 text-xs">
                      Edit
                    </Button>

                    <Button className="flex-1 !h-8 text-xs !bg-red-600">
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      );
    })}
  </div>

  {/* DESKTOP TABLE */}
  <div className="hidden md:block overflow-x-auto">
    <table className="w-full">
     

              <thead>
                <tr className="border-b text-left text-sm text-gray-500">
                  <th className="py-3">Origin</th>
                  <th className="py-3">Destination</th>
                  <th className="py-3">Min Weight</th>
                  <th className="py-3">Max Weight</th>
                  <th className="py-3">Range</th>
                  <th className="py-3">Fee</th>
                  <th className="py-3">Actions</th>
                </tr>
              </thead>

              <tbody>
                {data.map((rate: BusinessShippingRate) => {
                  const isOpen = openRow === rate._id;

                  return (
                    <>
                      {/* MAIN ROW */}
                      <tr
                        key={rate._id}
                        className="border-b hover:bg-gray-50 cursor-pointer"
                        onClick={() =>
                          setOpenRow(isOpen ? null : rate._id)
                        }
                      >
                        <td className="py-4 font-medium">
                          {rate.originState}
                        </td>

                        <td className="py-4 font-semibold text-blue-600">
                          {rate.destinationState}
                        </td>

                        <td colSpan={4} className="py-4 text-sm text-gray-400">
                          Click to view weight ranges
                        </td>

                        <td className="py-4">
                          <Button className="!h-8 !px-3 text-xs">
                            {isOpen ? "Hide" : "View"}
                          </Button>
                        </td>
                      </tr>

                      {/* EXPANDED ROW */}
                      {isOpen && (
                        <tr>
                          <td colSpan={7} className="bg-gray-50 p-4">
                            <div className="space-y-3">
                              {rate.weightRanges.map((range, i) => (
                                <div
                                  key={i}
                                  className="grid grid-cols-4 gap-4 items-center bg-white p-3 rounded border"
                                >
                                  <div>
                                    <p className="text-xs text-gray-500">Range</p>
                                    <p>
                                      {range.min}kg -{" "}
                                      {range.max ?? "∞"}kg
                                    </p>
                                  </div>

                                  <div>
                                    <p className="text-xs text-gray-500">Min</p>
                                    <p>{range.min}kg</p>
                                  </div>

                                  <div>
                                    <p className="text-xs text-gray-500">Max</p>
                                    <p>{range.max ?? "∞"}kg</p>
                                  </div>

                                  <div className="flex justify-between items-center">
                                    <div>
                                      <p className="text-xs text-gray-500">Fee</p>
                                      <p className="font-bold text-green-600">
                                        ₦{range.price.toLocaleString()}
                                      </p>
                                    </div>

                                    <div className="flex gap-2">
                                      <Button className="!h-7 !px-2 text-xs">
                                        Edit
                                      </Button>

                                      <Button className="!h-7 !px-2 text-xs !bg-red-600">
                                        Delete
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  );
                })}
              </tbody>

        
    </table>
  </div>

</SectionCard>


      </div>

      {/* MODAL */}
      <CreateRateModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        businessId={businessId || ""}
        onCreate={async (payload) => {
          await createBusinessShippingRate(payload);
          await refetch();
        }}
      />
    </>
  );
}









