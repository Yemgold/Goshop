

import { SectionCard } from "../../components/ui/SectionCard";

const promoters = [
  { id: "p1", name: "Alice", email: "alice@mail.com", status: "Active" },
  { id: "p2", name: "Bob", email: "bob@mail.com", status: "Pending" },
];

export default function Promoters() {
  return (
    <SectionCard title="Promoters">
      <div className="space-y-3">
        {promoters.map((p) => (
          <div key={p.id} className="flex justify-between border-b pb-2">
            <div>
              <p className="font-medium">{p.name}</p>
              <p className="text-xs text-gray-500">{p.email}</p>
            </div>

            <span className="text-sm text-gray-600">
              {p.status}
            </span>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}