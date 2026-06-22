




type Props = {
  step: number;
  form: any;
  cart: any;
  pickupCenters: any[];
  busStops: any[];
  states: any[];
  townsByState: any;
};

export default function CheckoutSteps({
  step,
  form,
  cart,
  pickupCenters,
  busStops,
  states,
  townsByState,
}: Props) {
  return (
    <div className="bg-white rounded-2xl border p-4 lg:p-6">

      {/* ================= STEP 1 ================= */}
      {step === 1 && (
        <div className="space-y-4">
          {cart.vendors.map((vendor: any) => (
            <div key={vendor.businessId} className="border rounded-xl p-4">
              <h3 className="font-semibold mb-3 text-sm">Vendor Order</h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                <div>
                  <p className="text-gray-500">Products</p>
                  <p className="font-bold">{vendor.items.length}</p>
                </div>

                <div>
                  <p className="text-gray-500">Weight</p>
                  <p className="font-bold">{vendor.totalWeight}kg</p>
                </div>

                <div>
                  <p className="text-gray-500">Subtotal</p>
                  <p className="font-bold">
                    ₦{vendor.subtotal.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ================= STEP 2 ================= */}
      {step === 2 && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Delivery Method</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={() =>
                form.setDeliveryMode("pickUpFromOurNearestOffice")
              }
              className={`p-4 rounded-xl border text-left ${
                form.deliveryMode === "pickUpFromOurNearestOffice"
                  ? "bg-black text-white"
                  : ""
              }`}
            >
              Pickup Center
            </button>

            <button
              onClick={() => form.setDeliveryMode("homeDelivery")}
              className={`p-4 rounded-xl border text-left ${
                form.deliveryMode === "homeDelivery"
                  ? "bg-black text-white"
                  : ""
              }`}
            >
              Home Delivery
            </button>
          </div>
        </div>
      )}

      {/* ================= STEP 3 ================= */}
      {step === 3 && (
        <div className="space-y-4">

          {/* STATE */}
          <select
            value={form.selectedState?.trim()}
            onChange={(e) => form.setSelectedState(e.target.value)}
            className="w-full border rounded-xl p-3"
          >
            <option value="">Select State</option>
            {states.map((s: any) => (
              <option key={s.id} value={s.name}>
                {s.name}
              </option>
            ))}
          </select>

          {/* PICKUP */}
          {form.deliveryMode === "pickUpFromOurNearestOffice" && (
            <div className="space-y-3">
              <select
                value={form.pickupCenterId}
                onChange={(e) => form.setPickupCenterId(e.target.value)}
                className="w-full border rounded-xl p-3"
              >
                <option value="">Select Pickup Center</option>
                {pickupCenters?.map((center: any) => (
                  <option key={center._id} value={center._id}>
                    {center.name}
                  </option>
                ))}
              </select>

              {form.selectedState?.trim() && pickupCenters.length === 0 && (
                <p className="text-sm text-red-500">
                  No pickup center available in this state
                </p>
              )}
            </div>
          )}

          {/* HOME DELIVERY */}
          {form.deliveryMode === "homeDelivery" && (
            <div className="space-y-3">

             <select
  value={form.selectedTown ?? ""}
  onChange={(e) => form.setSelectedTown(e.target.value)}
  className="w-full border rounded-xl p-3"
>
  <option value="">Select Town</option>

  {(townsByState[form.selectedState?.trim() || ""] || []).map(
    (t: any) => (
      <option key={t} value={t}>
        {t}
      </option>
    )
  )}
</select>

            <select
  value={form.nearestBusStop ?? ""}   // ✅ FIX HERE
  onChange={(e) => form.setNearestBusStop(e.target.value)}
  className="w-full border rounded-xl p-3"
>
  <option value="">Select Nearest Bus Stop</option>

  {(busStops || []).map((stop: any) => (
    <option key={stop._id} value={stop.nearestBusStop}>
      {stop.nearestBusStop}
    </option>
  ))}
</select>

                 <input
      value={form.address ?? ""}   // ✅ FIX HERE
      onChange={(e) => form.setAddress(e.target.value)}
      placeholder="Enter Delivery Address"
      className="w-full border rounded-xl p-3"
    />
  </div>
)}

{/* PHONE */}
<input
  value={form.phone ?? ""}        // ✅ FIX HERE
  onChange={(e) => form.setPhone(e.target.value)}
  placeholder="Phone Number"
  className="w-full border rounded-xl p-3"
/>


        </div>

      )}

      {/* ================= STEP 4 ================= */}
      {step === 4 && (
        <div className="space-y-3">
          <h2 className="text-lg font-semibold">Review Order</h2>

          <div className="p-4 border rounded-xl bg-gray-50 text-sm">
            <p><strong>State:</strong> {form.selectedState?.trim()}</p>
            <p><strong>Town:</strong> {form.selectedTown || "N/A"}</p>
            <p><strong>Delivery Mode:</strong> {form.deliveryMode}</p>
            <p><strong>Phone:</strong> {form.phone}</p>

            {form.deliveryMode === "homeDelivery" && (
              <>
                <p><strong>Address:</strong> {form.address}</p>
                <p><strong>Bus Stop:</strong> {form.nearestBusStop}</p>
              </>
            )}

            {form.deliveryMode === "pickUpFromOurNearestOffice" && (
              <p><strong>Pickup Center:</strong> {form.pickupCenterId}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}