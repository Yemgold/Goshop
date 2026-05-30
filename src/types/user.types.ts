

export type UserRole = "user" | "rider" | "promoter" | "vendor";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar?: string;
  createdAt: number;
  

   promoterStatus?: "none" | "pending" | "active";
  referralCode?: string;

  bankDetails?: {
    accountName: string;
    accountNumber: string;
    bankName: string;
  };
}
