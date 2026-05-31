


// import { useAuthStore } from "../../../store/auth.store";

// import { PageHeader } from "../../../components/ui/PageHeader";
// import { SectionCard } from "../../../components/ui/SectionCard";
// import { StatCard } from "../../../components/ui/StatCard";

// import { useBusinessShippingRates } from "../../../hooks/vendor/useBusinessShippingRates";

// export default function DeliveryRate() {
//   const businessId = useAuthStore(
//     (state) => state.user?.businessId
//   );

//   const {
//     data,
//     isLoading,
//     isError,
//   } = useBusinessShippingRates(
//     businessId || ""
//   );

//   /* ================= LOADING ================= */

//   if (isLoading) {
//     return (
//       <div className="p-6 space-y-6">
//         <div className="h-8 w-56 bg-gray-200 rounded animate-pulse" />

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           {[1, 2, 3].map((item) => (
//             <div
//               key={item}
//               className="h-24 bg-gray-200 rounded animate-pulse"
//             />
//           ))}
//         </div>

//         <div className="h-96 bg-gray-200 rounded animate-pulse" />
//       </div>
//     );
//   }

//   /* ================= ERROR ================= */

//   if (isError || !data) {
//     return (
//       <div className="p-6 text-center text-red-500">
//         Failed to load delivery rates.
//       </div>
//     );
//   }

//   /* ================= SUMMARY ================= */

//   const totalStates =
//     data.priceBreakdown.length;

//   const totalWeightRanges =
//     data.priceBreakdown.reduce(
//       (acc, state) =>
//         acc + state.weightRanges.length,
//       0
//     );

//   const totalRoutes =
//     totalWeightRanges;

//   return (
//     <div className="p-6 max-w-7xl mx-auto space-y-6">
//       {/* ================= HEADER ================= */}

//       <PageHeader
//         title="Delivery Rates"
//         subtitle="Manage business delivery pricing by state and weight"
//       />

//       {/* ================= STATS ================= */}

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         <StatCard
//           title="Origin State"
//           value={data.originState}
//         />

//         <StatCard
//           title="Destination States"
//           value={totalStates}
//         />

//         <StatCard
//           title="Weight Routes"
//           value={totalRoutes}
//         />
//       </div>

//       {/* ================= TABLE ================= */}

//       <SectionCard title="Shipping Rate Configuration">
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead>
//               <tr className="border-b text-left text-sm text-gray-500">
//                 <th className="py-3">
//                   Origin State
//                 </th>

//                 <th className="py-3">
//                   Destination State
//                 </th>

//                 <th className="py-3">
//                   Min Weight
//                 </th>

//                 <th className="py-3">
//                   Max Weight
//                 </th>

//                 <th className="py-3">
//                   Weight Range
//                 </th>

//                 <th className="py-3">
//                   Delivery Fee
//                 </th>
//               </tr>
//             </thead>

//             <tbody>
//               {data.priceBreakdown.flatMap(
//                 (state) =>
//                   state.weightRanges.map(
//                     (range) => (
//                       <tr
//                         key={range._id}
//                         className="border-b hover:bg-gray-50"
//                       >
//                         <td className="py-4">
//                           {data.originState}
//                         </td>

//                         <td className="py-4">
//                           {
//                             state.destinationState
//                           }
//                         </td>

//                         <td className="py-4">
//                           {range.min}kg
//                         </td>

//                         <td className="py-4">
//                           {range.max}kg
//                         </td>

//                         <td className="py-4 font-medium">
//                           {range.min}kg -
//                           {range.max}kg
//                         </td>

//                         <td className="py-4 font-semibold text-green-600">
//                           ₦
//                           {range.price.toLocaleString()}
//                         </td>
//                       </tr>
//                     )
//                   )
//               )}
//             </tbody>
//           </table>
//         </div>
//       </SectionCard>

//       {/* ================= SUMMARY CARD ================= */}

//       <SectionCard title="Delivery Logic">
//         <div className="space-y-3 text-sm text-gray-600">
//           <p>
//             Delivery fees are determined
//             by:
//           </p>

//           <ul className="list-disc ml-5 space-y-1">
//             <li>
//               Vendor Origin State
//             </li>

//             <li>
//               Customer Destination
//               State
//             </li>

//             <li>
//               Product Weight Range
//             </li>

//             <li>
//               Matching Delivery Fee
//             </li>
//           </ul>
//         </div>
//       </SectionCard>
//     </div>
//   );
// }





import { useState } from "react";

import { useAuthStore } from "../../../store/auth.store";

import { PageHeader } from "../../../components/ui/PageHeader";
import { SectionCard } from "../../../components/ui/SectionCard";
import { StatCard } from "../../../components/ui/StatCard";
import { Button } from "../../../components/ui/Button";

import { useBusinessShippingRates } from "../../../hooks/vendor/useBusinessShippingRates";
import CreateRateModal from "../../../components/product/CreateRateModal";

import { createBusinessShippingRate } from "../../../services/vendor/vendor.api.service"; 

export default function DeliveryRate() {
  const businessId = useAuthStore(
    (state) => state.user?.businessId
  );

  const [openModal, setOpenModal] =
    useState(false);

  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useBusinessShippingRates(
    businessId || ""
  );

  /* ================= LOADING ================= */

  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <div className="h-8 w-56 bg-gray-200 rounded animate-pulse" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-24 bg-gray-200 rounded animate-pulse"
            />
          ))}
        </div>

        <div className="h-96 bg-gray-200 rounded animate-pulse" />
      </div>
    );
  }

  /* ================= EMPTY ================= */

  if (!data) {
    return (
      <>
        <div className="p-6 max-w-7xl mx-auto">

          <div className="flex justify-between items-center mb-6">

            <PageHeader
              title="Delivery Rates"
              subtitle="Configure delivery fees by state and weight"
            />

            <Button
              onClick={() =>
                setOpenModal(true)
              }
            >
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
          onClose={() =>
            setOpenModal(false)
          }
          businessId={businessId || ""}
          onCreate={async (payload) => {
            await createBusinessShippingRate(
              payload
            );

            await refetch();
          }}
        />
      </>
    );
  }

  /* ================= ERROR ================= */

  if (isError) {
    return (
      <div className="p-6 text-center text-red-500">
        Failed to load delivery rates.
      </div>
    );
  }

  /* ================= SUMMARY ================= */

  const totalStates =
    data.priceBreakdown.length;

  const totalWeightRanges =
    data.priceBreakdown.reduce(
      (acc, state) =>
        acc + state.weightRanges.length,
      0
    );

  const totalRoutes =
    totalWeightRanges;

  return (
    <>
      <div className="p-6 max-w-7xl mx-auto space-y-6">

        {/* HEADER */}

        <div className="flex justify-between items-center">

          <PageHeader
            title="Delivery Rates"
            subtitle="Manage business delivery pricing by state and weight"
          />

          <Button
            onClick={() =>
              setOpenModal(true)
            }
          >
            Add Rate
          </Button>

        </div>

        {/* STATS */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          <StatCard
            title="Origin State"
            value={data.originState}
          />

          <StatCard
            title="Destination States"
            value={totalStates}
          />

          <StatCard
            title="Weight Routes"
            value={totalRoutes}
          />

        </div>

        {/* TABLE */}

        <SectionCard title="Shipping Rate Configuration">

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>

                <tr className="border-b text-left text-sm text-gray-500">

                  <th className="py-3">
                    Origin
                  </th>

                  <th className="py-3">
                    Destination
                  </th>

                  <th className="py-3">
                    Min Weight
                  </th>

                  <th className="py-3">
                    Max Weight
                  </th>

                  <th className="py-3">
                    Weight Range
                  </th>

                  <th className="py-3">
                    Delivery Fee
                  </th>

                  <th className="py-3">
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody>

                {data.priceBreakdown.flatMap(
                  (state) =>
                    state.weightRanges.map(
                      (range) => (
                        <tr
                          key={range._id}
                          className="border-b hover:bg-gray-50"
                        >
                          <td className="py-4">
                            {data.originState}
                          </td>

                          <td className="py-4">
                            {
                              state.destinationState
                            }
                          </td>

                          <td className="py-4">
                            {range.min}kg
                          </td>

                          <td className="py-4">
                            {range.max}kg
                          </td>

                          <td className="py-4 font-medium">
                            {range.min}kg -
                            {range.max}kg
                          </td>

                          <td className="py-4 font-semibold text-green-600">
                            ₦
                            {range.price.toLocaleString()}
                          </td>

                          <td className="py-4">

                            <div className="flex gap-2">

                              <Button
                                className="!h-8 !px-3 text-xs"
                              >
                                Edit
                              </Button>

                              <Button
                                className="!h-8 !px-3 text-xs !bg-red-600"
                              >
                                Delete
                              </Button>

                            </div>

                          </td>

                        </tr>
                      )
                    )
                )}

              </tbody>

            </table>

          </div>

        </SectionCard>

        {/* DELIVERY LOGIC */}

        <SectionCard title="Checkout Delivery Logic">

          <div className="space-y-3 text-sm text-gray-600">

            <p>
              Delivery fees shown at checkout are automatically calculated using:
            </p>

            <ul className="list-disc ml-5 space-y-1">

              <li>
                Vendor Origin State
              </li>

              <li>
                Customer Destination State
              </li>

              <li>
                Product Weight
              </li>

              <li>
                Matching Weight Range
              </li>

              <li>
                Configured Delivery Fee
              </li>

            </ul>

          </div>

        </SectionCard>

      </div>

      {/* CREATE MODAL */}

      <CreateRateModal
        open={openModal}
        onClose={() =>
          setOpenModal(false)
        }
        businessId={businessId || ""}
        onCreate={async (payload) => {
          await createBusinessShippingRate(
            payload
          );

          await refetch();
        }}
      />
    </>
  );
}