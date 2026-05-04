// import { Routes, Route } from "react-router-dom";


// // ================= AUTH =================
// import Landing from "../../pages/LandingPage";
// import Login from "../../pages/auth/Login";
// import Register from "../../pages/auth/Register";
// import ForgotPassword from "../../pages/auth/ForgotPassword"; 
// import ResetPassword from "../../pages/auth/ResetPassword"; 

// // ================= LAYOUTS =================

// import RiderLayout from "../layouts/RiderLayout";
// import PromoterLayout from "../layouts/PromoterLayout";
// import BuyerLayout from "../layouts/BuyerLayout";
// import VendorLayout from "../layouts/VendorLayout";

// // ================= BUYER =================
// import BuyerHome from "../../pages/buyer/Home";
// import BuyerDashboard from "../../pages/buyer/dashboard";
// import ProductList from "../../pages/buyer/ProductList";
// import ProductDetail from "../../pages/buyer/ProductDetail";
// import Cart from "../../pages/buyer/Cart";
// import Checkout from "../../pages/buyer/Checkout";
// import OrderSuccess from "../../pages/buyer/OrderSuccess";
// import Orders from "../../pages/buyer/Orders";
// import OrderTracking from "../../pages/buyer/OrderTracking";

// // ================= VENDOR =================

// import VendorDashboard from "../../pages/vendor/Dashboard";
// import VendorProducts from "../../pages/vendor/Products";
// import VendorOrders from "../../pages/vendor/Orders";
// import VendorOrderDetail from "../../pages/vendor/OrderDetail";
// import VendorAnalytics from "../../pages/vendor/Analytics";

// // ================= RIDER =================
// import RiderDashboard from "../../pages/rider/Dashboard";
// import RiderJobs from "../../pages/rider/Jobs";
// import DeliveryDetail from "../../pages/rider/DeliveryDetail";
// import LiveTracking from "../../pages/rider/LiveTracking";
// import Earnings from "../../pages/rider/Earnings";

// // ================= PROMOTER =================
// import PromoterDashboard from "../../pages/promoter/Dashboard";
// import ShareProducts from "../../pages/promoter/ShareProducts";
// import Campaigns from "../../pages/promoter/Campaigns";
// import PromoterAnalytics from "../../pages/promoter/Analytics";

// // ================= GLOBAL =================
// import Profile from "../../pages/global/Profile";
// import Notifications from "../../pages/global/Notifications";



// export default function AppRouter() {
//   return (
//     <Routes>

//       {/* ================= AUTH ================= */}
//       <Route path="/" element={<Landing />} />
//       <Route path="/login" element={<Login />} />
//       <Route path="/register" element={<Register />} />
//       <Route path="/forgot-password" element={<ForgotPassword />} />
//       <Route path="/reset-Password" element={<ResetPassword />} />

//       {/* ================= BUYER ================= */}
// <Route path="/buyer" element={<BuyerLayout />}>

//   <Route index element={<BuyerDashboard />} />
//   <Route path="home" element={<BuyerHome />} />
//   <Route path="dashboard" element={<BuyerDashboard />} />
//   <Route path="products" element={<ProductList />} />
//   <Route path="product/:id" element={<ProductDetail />} />
//   <Route path="cart" element={<Cart />} />
//   <Route path="checkout" element={<Checkout />} />
//   <Route path="orders" element={<Orders />} />
//   <Route path="order-success" element={<OrderSuccess />} />
//   <Route path="track/:orderId" element={<OrderTracking />} />

// </Route>

// {/* ================= VENDOR ================= */}
// <Route path="/vendor" element={<VendorLayout />}>

//   <Route index element={<VendorDashboard />} />
//   <Route path="dashboard" element={<VendorDashboard />} />
//   <Route path="products" element={<VendorProducts />} />
//   <Route path="orders" element={<VendorOrders />} />
//   <Route path="orders/:id" element={<VendorOrderDetail />} />
//   <Route path="analytics" element={<VendorAnalytics />} />

// </Route>

// {/* ================= RIDER ================= */}
// <Route path="/rider" element={<RiderLayout />}>

