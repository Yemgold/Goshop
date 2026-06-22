

import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "../../store/auth.store";
import { useUIStore } from "../../store/ui.store";
import Spinner from "../../components/Spinner/Spinner";
import { ProtectedRoute } from "./ProtectedRoute";

/* =========================
   AUTH
========================= */
import Landing from "../../pages/LandingPage";
import Login from "../../pages/auth/Login";
import Register from "../../pages/auth/Register";
import CheckEmail from "../../pages/auth/CheckEmail";
import VerifyEmail from "../../pages/auth/VerifyEmail";
import ForgotPassword from "../../pages/auth/ForgotPassword";
import ResetPassword from "../../pages/auth/ResetPassword";

/* =========================
   LAYOUTS
========================= */
import AppLayout from "../../components/layout/AppLayout";
import AdminLayout from "../layouts/AdminLayout";

/* =========================
   GLOBAL
========================= */
import Profile from "../../pages/global/Profile";
import Notifications from "../../pages/global/Notifications";

/* =========================
   ADMIN
========================= */
import Dashboard from "../../pages/admin/Dashboard";
import Users from "../../pages/admin/Users";
import Vendors from "../../pages/admin/Vendors";
import Riders from "../../pages/admin/Riders";
import Promoters from "../../pages/admin/Promoters";
import Analytics from "../../pages/admin/Analytics";
import Settings from "../../pages/admin/Settings";
import Staff from "../../pages/admin/Staff";

/* =========================
   BUYER
========================= */
import BuyerHome from "../../pages/buyer/Home";
import BuyerDashboard from "../../pages/buyer/Dashboard";
import ProductList from "../../pages/buyer/ProductList";
import ProductDetail from "../../pages/buyer/ProductDetail";
import Cart from "../../pages/buyer/Cart";


import Checkout from "../../pages/buyer/Checkout";

import OrderSuccess from "../../pages/buyer/OrderSuccess";
import Orders from "../../pages/buyer/Orders";
import OrderTracking from "../../pages/buyer/OrderTracking";

/* =========================
   VENDOR
========================= */
import VendorDashboard from "../../pages/vendor/Dashboard";
import VendorProducts from "../../pages/vendor/Product Management/Products";
import VendorProductDetails from "../../pages/vendor/Product Management/ProductDetails";

import VendorOrders from "../../pages/vendor/Orders/Orders";
import VendorOrderDetail from "../../pages/vendor/Orders/OrderDetail";
import PendingOrders from "../../pages/vendor/Orders/PendingOrders";
import CompletedOrders from "../../pages/vendor/Orders/CompletedOrders";
import Returns from "../../pages/vendor/Orders/Returns";

import VendorAnalytics from "../../pages/vendor/Analytics";
import Inventory from "../../pages/vendor/Product Management/InventoryPage";
import Sales from "../../pages/vendor/Sales";
import Shipping from "../../pages/vendor/Shipping & Delivery/Shipping";
import DeliveryZones from "../../pages/vendor/Shipping & Delivery/DeliveryZones";

import DeliveryRate from "../../pages/vendor/Shipping & Delivery/DeliveryRate";

import Revenue from "../../pages/vendor/Finace System/Revenue";
import Payouts from "../../pages/vendor/Finace System/Payouts";
import Transactions from "../../pages/vendor/Finace System/Transactions";
import Taxes from "../../pages/vendor/Finace System/Taxes";

import PayoutSettings from "../../pages/vendor/Security& Payout Setting/PayoutSettings";
import Security from "../../pages/vendor/Security& Payout Setting/Security";

import Store from "../../pages/vendor/Store Management/Store";
import StoreSettings from "../../pages/vendor/Store Management/Settings";

import Reviews from "../../pages/vendor/Customer Management/Reviews";
import Customers from "../../pages/vendor/Customer Management/Customers";

import ProductPerformance from "../../pages/vendor/Product Management/ProductPerformance";
import Categories from "../../pages/vendor/Product Management/Categories";
import Discounts from "../../pages/vendor/Product Management/Discounts";

/* =========================
   RIDER
========================= */
import RiderDashboard from "../../pages/rider/Dashboard";
import RiderJobs from "../../pages/rider/Jobs";
import DeliveryDetail from "../../pages/rider/DeliveryDetail";
import LiveTracking from "../../pages/rider/LiveTracking";

import RiderActive from "../../pages/rider/active";
import RiderHistory from "../../pages/rider/history";

import Earnings from "../../pages/rider/Earnings";
import RiderPayouts from "../../pages/rider/payouts";
import RiderTransactions from "../../pages/rider/Transactions";

import RiderAnalytics from "../../pages/rider/Analytics";
import RiderRatings from "../../pages/rider/Ratings";

