

type Base = {
  role: "vendor" | "rider" | "promoter";

  business: {
    businessName: string;
    businessRoles: ("vendor" | "rider" | "promoter")[];
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

export type BecomePartnerPayload =
  | BecomeVendor
  | BecomeRider
  | BecomePromoter;


