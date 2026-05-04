


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore, type UserRole } from "../../store/auth.store";
import { getRoleRoute } from "../../utils/roleRedirect";
import AuthLayout from "../../app/layouts/AuthLayout";
import { motion } from "framer-motion";

export default function Login() {
  const navigate = useNavigate();
  const login = useAuthStore((s) => s.login);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.email || !form.password) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const DEFAULT_ROLE: UserRole = "buyer";

      const user = {
        id: "1",
        name: "Demo User",

        // 👇 IMPORTANT: safe initialization
        roles: [DEFAULT_ROLE],

        activeRole: DEFAULT_ROLE,

        // 👇 ensure system consistency
        roleRequests: [],
      };

      login(user, "mock-token");

      navigate(getRoleRoute(user.activeRole), { replace: true });

      setLoading(false);
    }, 700);
  };

  return (
    <AuthLayout>
      <div className="min-h-[75vh] flex items-center justify-center px-4">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md rounded-3xl p-6
                     bg-white/70 backdrop-blur-2xl
                     border border-white/30 shadow-2xl"
        >

          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold">
              Welcome Back 👋
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Sign in to continue your dashboard
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">

            <input
              className="w-full p-3 rounded-xl border
                         bg-white/70 backdrop-blur
                         focus:outline-none focus:ring-2 focus:ring-black/20"
              placeholder="Email address"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />

            <input
              type="password"
              className="w-full p-3 rounded-xl border
                         bg-white/70 backdrop-blur
                         focus:outline-none focus:ring-2 focus:ring-black/20"
              placeholder="Password"
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />

            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-500 text-sm text-center"
              >
                {error}
              </motion.p>
            )}

            <button
              disabled={loading}
              className="w-full py-3 rounded-xl font-medium
                         bg-black text-white hover:bg-gray-800
                         transition disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Login"}
            </button>

            <div className="text-center text-sm mt-3 space-y-1">

              <a
                href="/forgot-password"
                className="text-blue-500 hover:underline"
              >
                Forgot password?
              </a>

              <p className="text-gray-500">
                Don’t have an account?{" "}
                <a
                  href="/register"
                  className="text-black font-medium hover:underline"
                >
                  Sign up
                </a>
              </p>

            </div>

          </form>
        </motion.div>
      </div>
    </AuthLayout>
  );
}