import RiderMap from "../../pages/rider/map";
import RiderZones from "../../pages/rider/zones";

import RiderNotifications from "../../pages/rider/notifications";
import RiderSupport from "../../pages/rider/support";
import RiderSettings from "../../pages/rider/settings";
import RiderVehicle from "../../pages/rider/vehicle";
import RiderPayoutSettings from "../../pages/rider/payout-settings";

/* =========================
   PROMOTER
========================= */
import PromoterDashboard from "../../pages/promoter/Dashboard";
import ShareProducts from "../../pages/promoter/ShareProducts";

import PromoterAnalytics from "../../pages/promoter/Analytics";


/* ================= PAGES ================= */
import Campaigns from "../../pages/promoter/Campaigns";
import CampaignDetailsPage from "../../pages/promoter/Campaign-details";
import PromoterProductPerformance from "../../pages/promoter/Product-performance";


import Leaderboard from "../../pages/promoter/Leaderboard";



import Referrals from "../../pages/promoter/Referrals";
import ReferralStats from "../../pages/promoter/Referral-stats";

import Coupons from "../../pages/promoter/Coupons";
import Training from "../../pages/promoter/Training";
import Rewards from "../../pages/promoter/Rewards ";

import PromoterEarnings from "../../pages/promoter/Earnings";
import EarningsHistory from "../../pages/promoter/Earnings-history";

import Withdrawals from "../../pages/promoter/Withdrawals";
import PromoterPayouts from "../../pages/promoter/Payouts";

import PrormoterTransactions from "../../pages/promoter/Transactions";
import Commissions from "../../pages/promoter/Commissions";

import PromoterNotifications from "../../pages/promoter/Notifications";
import Support from "../../pages/promoter/Support";
import Tickets from "../../pages/promoter/Tickets";

import PromoterSettings from "../../pages/promoter/Settings";
import PromoterProfile from "../../pages/promoter/Profile";
import ViralProductPage from "../../pages/vendor/Product Management/ViralProductPage";
import ProductShareAnalytics from "../../pages/vendor/Product Management/ProductShareAnalytics";
import ViralFeedPage from "../../pages/vendor/Product Management/ViralFeedPage";
import VerifyPaymentPage from "../../pages/payments/PaystackCallback";
import OrderFailed from "../../pages/buyer/OrderFailed";

/* =========================
   APP ENTRY
========================= */
function AppEntry() {
  const user = useAuthStore((s) => s.user);
  const role = useAuthStore((s) => s.user?.activeRole) || "vendor";

  if (!user) return <Navigate to="/login" replace />;

  return <Navigate to={`/${role}/dashboard`} replace />;
}

