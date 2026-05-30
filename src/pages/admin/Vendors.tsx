

import { SectionCard } from "../../components/ui/SectionCard";

const vendors = [
  { id: "v1", name: "Tech Store", email: "tech@store.com", products: 12 },
  { id: "v2", name: "Fashion Hub", email: "fashion@hub.com", products: 8 },
];

export default function Vendors() {
  return (
    <SectionCard title="Vendors">
      <div className="space-y-3">
        {vendors.map((v) => (
          <div key={v.id} className="flex justify-between border-b pb-2">
            <div>
              <p className="font-medium">{v.name}</p>
              <p className="text-xs text-gray-500">{v.email}</p>
            </div>

            <span className="text-sm text-gray-600">
              {v.products} products
            </span>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}