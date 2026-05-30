


import { SectionCard } from "../../components/ui/SectionCard";

const orders = [
  { id: "001", user: "John Doe", amount: 4500, status: "Pending" },
  { id: "002", user: "Jane Smith", amount: 12000, status: "Delivered" },
];

export default function Orders() {
  return (
    <SectionCard title="All Orders">
      <div className="space-y-3">
        {orders.map((o) => (
          <div
            key={o.id}
            className="flex justify-between border-b pb-2"
          >
            <div>
              <p className="font-medium">{o.user}</p>
              <p className="text-xs text-gray-500">
                Order #{o.id}
              </p>
            </div>

            <div className="text-right">
              <p className="font-semibold">₦{o.amount}</p>
              <p className="text-xs text-gray-400">
                {o.status}
              </p>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}