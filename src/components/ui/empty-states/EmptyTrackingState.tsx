




import { PackageSearch } from "lucide-react";

type Props = {
  title?: string;
  message?: string;
};

export default function EmptyTrackingState({
  title = "No Tracking Information",
  message = "Enter a valid tracking number to view shipment updates.",
}: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <PackageSearch size={64} className="text-gray-400 mb-4" />

      <h3 className="text-lg font-semibold text-gray-800">
        {title}
      </h3>

      <p className="text-sm text-gray-500 mt-2 max-w-sm">
        {message}
      </p>
    </div>
  );
}