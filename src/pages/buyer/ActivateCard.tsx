


// src/pages/buyer/ActivateCard.tsx

import { useState } from "react";
import {
  CreditCard,
  KeyRound,
  ShieldCheck,
  CheckCircle,
} from "lucide-react";

export default function ActivateCard() {
  const [form, setForm] = useState({
    giftCardPin: "",
    productToken: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setLoading(true);

    try {
      // TODO
      // await activateGiftCard(form);

      console.log(form);

      alert("Gift Card activated successfully.");
    } catch (err) {
      alert("Activation failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-5">

      <div className="max-w-2xl mx-auto">

        {/* Header */}

        <div className="bg-gradient-to-r from-indigo-700 to-purple-700 rounded-2xl text-white p-8 shadow-lg mb-8">

          <div className="flex items-center gap-4">

            <div className="bg-white/20 p-4 rounded-full">
              <CreditCard size={40} />
            </div>

            <div>

              <h1 className="text-3xl font-bold">
                Activate Gift Card
              </h1>

              <p className="text-indigo-100 mt-2">
                Enter your Gift Card PIN and Product
                Token to activate your card.
              </p>

            </div>

          </div>

        </div>

        {/* Form */}

        <div className="bg-white rounded-2xl shadow-lg p-8">

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            {/* Gift Card PIN */}

            <div>

              <label className="block font-semibold mb-2">
                Gift Card PIN
              </label>

              <div className="relative">

                <KeyRound
                  size={18}
                  className="absolute left-4 top-4 text-gray-400"
                />

                <input
                  type="text"
                  name="giftCardPin"
                  value={form.giftCardPin}
                  onChange={handleChange}
                  placeholder="Enter Gift Card PIN"
                  className="w-full border rounded-xl pl-11 pr-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none"
                  required
                />

              </div>

            </div>

            {/* Product Token */}

            <div>

              <label className="block font-semibold mb-2">
                Product Token
              </label>

              <div className="relative">

                <ShieldCheck
                  size={18}
                  className="absolute left-4 top-4 text-gray-400"
                />

                <input
                  type="text"
                  name="productToken"
                  value={form.productToken}
                  onChange={handleChange}
                  placeholder="Enter Product Token"
                  className="w-full border rounded-xl pl-11 pr-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none"
                  required
                />

              </div>

            </div>

            {/* Information */}

            <div className="rounded-xl bg-indigo-50 border border-indigo-200 p-5">

              <div className="flex gap-3">

                <CheckCircle
                  className="text-indigo-600"
                  size={28}
                />

                <div>

                  <h3 className="font-semibold text-indigo-700">
                    Activation Requirements
                  </h3>

                  <ul className="list-disc ml-5 mt-3 space-y-2 text-sm text-gray-700">

                    <li>
                      Each Gift Card can only be activated once.
                    </li>

                    <li>
                      The Product Token is generated after downloading the approved e-book.
                    </li>

                    <li>
                      The Product Token is unique to one buyer.
                    </li>

                    <li>
                      After activation, your Gift Card balance will appear in your Gift Card Wallet.
                    </li>

                    <li>
                      Activated Gift Cards can be used to redeem products in the Gift Card Store.
                    </li>

                  </ul>

                </div>

              </div>

            </div>

            {/* Submit */}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-700 hover:bg-indigo-800 text-white rounded-xl py-4 font-semibold transition disabled:opacity-50"
            >
              {loading
                ? "Activating..."
                : "Activate Gift Card"}
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}