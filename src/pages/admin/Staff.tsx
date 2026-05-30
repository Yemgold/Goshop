


import { SectionCard } from "../../components/ui/SectionCard";

const staff = [
  { id: "s1", name: "Admin A", role: "Support", status: "Active" },
  { id: "s2", name: "Admin B", role: "Moderator", status: "Active" },
];

export default function Staff() {
  return (
    <SectionCard title="Staff">
      <div className="space-y-3">
        {staff.map((s) => (
          <div key={s.id} className="flex justify-between border-b pb-2">
            <div>
              <p className="font-medium">{s.name}</p>
              <p className="text-xs text-gray-500">{s.role}</p>
            </div>

            <span className="text-sm text-gray-600">
              {s.status}
            </span>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}