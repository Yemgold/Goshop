




import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

export type MenuItem = {
  label: string;
  path?: string;
  icon?: React.ReactNode;
  children?: MenuItem[];
  type?: "group";
};

type Props = {
  title: string;
  menu: MenuItem[];
  footer?: React.ReactNode;
};

export function ProSidebar({ title, menu, footer }: Props) {
  const [collapsed, setCollapsed] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const location = useLocation();

  const toggleGroup = (label: string) => {
  setOpenGroup((prev) =>
    prev === label ? null : label
  );
};

  return (
    <motion.aside
      animate={{ width: collapsed ? 85 : 260 }}
      transition={{ duration: 0.25 }}
      className="h-full bg-white border-r shadow-sm flex flex-col"
    >
      {/* ================= HEADER ================= */}
      <div className="flex items-center justify-between p-4 border-b shrink-0">
        {!collapsed && (
          <h2 className="font-bold text-lg">{title}</h2>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-lg hover:bg-gray-100 transition"
        >
          {collapsed ? "→" : "←"}
        </button>
      </div>

      {/* ================= MENU ================= */}
      <div className="flex-1 overflow-y-auto">
        <nav className="p-2 space-y-1">

          {menu.map((item) => {
            const isActive =
              item.path &&
              location.pathname === item.path;

            const isOpen = openGroup === item.label;

            /* ================= GROUP HEADER ================= */
            if (item.type === "group") {
              return (
                <div
                  key={item.label}
                  className="
                    mt-6 mb-2 px-4
                    text-[10px]
                    font-semibold
                    text-gray-500
                    uppercase
                    tracking-[0.25em]
                  "
                >
                  {!collapsed && item.label}
                </div>
              );
            }

            /* ================= DROPDOWN ================= */
            if (item.children?.length) {
              return (
                <div key={item.label}>
                  <button
                    type="button"
                    onClick={() => toggleGroup(item.label)}
                    className="
                      w-full flex items-center justify-between gap-3
                      px-3 py-3 rounded-xl
                      text-gray-700 hover:bg-gray-100
                      transition
                    "
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-lg">{item.icon}</div>

                      {!collapsed && (
                        <span className="text-sm font-medium">
                          {item.label}
                        </span>
                      )}
                    </div>

                    {!collapsed && (
                      <motion.span
                        animate={{ rotate: isOpen ? 90 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        ▶
                      </motion.span>
                    )}
                  </button>

                  {/* ================= CHILDREN ================= */}
                  <AnimatePresence>
                    {isOpen && !collapsed && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="ml-5 mt-1 space-y-1 overflow-hidden"
                      >
                        {item.children.map((child) => {
                          const childActive =
                            location.pathname === child.path;

                          return (
                            <Link
                              key={child.path}
                              to={child.path || "#"}
                              className={`
                                flex items-center gap-3 px-3 py-2.5
                                rounded-lg text-sm transition
                                ${
                                  childActive
                                    ? "bg-black text-white"
                                    : "text-gray-600 hover:bg-gray-100"
                                }
                              `}
                            >
                              <div className="text-base">
                                {child.icon}
                              </div>

                              <span>{child.label}</span>
                            </Link>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }

            /* ================= NORMAL LINK ================= */
            return (
              <Link
                key={item.path || item.label}
                to={item.path || "#"}
                className={`
                  flex items-center gap-3 px-3 py-3 rounded-xl
                  transition
                  ${
                    isActive
                      ? "bg-black text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }
                `}
              >
                <div className="text-lg">{item.icon}</div>

                {!collapsed && (
                  <span className="text-sm font-medium">
                    {item.label}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* ================= FOOTER ================= */}
      {footer && (
        <div className="shrink-0 border-t bg-white p-3">
          {footer}
        </div>
      )}
    </motion.aside>
  );
}