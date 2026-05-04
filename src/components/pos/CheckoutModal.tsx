

import { useState } from "react";

type PaymentMethod = "cash" | "transfer" | "pos";

type Props = {
  isOpen: boolean;
  total: number;
  onClose: () => void;
  onConfirm: (paymentMethod: PaymentMethod) => void;
};

export default function CheckoutModal({
  isOpen,
  total,
  onClose,
  onConfirm,
}: Props) {
  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod>("cash");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      
      <div className="bg-white w-full max-w-md rounded-xl p-6 shadow-lg">
        
        {/* Header */}
        <h2 className="text-xl font-bold mb-4">
          Complete Sale
        </h2>

        {/* Total */}
        <div className="mb-4">
          <p className="text-sm text-gray-500">
            Total Amount
          </p>
          <p className="text-2xl font-bold">
            ₦{total.toLocaleString()}
          </p>
        </div>

        {/* Payment Options */}
        <div className="space-y-2 mb-6">
          <p className="text-sm font-medium">
            Payment Method
          </p>

          {(["cash", "transfer", "pos"] as PaymentMethod[]).map(
            (method) => (
              <label
                key={method}
                className={`flex items-center gap-2 p-2 border rounded cursor-pointer
                  ${
                    paymentMethod === method
                      ? "border-black bg-gray-100"
                      : ""
                  }
                `}
              >
                <input
                  type="radio"
                  name="payment"
                  value={method}
                  checked={paymentMethod === method}
                  onChange={() => setPaymentMethod(method)}
                />
                <span className="capitalize">{method}</span>
              </label>
            )
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          
          {/* Cancel */}
          <button
            onClick={onClose}
            className="flex-1 py-2 border rounded hover:bg-gray-100"
          >
            Cancel
          </button>

          {/* Confirm */}
          <button
            onClick={() => onConfirm(paymentMethod)}
            className="flex-1 py-2 bg-black text-white rounded hover:bg-gray-800"
          >
            Confirm
          </button>

        </div>
      </div>
    </div>
  );
}