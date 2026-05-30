

import { useEarningsHistory } from "../../hooks/promoter/promoter.hooks";
import { PageHeader } from "../../components/ui/PageHeader";

type EarningsSummary = {
  total: number;
  pending: number;
  withdrawn: number;
  available: number;
};

type EarningsHistoryItem = {
  id: string;
  source?: string;
  createdAt: string;
  type: "credit" | "debit";
  amount: number;
};

export default function EarningsHistory() {
  const { data, isLoading, isError } = useEarningsHistory();

  if (isLoading) {
    return (
      <div className="p-6 text-gray-500">
        Loading earnings history...
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="p-6 text-red-500">
        Failed to load earnings history
      </div>
    );
  }

  // ✅ STRICT TYPE GUARD
  const isSummary = Array.isArray(data) === false;

  const summary: EarningsSummary | null = isSummary
    ? (data as EarningsSummary)
    : null;

  const history: EarningsHistoryItem[] = Array.isArray(data)
    ? (data as EarningsHistoryItem[])
    : [];

  return (
    <div className="p-6 space-y-6">
      <PageHeader title="Earnings History" />

      {/* ================= SUMMARY ================= */}
      {summary && (
        <div className="grid md:grid-cols-4 gap-4">
          <div className="border rounded-xl p-4">
            <p className="text-sm text-gray-500">Total</p>
            <h2 className="text-xl font-bold">
              ₦{summary.total.toLocaleString()}
            </h2>
          </div>

          <div className="border rounded-xl p-4">
            <p className="text-sm text-gray-500">Pending</p>
            <h2 className="text-xl font-bold text-yellow-600">
              ₦{summary.pending.toLocaleString()}
            </h2>
          </div>

          <div className="border rounded-xl p-4">
            <p className="text-sm text-gray-500">Withdrawn</p>
            <h2 className="text-xl font-bold text-red-500">
              ₦{summary.withdrawn.toLocaleString()}
            </h2>
          </div>

          <div className="border rounded-xl p-4">
            <p className="text-sm text-gray-500">Available</p>
            <h2 className="text-xl font-bold text-green-600">
              ₦{summary.available.toLocaleString()}
            </h2>
          </div>
        </div>
      )}

      {/* ================= HISTORY ================= */}
      <div className="border rounded-xl p-4">
        {history.length === 0 ? (
          <p className="text-sm text-gray-500">
            No earnings history found.
          </p>
        ) : (
          <div className="space-y-3">
            {history.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center border-b py-3"
              >
                <div>
                  <p className="text-sm font-medium">
                    {item.source || "Commission"}
                  </p>

                  <p className="text-xs text-gray-500">
                    {new Date(item.createdAt).toLocaleString()}
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






// import { useEarningsHistory } from "../../hooks/promoter/promoter.hooks";
// import { PageHeader } from "../../components/ui/PageHeader";

// export default function EarningsHistory() {
//   const { data, isLoading, isError } = useEarningsHistory();

//   if (isLoading) {
//     return (
//       <div className="p-6 text-gray-500">
//         Loading earnings history...
//       </div>
//     );
//   }

//   if (isError || !data) {
//     return (
//       <div className="p-6 text-red-500">
//         Failed to load earnings history
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 space-y-6">
//       <PageHeader title="Earnings History" />

//       {/* LIST */}
//       <div className="border rounded-xl p-4">
//         {data.length === 0 ? (
//           <p className="text-sm text-gray-500">
//             No earnings history found.
//           </p>
//         ) : (
//           <div className="space-y-3">
//             {data.map((item: any) => (
//               <div
//                 key={item.id}
//                 className="flex justify-between items-center border-b py-3"
//               >
//                 {/* LEFT */}
//                 <div>
//                   <p className="text-sm font-medium">
//                     {item.source || "Commission"}
//                   </p>

//                   <p className="text-xs text-gray-500">
//                     {new Date(item.createdAt).toLocaleString()}
//                   </p>
//                 </div>

//                 {/* RIGHT */}
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