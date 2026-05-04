

import type { BuyerProduct } from "../../types/buyer.types";

export const MOCK_BUYER_PRODUCTS: BuyerProduct[] = [
  {
    id: "1",
    title: "Wireless Headphones",
    price: 25000,
    category: "Electronics",
    image:  "/images/WirelessHeadphones.jpg",
    vendor: "Tech Store",
    inStock: true,
    description:
      "High-quality wireless headphones with deep bass and noise cancellation.",
  },
  {
    id: "2",
    title: "Running Sneakers",
    price: 45000,
    category: "Fashion",
    image: "/images/RunningSneakers.jpg",    //
    vendor: "Fashion Hub",
    inStock: true,
    description:
      "Comfortable sneakers designed for daily running and lifestyle use.",
  },
  {
    id: "3",
    title: "Smart Watch",
    price: 60000,
    category: "Electronics",
    image: "/images/SmartWatch.jpg",
    vendor: "Gadget World",
    inStock: true,
    description:
      "Track your fitness, notifications, and health metrics in real time.", //
  },
  {
    id: "4",
    title: "Smart Phone",
    price: 60000,
    category: "Electronics",
    image: "/images/SmartPhone.jpg",
    vendor: "Gadget World",
    inStock: true,
    description:
      "Track your fitness, notifications, and health metrics in real time.", //images\SmartPhone.jpg
  },
];