
import { useAuthStore } from "../../store/auth.store";
import type { UserRole } from "../../store/auth.store";
import { getRoleRoute } from "../../utils/roleRedirect";
import { useNavigate } from "react-router-dom";

const roleIcons: Record<UserRole, string> = {
  buyer: "🛒",
  vendor: "🏪",
  rider: "🚚",
  promoter: "📢",
};

export default function RoleSwitcher() {
  const navigate = useNavigate();

  const user = useAuthStore((s) => s.user);
  const switchRole = useAuthStore((s) => s.switchRole);

  if (!user) return null;

  const roles = user.roles ?? [];
  const active = user.activeRole;

  // 🚨 safety: prevent crash if active role is missing
  const activeIndex = Math.max(0, roles.indexOf(active));

  const handleChange = (role: UserRole) => {
    switchRole(role);
    navigate(getRoleRoute(role), { replace: true });
  };

  // 🚨 safety: avoid divide-by-zero
  const width = roles.length ? 100 / roles.length : 100;

  return (
    <div className="relative flex bg-gray-200 rounded-lg p-1 w-fit overflow-hidden">

      {/* 🔥 animated background slider */}
      <div
        className="absolute top-1 bottom-1 bg-black rounded-md transition-all duration-300"
        style={{
          width: `${width}%`,
          left: `${activeIndex * width}%`,
        }}
      />

      {/* buttons */}
      {roles.map((role) => (
        <button
          key={role}
          onClick={() => handleChange(role)}
          className={`
            relative z-10 flex items-center gap-1 px-4 py-1 text-sm rounded-md
            transition-colors
            ${active === role ? "text-white" : "text-gray-700"}
          `}
        >
          <span>{roleIcons[role]}</span>
          <span className="capitalize">{role}</span>
        </button>
      ))}
    </div>
  );
}