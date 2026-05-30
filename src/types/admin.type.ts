

export type AdminRole = "admin" | "super_admin";

export interface AdminUser {
  id: string;
  name: string;
  email: string;

  role: AdminRole;

  // optional extra permissions if you want later
  permissions?: string[];

  isActive?: boolean;
}