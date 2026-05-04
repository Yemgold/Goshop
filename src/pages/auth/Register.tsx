

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore, type UserRole } from "../../store/auth.store";
import { getRoleRoute } from "../../utils/roleRedirect";
import AuthLayout from "../../app/layouts/AuthLayout";

export default function Register() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    referral: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.name || !form.email || !form.password) {
      setError("Please fill all required fields");
      return;
    }

    setLoading(true);

    const DEFAULT_ROLE: UserRole = "buyer";

    setTimeout(() => {
      const newUser = {
        id: Date.now().toString(),
        name: form.name,

        // 👇 approved roles (start with buyer only)
        roles: [DEFAULT_ROLE],

        activeRole: DEFAULT_ROLE,

        // 👇 IMPORTANT for upgrade system
        roleRequests: [],
      };

      login(newUser, "mock-token");

      navigate(getRoleRoute(DEFAULT_ROLE), { replace: true });

      setLoading(false);
    }, 700);
  };

  return (
    <AuthLayout>
      <div className="space-y-6">

        {/* HEADER */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white">
            Create Account 🚀
          </h2>
          <p className="text-white/60 text-sm mt-1">
            Join the marketplace in seconds
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            name="name"
            type="text"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-white/10 backdrop-blur-xl border border-white/20 text-white"
          />

          <input
            name="email"
            type="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-white/10 backdrop-blur-xl border border-white/20 text-white"
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-white/10 backdrop-blur-xl border border-white/20 text-white"
          />

          <input
            name="referral"
            type="text"
            placeholder="Referral Code (optional)"
            value={form.referral}
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-white/10 backdrop-blur-xl border border-white/20 text-white"
          />

          {error && (
            <p className="text-red-400 text-sm">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl font-medium
                       bg-gradient-to-r from-blue-600 to-indigo-600
                       hover:opacity-90 transition text-white"
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>

          <p className="text-center text-sm text-white/60">
            Already have an account?{" "}
            <span
              className="text-white font-medium cursor-pointer hover:underline"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </p>

        </form>
      </div>
    </AuthLayout>
  );
}