

import type { ReactNode } from "react";

export function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex bg-gray-50">

      {/* SIDEBAR */}
      <aside className="w-64 bg-white border-r p-4">
        <h2 className="font-bold text-lg mb-6">E-Commerce</h2>

        <nav className="space-y-2 text-sm">
          <a href="/vendor/dashboard" className="block p-2 rounded hover:bg-gray-100">
            Dashboard
          </a>
          <a href="/vendor/orders" className="block p-2 rounded hover:bg-gray-100">
            Orders
          </a>
          <a href="/vendor/products" className="block p-2 rounded hover:bg-gray-100">
            Products
          </a>
        </nav>
      </aside>

      {/* MAIN AREA */}
      <main className="flex-1 p-6">
        {children}
      </main>

    </div>
  );
}