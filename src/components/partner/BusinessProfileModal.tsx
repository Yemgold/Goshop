
import { useState } from "react";
import { X } from "lucide-react";
import { partnersService } from "../../services/partners.services";
import type { BusinessProfilePayload } from "../../types/partners.types";

type Props = {
  open: boolean;
  onClose: () => void;
  businessId?: string;
  existingData?: {
    street?: string;
    state?: string;
    town?: string;
    country?: string;
    code?: string;
  };
};

export default function BusinessProfileModal({
  open,
  onClose,
  businessId,
  existingData,
}: Props) {
  const [street, setStreet] = useState(existingData?.street || "");
  const [state, setState] = useState(existingData?.state || "");
  const [town, setTown] = useState(existingData?.town || "");
  const [country, setCountry] = useState(existingData?.country || "");
  const [code, setCode] = useState(existingData?.code || "");

  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handleSubmit = async () => {
    try {
      setLoading(true);

      if (!businessId) {
        throw new Error("Business ID is required");
      }

      const payload: BusinessProfilePayload = {
        street,
        state,
        town,
        ...(country ? { country } : {}),
        ...(code ? { code } : {}),
      };

      await partnersService.partnersBusinessProfile(
        businessId,
        payload
      );

      onClose();
    } catch (err) {
      console.error("Failed to save business address", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-5">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">
            Add Business Address
          </h2>

          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <X size={18} />
          </button>
        </div>

        {/* FORM */}
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Street"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            className="w-full border rounded-lg p-2"
          />

          <input
            type="text"
            placeholder="Town"
            value={town}
            onChange={(e) => setTown(e.target.value)}
            className="w-full border rounded-lg p-2"
          />

          <input
            type="text"
            placeholder="State"
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="w-full border rounded-lg p-2"
          />

          <input
            type="text"
            placeholder="Country (optional)"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-full border rounded-lg p-2"
          />

          <input
            type="text"
            placeholder="Code (optional)"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full border rounded-lg p-2"
          />
        </div>

        {/* ACTIONS */}
        <div className="flex justify-end gap-2 mt-5">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-4 py-2 rounded-lg bg-black text-white"
          >
            {loading ? "Saving..." : "Save Address"}
          </button>
        </div>
      </div>
    </div>
  );
}