

import { useEffect, useState } from "react";
import {
  X,
  Building2,
  MapPin,
  Phone,
  Bike,
} from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
  pickupCenter: any;
};

export default function BecomeRiderModal({
  open,
  onClose,
  pickupCenter,
}: Props) {
  const [vehicleType, setVehicleType] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [message, setMessage] =
    useState("");

  // Prevent background scrolling
  useEffect(() => {
    if (open) {
      document.body.style.overflow =
        "hidden";
    } else {
      document.body.style.overflow =
        "auto";
    }

    return () => {
      document.body.style.overflow =
        "auto";
    };
  }, [open]);

  if (!open || !pickupCenter) return null;

  const handleSubmit = () => {
    const payload = {
      pickupCenterId:
        pickupCenter._id,
      vehicleType,
      phone,
      message,
    };

    console.log(payload);

    // TODO
    // Call Apply Rider API

    onClose();

    setVehicleType("");
    setPhone("");
    setMessage("");
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">

      {/* Modal */}

      <div
        className="
          bg-white
          rounded-2xl
          shadow-2xl
          w-full
          max-w-2xl
          max-h-[90vh]
          flex
          flex-col
          overflow-hidden
        "
      >

        {/* Header */}

        <div className="flex items-center justify-between border-b p-6 bg-white shrink-0">

          <div>

            <h2 className="text-2xl font-bold">
              Apply as Rider
            </h2>

            <p className="text-gray-500 mt-1">
              Complete your application.
            </p>

          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition"
          >
            <X size={22} />
          </button>

        </div>

        {/* Scrollable Body */}

        <div
          className="
            flex-1
            overflow-y-auto
            p-6
            space-y-6
          "
        >

          {/* Pickup Center */}

          <div className="rounded-xl border bg-gray-50 p-5">

            <div className="flex items-center gap-3 mb-4">

              <div className="bg-green-100 p-3 rounded-full">

                <Building2
                  size={22}
                  className="text-green-600"
                />

              </div>

              <div>

                <h3 className="font-bold text-lg">
                  {pickupCenter.name}
                </h3>

                <p className="text-sm text-green-600">
                  ⭐{" "}
                  {pickupCenter.rating ??
                    "New"}
                </p>

              </div>

            </div>

            <div className="space-y-2 text-sm text-gray-600">

              <p className="flex items-center gap-2">
                <MapPin size={16} />
                {pickupCenter.town},{" "}
                {pickupCenter.state}
              </p>

              <p className="flex items-center gap-2">
                <Phone size={16} />
                {pickupCenter.phone}
              </p>

            </div>

          </div>

          {/* Vehicle */}

          <div>

            <label className="block font-semibold mb-3">
              Vehicle Type
            </label>

            <div className="grid md:grid-cols-2 gap-3">

              {[
                "Motorcycle",
                "Bicycle",
                "Car",
                "Van",
              ].map((item) => (

                <label
                  key={item}
                  className={`border rounded-xl p-4 cursor-pointer transition flex items-center ${
                    vehicleType === item
                      ? "border-green-600 bg-green-50"
                      : "hover:border-green-300"
                  }`}
                >

                  <input
                    type="radio"
                    className="mr-3"
                    value={item}
                    checked={
                      vehicleType === item
                    }
                    onChange={(e) =>
                      setVehicleType(
                        e.target.value
                      )
                    }
                  />

                  <Bike
                    size={18}
                    className="mr-2 text-green-600"
                  />

                  {item}

                </label>

              ))}

            </div>

          </div>

          {/* Phone */}

          <div>

            <label className="block font-semibold mb-2">
              Phone Number
            </label>

            <input
              type="text"
              placeholder="08012345678"
              value={phone}
              onChange={(e) =>
                setPhone(
                  e.target.value
                )
              }
              className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 outline-none"
            />

          </div>

          {/* Message */}

          <div>

            <label className="block font-semibold mb-2">
              Why do you want to become
              a rider?
            </label>

            <textarea
              rows={5}
              value={message}
              onChange={(e) =>
                setMessage(
                  e.target.value
                )
              }
              placeholder="Tell the Pickup Center about yourself (optional)..."
              className="w-full border rounded-lg px-4 py-3 resize-none focus:ring-2 focus:ring-green-500 outline-none"
            />

          </div>

        </div>

        {/* Sticky Footer */}

        <div
          className="
            border-t
            bg-white
            p-5
            flex
            justify-end
            gap-3
            shrink-0
          "
        >

          <button
            onClick={onClose}
            className="px-6 py-3 rounded-lg border hover:bg-gray-100 transition"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={
              !vehicleType || !phone
            }
            className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-8 py-3 rounded-lg font-semibold transition"
          >
            Submit Application
          </button>

        </div>

      </div>

    </div>
  );
}