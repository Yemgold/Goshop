




import { useNavigate } from "react-router-dom";
import { getRoleRoute } from "../../utils/roleRedirect";
import { useAuthStore } from "../../store/auth.store";

export type UserRole = "vendor" | "partner_pickup_center" | "rider"| "promoter";


const roleIcons: Record<UserRole, string> = {
  vendor: "🏪",
  partner_pickup_center: "🚚",
  promoter: "📢",
  rider: "",
};

const roleLabels: Record<UserRole, string> = {
  vendor: "Vendor",
  partner_pickup_center: "Hub",
  promoter: "Promoter",
  rider: "rider",
};

export default function RoleSwitcher() {
  const navigate = useNavigate();

  const user = useAuthStore((s) => s.user);
  const setRole = useAuthStore((s) => s.setRole);


const roles = user?.roles || [];

// console.log("USER:", user);
// console.log("ROLES:", user?.roles);

  const currentRole = user?.activeRole;

  if (!user || roles.length === 0) return null;

  const handleChange = (role: UserRole) => {
    // console.log("🔄 SWITCH ROLE:", role);

    // 1. update auth store ONLY (single source of truth)
    setRole(role);

    // 2. navigate
    navigate(getRoleRoute(role), { replace: true });
  };

  const activeIndex = Math.max(
    0,
    roles.findIndex((r) => r === currentRole)
  );

  const width = 100 / roles.length;

  return (
    <div className="relative flex bg-gray-200 rounded-lg p-1 w-fit overflow-hidden">
      {/* indicator */}
      <div
        className="absolute top-1 bottom-1 bg-black rounded-md transition-all duration-300"
        style={{
          width: `${width}%`,
          left: `${activeIndex * width}%`,
        }}
      />

      {roles.map((role) => (
        <button
          key={role}
          onClick={() => handleChange(role as UserRole)}
          className={`relative z-10 flex items-center gap-1 px-4 py-1 text-sm rounded-md ${
            currentRole === role ? "text-white" : "text-gray-700"
          }`}
        >
          <span>{roleIcons[role as UserRole]}</span>
          <span>{roleLabels[role as UserRole]}</span>
        </button>
      ))}
    </div>
  );
}