//   <Route index element={<RiderDashboard />} />
//   <Route path="dashboard" element={<RiderDashboard />} />
//   <Route path="jobs" element={<RiderJobs />} />
//   <Route path="delivery/:id" element={<DeliveryDetail />} />
//   <Route path="tracking/:id" element={<LiveTracking />} />
//   <Route path="earnings" element={<Earnings />} />

// </Route>

// {/* ================= PROMOTER ================= */}
// <Route path="/promoter" element={<PromoterLayout />}>

//   <Route index element={<PromoterDashboard />} />
//   <Route path="dashboard" element={<PromoterDashboard />} />
//   <Route path="share" element={<ShareProducts />} />
//   <Route path="campaigns" element={<Campaigns />} />
//   <Route path="analytics" element={<PromoterAnalytics />} />

// </Route>
      

//       {/* ================= GLOBAL ================= */}
//       <Route path="/profile" element={<Profile />} />
//       <Route path="/notifications" element={<Notifications />} />

//       {/* ================= FALLBACK ================= */}
//       <Route path="*" element={<div>404 - Page Not Found</div>} />

//     </Routes>
//   );
// }


// ..............................................................................

import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "../../store/auth.store"; 
import { ProtectedRoute } from "../../routes/ProtectedRoute";

/* ================= ROLE REDIRECT ================= */
function AppEntry() {
  const user = useAuthStore((s) => s.user);

  if (!user) return <Navigate to="/login" replace />;

  return <Navigate to={`/${user.activeRole}/dashboard`} replace />;
}

/* ================= AUTH ================= */
import Landing from "../../pages/LandingPage";
import Login from "../../pages/auth/Login";
import Register from "../../pages/auth/Register";
import ForgotPassword from "../../pages/auth/ForgotPassword";
import ResetPassword from "../../pages/auth/ResetPassword";

/* ================= LAYOUTS ================= */
import RiderLayout from "../layouts/RiderLayout";
import PromoterLayout from "../layouts/PromoterLayout";
import BuyerLayout from "../layouts/BuyerLayout";
import VendorLayout from "../layouts/VendorLayout";

/* ================= BUYER ================= */
import BuyerHome from "../../pages/buyer/Home";
import BuyerDashboard from "../../pages/buyer/Dashboard";
import ProductList from "../../pages/buyer/ProductList";
import ProductDetail from "../../pages/buyer/ProductDetail";
import Cart from "../../pages/buyer/Cart";
import Checkout from "../../pages/buyer/Checkout";
import OrderSuccess from "../../pages/buyer/OrderSuccess";
import Orders from "../../pages/buyer/Orders";
import OrderTracking from "../../pages/buyer/OrderTracking";

/* ================= VENDOR ================= */
import VendorDashboard from "../../pages/vendor/Dashboard";
import VendorProducts from "../../pages/vendor/Products";
import VendorOrders from "../../pages/vendor/Orders";
import VendorOrderDetail from "../../pages/vendor/OrderDetail";
import VendorAnalytics from "../../pages/vendor/Analytics";

/* ================= RIDER ================= */
import RiderDashboard from "../../pages/rider/Dashboard";
import RiderJobs from "../../pages/rider/Jobs";
import DeliveryDetail from "../../pages/rider/DeliveryDetail";
import LiveTracking from "../../pages/rider/LiveTracking";
import Earnings from "../../pages/rider/Earnings";

/* ================= PROMOTER ================= */
import PromoterDashboard from "../../pages/promoter/Dashboard";
import ShareProducts from "../../pages/promoter/ShareProducts";
import Campaigns from "../../pages/promoter/Campaigns";
import PromoterAnalytics from "../../pages/promoter/Analytics";

// // ================= GLOBAL =================
import Profile from "../../pages/global/Profile";
import Notifications from "../../pages/global/Notifications";

