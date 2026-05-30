

import { NavLink } from "react-router-dom";

const links = [
  {
    label: "Dashboard",
    path: "/admin/dashboard",
  },
  {
    label: "Users",
    path: "/admin/users",
  },
  {
    label: "Vendors",
    path: "/admin/vendors",
  },
  {
    label: "Riders",
    path: "/admin/riders",
  },
  {
    label: "Promoters",
    path: "/admin/promoters",
  },
  {
    label: "Staff",
    path: "/admin/staff",
  },
  {
    label: "Orders",
    path: "/admin/orders",
  },
  {
    label: "Analytics",
    path: "/admin/analytics",
  },
  {
    label: "Settings",
    path: "/admin/settings",
  },
];

export default function AdminSidebar() {
  return (
    <aside
      className="
        w-72
        bg-black
        text-white
        min-h-screen
        p-5
      "
    >
      <h1 className="text-2xl font-bold mb-8">
        Admin Panel
      </h1>

      <div className="flex flex-col gap-2">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              `
                px-4
                py-3
                rounded-xl
                transition
                ${
                  isActive
                    ? "bg-white text-black"
                    : "hover:bg-white/10"
                }
              `
            }
          >
            {link.label}
          </NavLink>
        ))}
      </div>
    </aside>
  );
}