/* =========================
   ROUTER
========================= */
export default function AppRouter() {
  const isLoading = useUIStore((s) => s.loading);

  return (
    <>
      {isLoading && <Spinner />}

      <Routes>

        {/* AUTH */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/check-email" element={<CheckEmail />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* ENTRY */}
        <Route path="/app" element={<AppEntry />} />


{/* =========================
    BUYER
========================= */}

<Route path="/buyers" element={<AppLayout />}>

  {/* DASHBOARD */}
  <Route index element={<BuyerDashboard />}/>
  <Route path="dashboard" element={<BuyerDashboard />}/>

  {/* HOME */}
  <Route path="home" element={<BuyerHome />}/>

  {/* PRODUCTS */}
  <Route path="products" element={<ProductList />}/>

  <Route path="product/:id" element={<ProductDetail />}/>

  {/* CART */}
  {/* REMOVE if backend has no cart system */}
  <Route path="cart" element={<Cart />}/>

  {/* CHECKOUT */}
  <Route path="checkout" element={<Checkout />}/>


  {/* ORDERS */}
  <Route path="orders" element={<Orders />} />

    {/* PAYMENT */}
<Route path="payment/verify" element={<VerifyPaymentPage/>} />
<Route path="/buyers/order-success" element={<OrderSuccess />} />
<Route path="/buyers/order-failed" element={<OrderFailed />} />

  {/* TRACKING */}
  <Route path="track/:orderId"element={<OrderTracking />}/>
</Route>



        {/* =========================
           VENDOR
        ========================= */}
        <Route path="viral-feed" element={<ViralFeedPage />} />

        
        <Route path="/vendor" element={<AppLayout />}>
          <Route index element={<VendorDashboard />} />
          <Route path="dashboard" element={<VendorDashboard />} />

          <Route path="products" element={<VendorProducts />} />
          <Route path="products/:productId" element={<VendorProductDetails />} />

          <Route path="orders" element={<VendorOrders />} />
          <Route path="orders/:id" element={<VendorOrderDetail />} />
          <Route path="orders/pending" element={<PendingOrders />} />
          <Route path="orders/completed" element={<CompletedOrders />} />

          <Route path="inventory" element={<Inventory />} />
          <Route path="sales" element={<Sales />} />
          <Route path="returns" element={<Returns />} />

          <Route path="analytics" element={<VendorAnalytics />} />

          <Route path="shipping" element={<Shipping />} />
          <Route path="delivery-zones" element={<DeliveryZones />} />
          <Route path="delivery-rate" element={<DeliveryRate/>} />

          <Route path="revenue" element={<Revenue />} />
          <Route path="payouts" element={<Payouts />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="taxes" element={<Taxes />} />

          <Route path="payout-settings" element={<PayoutSettings />} />
          <Route path="security" element={<Security />} />

          <Route path="store" element={<Store />} />
          <Route path="store/settings" element={<StoreSettings />} />

          <Route path="reviews" element={<Reviews />} />
          <Route path="customers" element={<Customers />} />

          <Route path="product-performance" element={<ProductPerformance />} />
          <Route path="categories" element={<Categories />} />
          <Route path="discounts" element={<Discounts />} />

          
          <Route path="products/:productId/viral" element={<ViralProductPage />}/>
          <Route path="products/:productId/analytics"element={<ProductShareAnalytics />}/>

        </Route>

        {/* =========================
           RIDER
        ========================= */}
        <Route path="/rider" element={<AppLayout />}>
          <Route index element={<RiderDashboard />} />
          <Route path="dashboard" element={<RiderDashboard />} />

          <Route path="jobs" element={<RiderJobs />} />
          <Route path="delivery/:id" element={<DeliveryDetail />} />
          <Route path="tracking/:id" element={<LiveTracking />} />

          <Route path="active" element={<RiderActive />} />
          <Route path="history" element={<RiderHistory />} />

          <Route path="earnings" element={<Earnings />} />
          <Route path="payouts" element={<RiderPayouts />} />
          <Route path="transactions" element={<RiderTransactions />} />

          <Route path="analytics" element={<RiderAnalytics />} />
          <Route path="ratings" element={<RiderRatings />} />

          <Route path="map" element={<RiderMap />} />
          <Route path="zones" element={<RiderZones />} />

          <Route path="notifications" element={<RiderNotifications />} />
          <Route path="support" element={<RiderSupport />} />
          <Route path="settings" element={<RiderSettings />} />
          <Route path="vehicle" element={<RiderVehicle />} />
          <Route path="payout-settings" element={<RiderPayoutSettings />} />
        </Route>

          

          {/* =========================
    PROMOTER
========================= */}
<Route path="/promoter" element={<AppLayout />}>

  <Route index element={<PromoterDashboard />} />
  <Route path="dashboard" element={<PromoterDashboard />} />

  {/* CORE */}
  <Route path="campaigns" element={<Campaigns />} />
  <Route path="campaign-details/:id" element={<CampaignDetailsPage />} /> 

  {/* PERFORMANCE */}
  <Route path="leaderboard" element={<Leaderboard />} />
  <Route path="product-performance" element={<PromoterProductPerformance />} />

  <Route path="analytics" element={<PromoterAnalytics />} />

  {/* REFERRALS */}
  <Route path="share" element={<ShareProducts />} />
  <Route path="referrals" element={<Referrals />} />
  <Route path="referral-stats" element={<ReferralStats />} />

  {/* MARKETING */}
  <Route path="coupons" element={<Coupons />} />
  <Route path="training" element={<Training />} />
  <Route path="rewards" element={<Rewards />} />

  {/* EARNINGS */}
  <Route path="earnings" element={<PromoterEarnings />} />
  <Route path="earnings-history" element={<EarningsHistory />} />

  {/* MONEY */}
  <Route path="withdrawals" element={<Withdrawals />} />
  <Route path="payouts" element={<PromoterPayouts />} />
  <Route path="transactions" element={<PrormoterTransactions />} />
  <Route path="commissions" element={<Commissions />} />

  {/* SUPPORT */}
  <Route path="notifications" element={<PromoterNotifications />} />
  <Route path="support" element={<Support />} />
  <Route path="tickets" element={<Tickets />} />

  {/* SETTINGS */}
  <Route path="settings" element={<PromoterSettings />} />
  <Route path="profile" element={<PromoterProfile />} />

</Route>




        {/* ADMIN */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="vendors" element={<Vendors />} />
          <Route path="riders" element={<Riders />} />
          <Route path="promoters" element={<Promoters />} />
          <Route path="staff" element={<Staff />} />
          <Route path="orders" element={<Orders />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* GLOBAL */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute allowedRoles={["partner_pickup_center" , "vendor", "promoter"]}>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route path="/notifications" element={<Notifications />} />

        {/* FALLBACK */}
        <Route path="*" element={<div>404 - Page Not Found</div>} />

      </Routes>
    </>
  );
}