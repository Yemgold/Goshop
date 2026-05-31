















/* =========================================================
   SHARED / BASE TYPES
========================================================= */

export interface BaseEntity {
  id: string;

  /**
   * Mongo compatibility
   * Fixes: Property '_id' does not exist on type 'Product'
   */
  _id?: string;

  createdAt?: string;

  updatedAt?: string;
}

export type Currency = "NGN" | "USD";

export type ProductType = "physical" | "digital";

export type ProductStatus =
  | "Active"
  | "Inactive";

export type OrderStatus =
  
  | "processing"
  | "shipped"
  | "delivered"
  | "canceled";

export type DeliveryStatus =
  | "Pending"
  | "Assigned"
  | "PickedUp"
  | "EnRoute"
  | "Delivered";

export type PaymentStatus =
  | "paid"
  | "unpaid"
  | "refunded";

export type InventoryStatus =
  | "in_stock"
  | "low_stock"
  | "out_of_stock";

export type ReviewStatus =
  | "approved"
  | "pending"
  | "rejected";

export type ShipmentStatus =
  | "pending"
  | "shipped"
  | "delivered"
  | "failed";

export type TransactionStatus =
  | "successful"
  | "failed"
  | "refunded";

export type PayoutStatus =
  | "pending"
  | "completed"
  | "failed";

/* =========================================================
   PAGINATION
========================================================= */

export interface PaginatedResponse<T> {
  data: T[];

  total: number;

  page: number;

  limit: number;

  totalPages: number;
}

/* =========================================================
   PRODUCT
========================================================= */

export interface ProductMedia {
  _id?: string;

  type: "image" | "video";

  url: string;

  publicUrl?: string;
}

export interface Product extends BaseEntity {
  name: string;

  description?: string;

  type?: ProductType;

  price: number;

  currency?: Currency;

  status: ProductStatus;

  barcode?: string;

  stock?: number;

  inStock?: boolean;

  sku?: string;

  category?: string;

  tags?: string[];

  /**
   * Legacy support
   */
  images?: string | string[];

  media?: ProductMedia[];

  averageRating?: number;

  reviewCount?: number;

  isActive?: boolean;

  isDeleted?: boolean;

  vendor?: {
    id?: string;
    businessName: string;
  };

}

/* =========================================================
   CART
========================================================= */

export type CartItemType = Product & {
  qty: number;
};

/* =========================================================
   ORDERS
========================================================= */

export interface OrderItem {
  id: string;

  productId?: string;

  title: string;

  quantity: number;

  price: number;

  image?: string;
}

export interface Order extends BaseEntity {
  items: OrderItem[];

  total: number;

  date?: string;

  currency?: Currency;

  status: OrderStatus;

  riderId: string | null;

  paymentStatus?: PaymentStatus;

  deliveryStatus: DeliveryStatus;

  shippingAddress?: string;

  deliveredAt?: string;
}

/* =========================================================
   DASHBOARD
========================================================= */

export interface DashboardRecentOrder {
  id: string;

  customer: string;

  amount: number;

  status: OrderStatus;
}

export interface DashboardData {
  revenue: number;

  orders: number;

  products: number;

  businessName: string;

  vendorName: string;

  businessId: string;

  recentOrders: DashboardRecentOrder[];
}

/* =========================================================
   ANALYTICS
========================================================= */

export interface SalesChartItem {
  day: string;

  revenue: number;

  orders?: number;
}

export interface TopProduct {
  id?: string;

  name: string;

  sales: number;

  revenue?: number;
}

export interface AnalyticsInsights {
  bestDay: string;

  topCategory: string;

  returnRate: number;
}

export interface AnalyticsData {
  totalSales: number;

  totalOrders: number;

  conversionRate: number;

  totalVisitors: number;

  returningCustomers: number;

  canceledOrders: number;

  averageOrderValue: number;

  salesChart: SalesChartItem[];

  topProducts: TopProduct[];

  insights: AnalyticsInsights;
}

/* =========================================================
   SALES
========================================================= */

export interface SalesSummary {
  totalRevenue: number;

  totalOrders: number;

  pendingOrders: number;

  completedOrders: number;

  refundedOrders: number;

  canceledOrders: number;

  averageOrderValue: number;
}

export interface SalesTrendItem {
  day: string;

  revenue: number;

  orders: number;
}

export interface RecentSale extends BaseEntity {
  customer: string;

  product: string;

  amount: number;

  quantity: number;

  status:
    | "completed"
    | "pending"
    | "canceled"
    | "refunded";

  paymentStatus: PaymentStatus;
}

export interface VendorSalesData {
  summary: SalesSummary;

  salesTrend: SalesTrendItem[];

  recentSales: RecentSale[];
}