export default function AppRouter() {
  return (
    <Routes>

      {/* ================= AUTH ================= */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* ================= APP ENTRY (IMPORTANT) ================= */}
      <Route path="/app" element={<AppEntry />} />

      {/* ================= BUYER ================= */}

      <Route path="/buyer/home" element={<BuyerHome />} />

      <Route path="/buyer" element={<BuyerLayout />}>

        <Route index element={<BuyerDashboard />} />      
        <Route path="dashboard" element={<BuyerDashboard />} />
        <Route path="products" element={<ProductList />} />
        <Route path="product/:id" element={<ProductDetail />} />
        <Route path="cart" element={<Cart />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="orders" element={<Orders />} />
        <Route path="order-success" element={<OrderSuccess />} />
        <Route path="track/:orderId" element={<OrderTracking />} />

      </Route>

      {/* ================= VENDOR ================= */}
      <Route path="/vendor" element={<VendorLayout />}>

        <Route index element={<VendorDashboard />} />
        <Route path="dashboard" element={<VendorDashboard />} />
        <Route path="products" element={<VendorProducts />} />
        <Route path="orders" element={<VendorOrders />} />
        <Route path="orders/:id" element={<VendorOrderDetail />} />
        <Route path="analytics" element={<VendorAnalytics />} />

      </Route>

      {/* ================= RIDER ================= */}
      <Route path="/rider" element={<RiderLayout />}>

        <Route index element={<RiderDashboard />} />
        <Route path="dashboard" element={<RiderDashboard />} />
        <Route path="jobs" element={<RiderJobs />} />
        <Route path="delivery/:id" element={<DeliveryDetail />} />
        <Route path="tracking/:id" element={<LiveTracking />} />
        <Route path="earnings" element={<Earnings />} />

      </Route>

      {/* ================= PROMOTER ================= */}
      <Route path="/promoter" element={<PromoterLayout />}>

        <Route index element={<PromoterDashboard />} />
        <Route path="dashboard" element={<PromoterDashboard />} />
        <Route path="share" element={<ShareProducts />} />
        <Route path="campaigns" element={<Campaigns />} />
        <Route path="analytics" element={<PromoterAnalytics />} />

      </Route>

          {/* ================= GLOBAL ================= */}
      
     <Route
  path="/profile"
  element={
    <ProtectedRoute allowedRoles={["buyer", "promoter", "vendor"]}>
      <Profile />
    </ProtectedRoute>
  }
/>
      <Route path="/notifications" element={<Notifications />} />

      {/* ================= FALLBACK ================= */}
      <Route path="*" element={<div>404 - Page Not Found</div>} />

    </Routes>
  );
}


// .............................................................................


// import { Routes, Route } from "react-router-dom";

// // ================= ROLE SYSTEM =================
// import { RoleRoute } from "./RoleRoute";
// import { RoleLayout } from "../../components/layout/RoleLayout";

// // SIDEBARS
// import { VendorSidebar } from "../../components/layout/VendorSidebar";
// import { BuyerSidebar } from "../../components/layout/BuyerSidebar";
// import { RiderSidebar } from "../../components/layout/RiderSidebar";

// // ================= AUTH =================
// import Landing from "../../pages/auth/Landing";
// import Login from "../../pages/auth/Login";
// import Register from "../../pages/auth/Register";

// // ================= BUYER =================
// import BuyerHome from "../../pages/buyer/Home";
// import ProductList from "../../pages/buyer/ProductList";
// import ProductDetail from "../../pages/buyer/ProductDetail";
// import Cart from "../../pages/buyer/Cart";
// import Checkout from "../../pages/buyer/Checkout";
// import Orders from "../../pages/buyer/Orders";
// import OrderSuccess from "../../pages/buyer/OrderSuccess";
// import OrderTracking from "../../pages/buyer/OrderTracking";

// // ================= VENDOR =================
// import VendorDashboard from "../../pages/vendor/Dashboard";
// import VendorProducts from "../../pages/vendor/Products";
// import VendorOrders from "../../pages/vendor/Orders";
// import VendorOrderDetail from "../../pages/vendor/OrderDetail";
// import VendorAnalytics from "../../pages/vendor/Analytics";

// // ================= RIDER =================
// import RiderDashboard from "../../pages/rider/Dashboard";
// import RiderJobs from "../../pages/rider/Jobs";
// import DeliveryDetail from "../../pages/rider/DeliveryDetail";
// import LiveTracking from "../../pages/rider/LiveTracking";
// import Earnings from "../../pages/rider/Earnings";

// // ================= PROMOTER =================
// import PromoterDashboard from "../../pages/promoter/Dashboard";
// import ShareProducts from "../../pages/promoter/ShareProducts";
// import Campaigns from "../../pages/promoter/Campaigns";
// import PromoterAnalytics from "../../pages/promoter/Analytics";

// // ================= GLOBAL =================
// import Profile from "../../pages/global/Profile";
// import Notifications from "../../pages/global/Notifications";

// export default function AppRouter() {
//   return (
//     <Routes>

//       {/* ================= AUTH ================= */}
//       <Route path="/" element={<Landing />} />
//       <Route path="/login" element={<Login />} />
//       <Route path="/register" element={<Register />} />

//       {/* ================= BUYER ================= */}
//       <Route
//         path="/buyer/home"
//         element={
//           <RoleRoute role="buyer">
//             <RoleLayout sidebar={<BuyerSidebar />}>
//               <BuyerHome />
//             </RoleLayout>
//           </RoleRoute>
//         }
//       />

//       <Route path="/buyer/products" element={<ProductList />} />
//       <Route path="/buyer/product/:id" element={<ProductDetail />} />
//       <Route path="/buyer/cart" element={<Cart />} />
//       <Route path="/buyer/checkout" element={<Checkout />} />
//       <Route path="/buyer/order-success" element={<OrderSuccess />} />
//       <Route path="/buyer/track/:orderId" element={<OrderTracking />} />

//       {/* ================= VENDOR ================= */}
//       <Route
//         path="/vendor/dashboard"
//         element={
//           <RoleRoute role="vendor">
//             <RoleLayout sidebar={<VendorSidebar />}>
//               <VendorDashboard />
//             </RoleLayout>
//           </RoleRoute>
//         }
//       />

//       <Route
//         path="/vendor/products"
//         element={
//           <RoleRoute role="vendor">
//             <RoleLayout sidebar={<VendorSidebar />}>
//               <VendorProducts />
//             </RoleLayout>
//           </RoleRoute>
//         }
//       />

//       <Route
//         path="/vendor/orders"
//         element={
//           <RoleRoute role="vendor">
//             <RoleLayout sidebar={<VendorSidebar />}>
//               <VendorOrders />
//             </RoleLayout>
//           </RoleRoute>
//         }
//       />

//       <Route
//         path="/vendor/orders/:id"
//         element={
//           <RoleRoute role="vendor">
//             <RoleLayout sidebar={<VendorSidebar />}>
//               <VendorOrderDetail />
//             </RoleLayout>
//           </RoleRoute>
//         }
//       />

//       <Route path="/vendor/analytics" element={<VendorAnalytics />} />

//       {/* ================= RIDER ================= */}
//       <Route
//         path="/rider/dashboard"
//         element={
//           <RoleRoute role="rider">
//             <RoleLayout sidebar={<RiderSidebar />}>
//               <RiderDashboard />
//             </RoleLayout>
//           </RoleRoute>
//         }
//       />

//       <Route path="/rider/jobs" element={<RiderJobs />} />
//       <Route path="/rider/delivery/:id" element={<DeliveryDetail />} />
//       <Route path="/rider/tracking/:id" element={<LiveTracking />} />
//       <Route path="/rider/earnings" element={<Earnings />} />

//       {/* ================= PROMOTER ================= */}
//       <Route path="/promoter/dashboard" element={<PromoterDashboard />} />
//       <Route path="/promoter/share" element={<ShareProducts />} />
//       <Route path="/promoter/campaigns" element={<Campaigns />} />
//       <Route path="/promoter/analytics" element={<PromoterAnalytics />} />

//       {/* ================= GLOBAL ================= */}
//       <Route path="/profile" element={<Profile />} />
//       <Route path="/notifications" element={<Notifications />} />

//       {/* ================= FALLBACK ================= */}
//       <Route path="*" element={<div>404 - Page Not Found</div>} />

//     </Routes>
//   );
// }
















































