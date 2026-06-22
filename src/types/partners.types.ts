

type Base = {
  role: "vendor" | "promoter"| "partner_pickup_center";

  business: {
    businessName: string;
    businessRoles: ("vendor" | "promoter"| "partner_pickup_center")[];
  };
};

/* ================= VENDOR ================= */
export type BecomeVendor = Base & {
  role: "vendor";
  storeName: string;
  description: string;
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
  role:  "partner_pickup_center";
    businessId: string;

  name: string;
  state: string;
  town: string;
  address: string;
  phone: string;


  ownershipType: "partner" | "platform";

  business: {
    businessName: string;
    businessRoles: (
      | "vendor"
      | "promoter"
      | "partner_pickup_center"
    )[];
  };
};



export type BecomePartnerPayload =
  | BecomeVendor
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