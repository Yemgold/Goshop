


// import { useEarnings, useEarningsHistory } from "../../hooks/promoter/promoter.hooks";
// import { PageHeader } from "../../components/ui/PageHeader";

// export default function PromoterEarnings() {
//   const { data: earnings, isLoading, isError } = useEarnings();
//   const {
//     data: history,
//     isLoading: historyLoading,
//     isError: historyError,
//   } = useEarningsHistory();

//   if (isLoading || historyLoading) {
//     return (
//       <div className="p-6 text-gray-500">
//         Loading earnings...
//       </div>
//     );
//   }

//   if (isError || historyError || !earnings) {
//     return (
//       <div className="p-6 text-red-500">
//         Failed to load earnings data
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 space-y-6">
//       <PageHeader title="Earnings" />

//       {/* ================= SUMMARY CARDS ================= */}
//       <div className="grid md:grid-cols-4 gap-4">
//         <div className="border rounded-xl p-4">
//           <p className="text-sm text-gray-500">Total Earnings</p>
//           <h2 className="text-2xl font-bold">
//             ₦{earnings.total?.toLocaleString()}
//           </h2>
//         </div>

//         <div className="border rounded-xl p-4">
//           <p className="text-sm text-gray-500">Pending</p>
//           <h2 className="text-2xl font-bold text-yellow-600">
//             ₦{earnings.pending?.toLocaleString()}
//           </h2>
//         </div>

//         <div className="border rounded-xl p-4">
//           <p className="text-sm text-gray-500">Withdrawn</p>
//           <h2 className="text-2xl font-bold text-green-600">
//             ₦{earnings.withdrawn?.toLocaleString()}
//           </h2>
//         </div>

//         <div className="border rounded-xl p-4">
//           <p className="text-sm text-gray-500">Available</p>
//           <h2 className="text-2xl font-bold text-blue-600">
//             ₦{earnings.available?.toLocaleString()}
//           </h2>
//         </div>
//       </div>

//       {/* ================= EARNINGS HISTORY ================= */}
//       <div className="border rounded-xl p-4">
//         <h3 className="font-semibold mb-3">
//           Earnings History
//         </h3>

//         {!history || history.length === 0 ? (
//           <p className="text-sm text-gray-500">
//             No earnings history yet.
//           </p>
//         ) : (
//           <div className="space-y-3">
//             {history.map((item: any) => (
//               <div
//                 key={item.id}
//                 className="flex justify-between items-center border-b py-2"
//               >
//                 <div>
//                   <p className="text-sm font-medium">
//                     {item.source || "Commission"}
//                   </p>
//                   <p className="text-xs text-gray-500">
//                     {new Date(item.createdAt).toLocaleDateString()}
//                   </p>
//                 </div>

//                 <div
//                   className={`font-semibold ${
//                     item.type === "credit"
//                       ? "text-green-600"
//                       : "text-red-500"
//                   }`}
//                 >
//                   {item.type === "credit" ? "+" : "-"}₦
//                   {item.amount.toLocaleString()}
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }





import { useEarnings, useEarningsHistory } from "../../hooks/promoter/promoter.hooks";
import { PageHeader } from "../../components/ui/PageHeader";


type EarningsHistoryItem = {
  id: string;
  source?: string;
  createdAt: string;
  type: "credit" | "debit";
  amount: number;
};

export default function PromoterEarnings() {
  const { data: earnings, isLoading, isError } = useEarnings();

  const {
    data: historyData,
    isLoading: historyLoading,
    isError: historyError,
  } = useEarningsHistory();

  if (isLoading || historyLoading) {
    return (
      <div className="p-6 text-gray-500">
        Loading earnings...
      </div>
    );
  }

  if (isError || historyError || !earnings) {
    return (
      <div className="p-6 text-red-500">
        Failed to load earnings data
      </div>
    );
  }

  // ✅ TYPE SAFETY FIX
  const history: EarningsHistoryItem[] = Array.isArray(historyData)
    ? historyData
    : [];

  return (
    <div className="p-6 space-y-6">
      <PageHeader title="Earnings" />

      {/* ================= SUMMARY ================= */}
      <div className="grid md:grid-cols-4 gap-4">
        <div className="border rounded-xl p-4">
          <p className="text-sm text-gray-500">Total Earnings</p>
          <h2 className="text-2xl font-bold">
            ₦{earnings.total?.toLocaleString()}
          </h2>
        </div>

        <div className="border rounded-xl p-4">
          <p className="text-sm text-gray-500">Pending</p>
          <h2 className="text-2xl font-bold text-yellow-600">
            ₦{earnings.pending?.toLocaleString()}
          </h2>
        </div>

        <div className="border rounded-xl p-4">
          <p className="text-sm text-gray-500">Withdrawn</p>
          <h2 className="text-2xl font-bold text-green-600">
            ₦{earnings.withdrawn?.toLocaleString()}
          </h2>
        </div>

        <div className="border rounded-xl p-4">
          <p className="text-sm text-gray-500">Available</p>
          <h2 className="text-2xl font-bold text-blue-600">
            ₦{earnings.available?.toLocaleString()}
          </h2>
        </div>
      </div>

      {/* ================= HISTORY ================= */}
      <div className="border rounded-xl p-4">
        <h3 className="font-semibold mb-3">
          Earnings History
        </h3>

        {history.length === 0 ? (
          <p className="text-sm text-gray-500">
            No earnings history yet.
          </p>
        ) : (
          <div className="space-y-3">
            {history.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center border-b py-2"
              >
                <div>
                  <p className="text-sm font-medium">
                    {item.source || "Commission"}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div
                  className={`font-semibold ${
                    item.type === "credit"
                      ? "text-green-600"
                      : "text-red-500"
                  }`}
                >
                  {item.type === "credit" ? "+" : "-"}₦
                  {item.amount.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}