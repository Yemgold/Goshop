


import { SectionCard } from "../../components/ui/SectionCard";

const riders = [
  { id: "r1", name: "Mike", email: "mike@mail.com", status: "Active" },
  { id: "r2", name: "David", email: "david@mail.com", status: "Inactive" },
];

export default function Riders() {
  return (
    <SectionCard title="Riders">
      <div className="space-y-3">
        {riders.map((r) => (
          <div key={r.id} className="flex justify-between border-b pb-2">
            <div>
              <p className="font-medium">{r.name}</p>
              <p className="text-xs text-gray-500">{r.email}</p>
            </div>

            <span className="text-sm text-gray-600">
              {r.status}
            </span>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}