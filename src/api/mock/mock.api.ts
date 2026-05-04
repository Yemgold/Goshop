

import type { AxiosInstance } from "axios";

/* ================= IMPORT MOCKS ================= */
import { MOCK_ANALYTICS } from "../../mocks/vendor/analytics.mock";
import { MOCK_DASHBOARD } from "../../mocks/vendor/dashboard.mock";
import { MOCK_PRODUCTS } from "../../mocks/vendor/products.mock";
import { MOCK_ORDERS } from "../../mocks/vendor/orders.mock";

import { MOCK_BUYER_PRODUCTS } from "../../mocks/buyer/Products.mock";
import { MOCK_BUYER_ORDERS } from "../../mocks/buyer/Orders.mock";
import { MOCK_TRACKING } from "../../mocks/buyer/Tracking.mock";

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const setupMockAdapter = (api: AxiosInstance) => {
  api.interceptors.request.use(async (config) => {
    const { url, method } = config;

    await delay(300);

    /* ================= VENDOR ================= */

    if (url === "/vendor/analytics") {
      config.adapter = async () => ({
        data: MOCK_ANALYTICS,
        status: 200,
        statusText: "OK",
        headers: {},
        config,
      });
    }

    if (url === "/vendor/dashboard") {
      config.adapter = async () => ({
        data: MOCK_DASHBOARD,
        status: 200,
        statusText: "OK",
        headers: {},
        config,
      });
    }

    if (url === "/vendor/products" && method === "get") {
      config.adapter = async () => ({
        data: MOCK_PRODUCTS,
        status: 200,
        statusText: "OK",
        headers: {},
        config,
      });
    }

    if (url === "/vendor/orders" && method === "get") {
      config.adapter = async () => ({
        data: MOCK_ORDERS,
        status: 200,
        statusText: "OK",
        headers: {},
        config,
      });
    }

    /* ================= BUYER ================= */

    // ✅ GET ALL PRODUCTS (IMPORTANT)
    if (url === "/products" && method === "get") {
      config.adapter = async () => ({
        data: MOCK_BUYER_PRODUCTS,
        status: 200,
        statusText: "OK",
        headers: {},
        config,
      });
    }

    // ✅ GET PRODUCT BY ID
    if (url?.startsWith("/products/") && method === "get") {
      const id = url.split("/")[2];

      const product = MOCK_BUYER_PRODUCTS.find(
        (p) => String(p.id) === String(id)
      );

      config.adapter = async () => ({
        data: product ?? null,
        status: 200,
        statusText: "OK",
        headers: {},
        config,
      });
    }

    // BUYER ORDERS
    if (url === "/buyer/orders") {
      config.adapter = async () => ({
        data: MOCK_BUYER_ORDERS,
        status: 200,
        statusText: "OK",
        headers: {},
        config,
      });
    }

    // TRACKING
    if (url?.startsWith("/orders/")) {
      const id = url.split("/")[2];

      config.adapter = async () => ({
        data: { id, ...MOCK_TRACKING },
        status: 200,
        statusText: "OK",
        headers: {},
        config,
      });
    }

    /* ================= CART ================= */

    if (url === "/cart" && method === "get") {
      const cart = JSON.parse(localStorage.getItem("mock_cart") || "[]");

      config.adapter = async () => ({
        data: cart,
        status: 200,
        statusText: "OK",
        headers: {},
        config,
      });
    }

    if (url === "/cart" && method === "post") {
      const body = config.data ? JSON.parse(config.data) : {};

      const cart = JSON.parse(localStorage.getItem("mock_cart") || "[]");
      const updated = [...cart, body];

      localStorage.setItem("mock_cart", JSON.stringify(updated));

      config.adapter = async () => ({
        data: updated,
        status: 200,
        statusText: "OK",
        headers: {},
        config,
      });
    }

    return config;
  });
};