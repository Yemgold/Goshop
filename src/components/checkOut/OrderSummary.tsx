

type Props = {
  subtotal: number;
  shipping: any;
  collectionFee: number;
  grandTotal: number;
};

export default function OrderSummary({
  subtotal,
  shipping,
  collectionFee,
  grandTotal,
}: Props) {
  return (
    <div className="bg-white rounded-2xl border p-6 sticky top-6">

      <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

      <div className="space-y-3 text-sm">

        {/* SUBTOTAL */}
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>₦{subtotal.toLocaleString()}</span>
        </div>

        {/* SHIPPING */}
        <div className="flex justify-between">
          <span>Shipping (Vendor → Office)</span>
          <span>
            ₦{(shipping?.shippingFeeSummation || 0).toLocaleString()}
          </span>
        </div>

        {/* DELIVERY */}
        <div className="flex justify-between">
          <span>Delivery Fee</span>
          <span>
            ₦{(shipping?.deliveryFeeSummation || 0).toLocaleString()}
          </span>
        </div>

        {/* COLLECTION FEE */}
        <div className="flex justify-between">
          <span>Collection Fee</span>
          <span>
            ₦{collectionFee.toLocaleString()}
          </span>
        </div>

        {/* TOTAL */}
        <div className="border-t pt-3 flex justify-between font-bold text-lg">
          <span>Total</span>
          <span>
            ₦{grandTotal.toLocaleString()}
          </span>
        </div>
      </div>

      <p className="text-xs text-gray-400 mt-3">
        Shipping confirmed before payment.
      </p>
    </div>
  );
}