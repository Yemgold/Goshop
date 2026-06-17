

type Base = {
  role: "vendor" | "rider" | "promoter"| "pickup_center";

  business: {
    businessName: string;
    businessRoles: ("vendor" | "rider" | "promoter"| "pickup_center")[];
  };
};

/* ================= VENDOR ================= */
export type BecomeVendor = Base & {
  role: "vendor";
  storeName: string;
  description: string;
};

/* ================= RIDER ================= */
export type BecomeRider = Base & {
  role: "rider";
  vehicleType: string;
  licenseNumber: string;
  bankName: string;
  accountNumber: string;
  accountName: string;
};

/* ================= PROMOTER ================= */
export type BecomePromoter = Base & {
  role: "promoter";
  bankName: string;
  accountNumber: string;
  accountName: string;
};

/* ================= PICKUP CENTER ================= */
export type BecomePickupCenter = Base & {
  role: "pickup_center";
  pickupAddress: string;
  pickupState: string;
  contactPhone: string;
};

export type BecomePartnerPayload =
  | BecomeVendor
  | BecomeRider
  |BecomePickupCenter
  | BecomePromoter;


  export type BusinessProfilePayload = {
  street: string;
  state: string;
  town: string;
  partnersBecomePickup_Center?: string;
  country?: string; // optional
  code?: string;    // optional
};