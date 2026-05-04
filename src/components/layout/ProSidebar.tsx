

import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

export type MenuItem = {
  label: string;
  path: string;
  icon: React.ReactNode;
};

type Props = {
  title: string;
  menu: MenuItem[];
};

export function ProSidebar({ title, menu }: Props) {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <motion.aside
      animate={{ width: collapsed ? 80 : 260 }}
      transition={{ duration: 0.25 }}
      className="h-screen bg-white border-r flex flex-col shadow-sm"
    >
      {/* HEADER */}
      <div className="flex items-center justify-between p-4 border-b">
        {!collapsed && (
          <h2 className="font-bold text-lg">{title}</h2>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded hover:bg-gray-100"
        >
          {collapsed ? "→" : "←"}
        </button>
      </div>

      {/* MENU */}
      <nav className="flex-1 p-2 space-y-1">
        {menu.map((item) => {
          const active = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition
                ${
                  active
                    ? "bg-black text-white"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
            >
              <div className="text-xl">{item.icon}</div>

              {!collapsed && (
                <span className="text-sm font-medium">
                  {item.label}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* FOOTER */}
      {!collapsed && (
        <div className="p-4 text-xs text-gray-400 border-t">
          SaaS Dashboard v1.0
        </div>
      )}
    </motion.aside>
  );
}