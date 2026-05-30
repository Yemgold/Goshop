

// import type { CartItemB } from "../types/paymentintent.type";

// type DeliveryMode = "vendor" | "office" | "home";

// export const buildCheckoutPayload = (params: {
//   cartId: string;
//   items: CartItemB[];
//   buyerId: string;

//   deliveryMode: DeliveryMode;

//   address?: string;
//   city?: string;
//   contactPhone: string;

//   officeAddress?: string;
// }) => {
//   const idempotencyKey = crypto.randomUUID();

//   /* ================= DELIVERY LOGIC ================= */

//   let deliveryFee = 0;

//   let deliveryAddress = "";
//   let pickupLocation: string | null = null;

//   switch (params.deliveryMode) {
//     case "vendor":
//       deliveryFee = 0;

//       pickupLocation = "Vendor Store - Lagos (Ikeja)";
//       deliveryAddress = "PICKUP_FROM_VENDOR";
//       break;

//     case "office":
//       deliveryFee = 2000;

//       pickupLocation = "Company Office - Lagos";

//       deliveryAddress = params.officeAddress || "PICKUP_FROM_OFFICE";
//       break;

//     case "home":
//       deliveryFee = 6500;

//       deliveryAddress =
//         `${params.address ?? ""}, ${params.city ?? ""}`.trim();

//       pickupLocation = null;
//       break;
//   }

//   /* ================= PAYLOAD ================= */

//   return {
//     cartId: params.cartId,

//     customerId: params.buyerId,

//     items: params.items.map((i) => ({
//       productId: i.productId,
//       quantity: i.quantity,
//       businessId: i.businessId,
//     })),

//     deliveryMode: params.deliveryMode,

//     deliveryFee,

//     deliveryAddress,

//     pickupLocation,

//     contactPhone: String(params.contactPhone),

//     idempotencyKey,
//   };
// };

// /* ================= NORMALIZE ITEMS ================= */
// export const normalizeCheckoutItems = (items: CartItemB[]) => {
//   return items.map((i) => ({
//     productId: i.productId,
//     businessId: i.businessId,
//     name: (i as any).name ?? "Product",
//     price: (i as any).price ?? 0,
//     quantity: i.quantity,
//   }));
// };

// /* ================= TOTAL ================= */
// export const calculateCheckoutTotal = (
//   items: ReturnType<typeof normalizeCheckoutItems>
// ) => {
//   return items.reduce((sum, item) => {
//     return sum + item.price * item.quantity;
//   }, 0);
// };









import type { CartItemB } from "../types/paymentintent.type";

type DeliveryMode = "vendor" | "office" | "home";

export const buildCheckoutPayload = (params: {
  cartId: string;
  items: CartItemB[];
  buyerId: string;

  deliveryMode: DeliveryMode;

  address?: string;
  city?: string;

  officeAddress?: string;

  vendorState?: string;
  vendorTown?: string;

  contactPhone: string;
}) => {
  const idempotencyKey = crypto.randomUUID();

  /* ================= DELIVERY ================= */

  let deliveryFee = 0;

  let deliveryAddress: string | null = null;

  let pickupLocation: string | null = null;

  switch (params.deliveryMode) {
    case "vendor":
      deliveryFee = 0;

      pickupLocation =
        `${params.vendorTown ?? ""}, ${params.vendorState ?? ""}`;

      break;

    case "office":
      deliveryFee = 2000;

      pickupLocation = "Nearest Company Office";

      deliveryAddress =
        params.officeAddress ?? null;

      break;

    case "home":
      deliveryFee = 6500;

      deliveryAddress =
        `${params.address ?? ""}, ${params.city ?? ""}`.trim();

      break;
  }

  /* ================= PAYLOAD ================= */

  return {
    cartId: params.cartId,

    customerId: params.buyerId,

    items: params.items.map((i) => ({
      productId: i.productId,
      quantity: i.quantity,
      businessId: i.businessId,
    })),

    deliveryMode: params.deliveryMode,

    deliveryFee,

    deliveryAddress,

    pickupLocation,

    contactPhone: String(params.contactPhone),

    idempotencyKey,
  };

};

/* ================= NORMALIZE ITEMS ================= */

export const normalizeCheckoutItems = (
  items: CartItemB[]
) => {
  return items.map((i) => ({
    productId: i.productId,

    businessId: i.businessId,

    name: (i as any).name ?? "Product",

    price: (i as any).price ?? 0,

    quantity: i.quantity,
  }));
};

/* ================= CALCULATE TOTAL ================= */

export const calculateCheckoutTotal = (
  items: ReturnType<
    typeof normalizeCheckoutItems
  >
) => {
  return items.reduce((sum, item) => {
    return (
      sum + item.price * item.quantity
    );
  }, 0);
};




