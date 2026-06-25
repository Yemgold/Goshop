export interface DashboardData {
  revenue: number;

  orders: number;

  businessName: string;

  pickupName: string;

  businessId: string;

  //recentOrders: DashboardRecentOrder[];
}


export interface PickupCenter {
  _id: string;
  name: string;
  state: string;
  town: string;
  address: string;
  phone: string;
  isActive: boolean;
  isMainHub: boolean;
  createdAt: string;
  updatedAt: string;
}


export interface CreateRiderInvitePayload {
  businessId: string;
  pickupCenterId: string;
  email: string;
  phone: string;
}