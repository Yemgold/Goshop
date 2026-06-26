


// src/pages/buyer/GiftcardStore.tsx

import { useState } from "react";
import {
  Gift,
  Search,
  Package,
  Star,
  ShoppingBag,
} from "lucide-react";

export default function GiftcardStore() {
  const [search, setSearch] = useState("");

  // Backend:
  // const { data: products } = useGiftcardProducts();

  const products = [
    {
      id: 1,
      name: "Samsung Smart TV",
      image:
        "https://via.placeholder.com/350x220",
      category: "Electronics",
      giftCardsRequired: "3 tokens",
      stock: 12,
    },
    {
      id: 2,
      name: "iPhone 16 Pro",
      image:
        "https://via.placeholder.com/350x220",
      category: "Phones",
      giftCardsRequired: "6 tokens",
      stock: 8,
    },
    {
      id: 3,
      name: "Office Chair",
      image:
        "https://via.placeholder.com/350x220",
      category: "Furniture",
      giftCardsRequired: "1 tokens",
      stock: 16,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Hero */}

      <div className="bg-gradient-to-r from-purple-700 to-pink-600 text-white">

        <div className="max-w-7xl mx-auto px-6 py-14">

          <div className="flex items-center gap-5">

            <div className="bg-white/20 p-5 rounded-full">

              <Gift size={45} />

            </div>

            <div>

              <h1 className="text-4xl font-bold">
                Gift Card Store
              </h1>

              <p className="mt-2 text-purple-100">
                Redeem your activated Gift Cards for
                exclusive products.
              </p>

            </div>

          </div>

        </div>

      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* Balance */}

        <div className="bg-white rounded-2xl shadow p-6 mb-8 flex justify-between items-center">

          <div>

            <h2 className="text-xl font-bold">
              Gift Card Wallet
            </h2>

            <p className="text-gray-500">
              Activated Gift Cards Available
            </p>

          </div>

          <div className="text-right">

            <div className="text-4xl font-bold text-green-600">
              6
            </div>

            <div className="text-sm text-gray-500">
              Cards
            </div>

          </div>

        </div>

        {/* Search */}

        <div className="bg-white rounded-2xl shadow p-5 mb-8">

          <div className="relative">

            <Search
              size={20}
              className="absolute left-4 top-4 text-gray-400"
            />

            <input
              placeholder="Search products..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="w-full border rounded-xl pl-12 pr-4 py-3 focus:ring-2 focus:ring-purple-500 outline-none"
            />

          </div>

        </div>

        {/* Products */}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">

          {products.map((product) => (

            <div
              key={product.id}
              className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-xl transition"
            >

              <img
                src={product.image}
                alt={product.name}
                className="w-full h-56 object-cover"
              />

              <div className="p-5">

                <div className="flex justify-between">

                  <span className="text-sm bg-purple-100 text-purple-700 px-3 py-1 rounded-full">
                    {product.category}
                  </span>

                  <div className="flex items-center gap-1 text-yellow-500">

                    <Star size={16} fill="currentColor" />

                    4.8

                  </div>

                </div>

                <h2 className="text-xl font-bold mt-4">
                  {product.name}
                </h2>

                <div className="mt-4 space-y-2">

                  <div className="flex justify-between">

                    <span className="text-gray-500">
                      Gift Cards Required
                    </span>

                    <span className="font-bold text-purple-700">
                      {product.giftCardsRequired}
                    </span>

                  </div>

                  <div className="flex justify-between">

                    <span className="text-gray-500">
                      Stock
                    </span>

                    <span>
                      {product.stock}
                    </span>

                  </div>

                </div>

                <button
                  className="mt-6 w-full bg-purple-600 hover:bg-purple-700 text-white rounded-xl py-3 font-semibold flex justify-center items-center gap-2 transition"
                >

                  <ShoppingBag size={18} />

                  Redeem Gift Card

                </button>

              </div>

            </div>

          ))}

        </div>

        {/* Information */}

        <div className="bg-purple-50 border border-purple-200 rounded-2xl p-6 mt-10">

          <div className="flex gap-4">

            <Package
              className="text-purple-600"
              size={35}
            />

            <div>

              <h2 className="font-bold text-lg">
                How Redemption Works
              </h2>

              <ul className="list-disc ml-5 mt-3 space-y-2 text-gray-700">

                <li>
                  Activate your Gift Card first.
                </li>

                <li>
                  Browse products available in the Gift Card Store.
                </li>

                <li>
                  Click <strong>Redeem Gift Card</strong>.
                </li>

                <li>
                  Your Gift Card balance will be deducted automatically after successful redemption.
                </li>

                <li>
                  Your order will then be processed for delivery.
                </li>

              </ul>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}