/* =========================================================
   INVENTORY
========================================================= */

export interface InventoryProduct extends BaseEntity {
  name: string;

  sku: string;

  price: number;

  stock: number;

  sold: number;

  status: InventoryStatus;

  category: string;
}

export interface InventorySummary {
  totalProducts: number;

  totalStockValue: number;

  lowStockItems: number;

  outOfStockItems: number;
}

export interface VendorInventoryData {
  summary: InventorySummary;

  products: InventoryProduct[];
}

/* =========================================================
   CATEGORY
========================================================= */

export interface Category extends BaseEntity {
  name: string;

  productCount: number;

  totalSales: number;
}

export interface VendorCategoriesData {
  categories: Category[];
}

/* =========================================================
   DISCOUNTS
========================================================= */

export interface Discount extends BaseEntity {
  code: string;

  type: "percentage" | "fixed";

  value: number;

  usageLimit: number;

  used: number;

  isActive: boolean;

  expiresAt: string;
}

export interface VendorDiscountsData {
  discounts: Discount[];
}

/* =========================================================
   VENDOR ORDERS
========================================================= */

export interface VendorOrder extends BaseEntity {
  customer: string;

  email: string;

  total: number;

  quantity: number;

  paymentStatus: PaymentStatus;

  orderStatus:
    | "pending"
    | "processing"
    | "shipped"
    | "delivered"
    | "canceled";

  
  

  shippingAddress: string;
}


export interface VendorOrdersData {
  orders: VendorOrder[];
}

export interface PendingOrder extends VendorOrder {
  paymentStatus:
    | "paid"
    | "unpaid";

  orderStatus:
    | "pending"
    | "processing";
}

export interface VendorPendingOrdersData {
  pendingOrders: PendingOrder[];
}

export interface CompletedOrder extends VendorOrder {
  paymentStatus: "paid";

  orderStatus: "delivered";

  deliveredAt: string;
}

export interface VendorCompletedOrdersData {
  completedOrders: CompletedOrder[];
}

/* =========================================================
   RETURNS
========================================================= */

export interface VendorReturn extends BaseEntity {
  orderId: string;

  customer: string;

  product: string;

  reason: string;

  refundAmount: number;

  status:
    | "pending"
    | "approved"
    | "rejected";
}

export interface VendorReturnsSummary {
  totalReturns: number;

  pendingReturns: number;

  approvedReturns: number;

  rejectedReturns: number;

  refundedAmount: number;
}

export interface VendorReturnsData {
  summary: VendorReturnsSummary;

  returns: VendorReturn[];
}

/* =========================================================
   SHIPPING
========================================================= */

export interface VendorShipment extends BaseEntity {
  orderId: string;

  customer: string;

  courier: string;

  trackingNumber: string;

  shippingFee: number;

  status: ShipmentStatus;

  estimatedDelivery: string;
}

export interface VendorShippingSummary {
  totalShipments: number;

  pendingShipments: number;

  shippedOrders: number;

  deliveredOrders: number;

  failedDeliveries: number;
}

export interface VendorShippingData {
  summary: VendorShippingSummary;

  shipments: VendorShipment[];
}

/* =========================================================
   DELIVERY ZONES
========================================================= */

export interface DeliveryZone extends BaseEntity {
  name: string;

  states: string[];

  deliveryFee: number;

  estimatedDays: string;

  isActive: boolean;
}

export interface VendorDeliveryZonesData {
  zones: DeliveryZone[];
}

/* =========================================================
   REVENUE
========================================================= */

export interface RevenueSummary {
  totalRevenue: number;

  totalProfit: number;

  totalOrders: number;

  pendingPayouts: number;

  completedPayouts: number;

  platformFees: number;
}

export interface RevenueChartItem {
  month: string;

  revenue: number;

  profit: number;
}

export interface RevenueTransaction extends BaseEntity {
  orderId: string;

  customer: string;

  amount: number;

  fee: number;

  net: number;

  status:
    | "completed"
    | "pending";
}

export interface VendorRevenueData {
  summary: RevenueSummary;

  revenueChart: RevenueChartItem[];

  transactions: RevenueTransaction[];
}

/* =========================================================
   PAYOUTS
========================================================= */

export interface VendorPayout extends BaseEntity {
  amount: number;

  bankName: string;

  accountNumber: string;

  status: PayoutStatus;

  requestedAt: string;

  processedAt?: string;
}

export interface VendorPayoutSummary {
  availableBalance: number;

  pendingPayouts: number;

  completedPayouts: number;

  totalWithdrawals: number;
}

export interface VendorPayoutsData {
  summary: VendorPayoutSummary;

  payouts: VendorPayout[];
}

