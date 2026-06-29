




import { Outlet, Link } from "react-router-dom";
import { ShoppingCart,  } from "lucide-react";

export default function PublicBuyerLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* ================= HEADER ================= */}
      <header className="sticky top-0 z-50 bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/buyers/home"
            className="text-2xl font-bold text-black"
          >
            gO-Shopping
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              to="/digital/products"
              className="hover:text-black text-gray-600 transition"
            >
              Digital-Products
            </Link>




            <Link
              to="/market/place"
              className="hover:text-black text-gray-600 transition"
            >
              Market-Place
            </Link>

            <Link
              to="/buyers/become-rider"
              className="hover:text-black text-gray-600 transition"
            >
              Become a Rider
            </Link>
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            {/* Cart */}
            <Link
              to="/login"
              className="relative p-2 rounded-full hover:bg-gray-100"
              title="Login to view cart"
            >
              <ShoppingCart size={22} />
            </Link>

            {/* Login */}
            <Link
              to="/login"
              className="px-4 py-2 rounded-xl bg-black text-white hover:bg-gray-800 transition"
            >
              Login
            </Link>

            {/* Register */}
            <Link
              to="/register"
              className="px-4 py-2 rounded-xl border border-black hover:bg-black hover:text-white transition"
            >
              Register
            </Link>
          </div>
        </div>
      </header>

      {/* ================= PAGE CONTENT ================= */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        <Outlet />
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="border-t bg-white mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} gO-Shopping. All rights reserved.</p>

          <div className="flex gap-6 mt-3 md:mt-0">
            <Link to="/privacy" className="hover:text-black">
              Privacy Policy
            </Link>

            <Link to="/terms" className="hover:text-black">
              Terms
            </Link>

            <Link to="/contact" className="hover:text-black">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}