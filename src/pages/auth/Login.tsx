import { useState } from "react";
import { motion } from "framer-motion";

import AuthLayout from "../../app/layouts/AuthLayout";

import { useLogin } from "../../hooks/auth/useLogin"; 

export default function Login() {
  const { handleLogin } = useLogin();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  return (
    <AuthLayout>
      <div className="min-h-[75vh] flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md rounded-3xl p-6 bg-white/70 backdrop-blur-2xl border border-white/30 shadow-2xl"
        >
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold">
              Welcome Back 👋
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Sign in to continue your dashboard
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();

              handleLogin(
                form.email,
                form.password
              );
            }}
            className="space-y-4"
          >
            <input
              type="email"
              placeholder="Email address"
              value={form.email}
              onChange={(e) =>
                setForm({
                  ...form,
                  email: e.target.value,
                })
              }
              className="w-full p-3 rounded-xl border"
            />

            <input
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) =>
                setForm({
                  ...form,
                  password: e.target.value,
                })
              }
              className="w-full p-3 rounded-xl border"
            />

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-black text-white"
            >
              Login
            </button>
          </form>
        </motion.div>
      </div>
    </AuthLayout>
  );
}