/* =========================================================
   TRANSACTIONS
========================================================= */

export interface VendorTransaction extends BaseEntity {
  orderId: string;

  customer: string;

  amount: number;

  paymentMethod: string;

  reference: string;

  status: TransactionStatus;
}

export interface VendorTransactionSummary {
  totalTransactions: number;

  successfulTransactions: number;

  failedTransactions: number;

  refundedTransactions: number;

  totalVolume: number;
}

export interface VendorTransactionsData {
  summary: VendorTransactionSummary;

  transactions: VendorTransaction[];
}

/* =========================================================
   TAXES
========================================================= */

export interface TaxSummary {
  totalTaxCollected: number;

  taxableRevenue: number;

  vatPaid: number;

  pendingTax: number;
}

export interface TaxChartItem {
  month: string;

  tax: number;
}

export interface TaxTransaction extends BaseEntity {
  orderId: string;

  customer: string;

  amount: number;

  taxAmount: number;

  taxType: string;

  status:
    | "paid"
    | "pending";
}

export interface VendorTaxesData {
  summary: TaxSummary;

  taxChart: TaxChartItem[];

  taxTransactions: TaxTransaction[];
}

/* =========================================================
   CUSTOMERS
========================================================= */

export interface VendorCustomer extends BaseEntity {
  name: string;

  email: string;

  totalOrders: number;

  totalSpent: number;

  lastPurchase: string;

  status:
    | "new"
    | "returning";
}

export interface CustomerSummary {
  totalCustomers: number;

  returningCustomers: number;

  newCustomers: number;

  averageSpend: number;
}

export interface VendorCustomersData {
  summary: CustomerSummary;

  customers: VendorCustomer[];
}

/* =========================================================
   REVIEWS
========================================================= */

export interface VendorReview extends BaseEntity {
  customer: string;

  product: string;

  rating: number;

  comment: string;

  status: ReviewStatus;
}

export interface ReviewSummary {
  averageRating: number;

  totalReviews: number;

  positiveReviews: number;

  negativeReviews: number;
}

export interface VendorReviewsData {
  summary: ReviewSummary;

  reviews: VendorReview[];
}

/* =========================================================
   STORE
========================================================= */

export interface VendorStore extends BaseEntity {
  name: string;

  description: string;

  logo: string;

  email: string;

  phone: string;

  address: string;

  status:
    | "active"
    | "inactive";
}

export interface StoreStats {
  totalSales: number;

  totalOrders: number;

  rating: number;

  followers: number;
}

export interface VendorStoreData {
  store: VendorStore;

  stats: StoreStats;
}

/* =========================================================
   STORE SETTINGS
========================================================= */

export interface VendorStoreSettings {
  storeId: string;

  currency: string;

  timezone: string;

  emailNotifications: boolean;

  smsNotifications: boolean;

  autoAcceptOrders: boolean;

  allowReturns: boolean;

  taxEnabled: boolean;

  minimumOrderAmount: number;

  maxOrderLimit: number;
}

export interface VendorStoreSettingsData {
  settings: VendorStoreSettings;
}

/* =========================================================
   SECURITY
========================================================= */

export interface VendorSession extends BaseEntity {
  device: string;

  location: string;

  lastActive: string;

  isCurrent: boolean;
}

export interface VendorSecurity {
  email: string;

  twoFactorEnabled: boolean;

  loginAlerts: boolean;

  lastPasswordChange: string;
}

export interface VendorSecurityData {
  security: VendorSecurity;

  sessions: VendorSession[];
}

/* =========================================================
   PAYOUT SETTINGS
========================================================= */

export interface VendorPayoutSettings {
  defaultBank: string;

  accountNumber: string;

  payoutMethod:
    | "manual"
    | "auto";

  minPayoutAmount: number;

  autoPayout: boolean;

  payoutSchedule:
    | "daily"
    | "weekly"
    | "monthly";

  requireOtp: boolean;
}

export interface VendorPayoutSettingsData {
  payoutSettings: VendorPayoutSettings;
}

/* =========================================================
   PRODUCT PERFORMANCE
========================================================= */

export interface ProductPerformanceItem {
  id: string;

  name: string;

  category: string;

  views: number;

  sales: number;

  revenue: number;

  conversionRate: number;

  refunds: number;

  stockLeft: number;
}

export interface ProductPerformanceSummary {
  totalProducts: number;

  bestSeller: string;

  worstSeller: string;

  totalProductRevenue: number;
}

export interface ProductPerformanceData {
  summary: ProductPerformanceSummary;

  performance: ProductPerformanceItem[];
}

/* =========================================================
   VENDOR PARTNER
========================================================= */

export interface VendorPartnerDataType {
  storeName: string;

  description: string;
}