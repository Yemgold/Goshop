


import { Phone, Bike } from "lucide-react";
import { Card } from "../ui/Card";

type Rider = {
  name?: string;
  phone?: string;
  vehicle?: string;
};

type Props = {
  rider?: Rider | null;
};

export default function RiderInfoCard({
  rider,
}: Props) {
  return (
    <Card>
      <h2 className="font-semibold mb-4">
        Your Rider
      </h2>

      <div className="flex items-center justify-between">

        <div className="flex items-center gap-3">

          <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
            <Bike size={20} />
          </div>

          <div>
            <p className="font-medium">
              {rider?.name || "Assigning Rider..."}
            </p>

            <p className="text-sm text-gray-500">
              {rider?.vehicle || "Searching nearby rider"}
            </p>
          </div>

        </div>

        <div>
          {rider?.phone ? (
            <a
              href={`tel:${rider.phone}`}
              className="inline-flex items-center gap-2 px-3 py-2 border rounded-lg text-sm hover:bg-gray-50"
            >
              <Phone size={16} />
              Call
            </a>
          ) : (
            <span className="text-sm text-gray-400">
              Waiting...
            </span>
          )}
        </div>

      </div>
    </Card>
  );
}