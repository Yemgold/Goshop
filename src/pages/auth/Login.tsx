

import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

import AuthLayout from "../../app/layouts/AuthLayout";
import { useLogin } from "../../hooks/auth/useLogin";

export default function Login() {
  const { handleLogin } = useLogin();

  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const [showPassword, setShowPassword] = useState(false);

  return (
    <AuthLayout>
      <div className="min-h-[75vh] flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md rounded-3xl bg-white/70 backdrop-blur-2xl border border-white/30 shadow-2xl p-8"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold">
              Welcome Back 👋
            </h2>

            <p className="text-gray-500 mt-2">
              Sign in to continue to your dashboard
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin(form.email, form.password);
            }}
            className="space-y-5"
          >
            {/* Email */}
            <input
              type="email"
              placeholder="Email Address"
              value={form.email}
              onChange={(e) =>
                setForm({
                  ...form,
                  email: e.target.value,
                })
              }
              className="w-full rounded-xl border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-black transition"
            />

            {/* Password */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={form.password}
                onChange={(e) =>
                  setForm({
                    ...form,
                    password: e.target.value,
                  })
                }
                className="w-full rounded-xl border border-gray-300 p-3 pr-12 focus:outline-none focus:ring-2 focus:ring-black transition"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black transition"
              >
                {showPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            </div>

            {/* Remember Me + Forgot Password */}
            <div className="flex justify-between items-center text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.remember}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      remember: e.target.checked,
                    })
                  }
                />

                <span>Remember Me</span>
              </label>

              <Link
                to="/forgot-password"
                className="text-blue-600 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full rounded-xl bg-black text-white py-3 font-semibold hover:bg-gray-800 transition"
            >
              Login
            </button>
          </form>

          {/* Register */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-semibold text-black hover:underline"
              >
                Create Account
              </Link>
            </p>
          </div>

          {/* Guest */}
          <div className="mt-3 text-center">
            <Link
              to="/"
              className="text-gray-500 hover:text-black hover:underline text-sm"
            >
              Continue as Guest
            </Link>
          </div>

          {/* Divider */}
          <div className="flex items-center my-8">
            <div className="flex-1 border-t border-gray-300"></div>

            <span className="px-3 text-xs uppercase tracking-wider text-gray-400">
              Secure Login
            </span>

            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          {/* Footer */}
          <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-500">
            <Link
              to="/privacy"
              className="hover:text-black hover:underline"
            >
              Privacy Policy
            </Link>

            <Link
              to="/terms"
              className="hover:text-black hover:underline"
            >
              Terms
            </Link>

            <Link
              to="/contact"
              className="hover:text-black hover:underline"
            >
              Contact
            </Link>
          </div>
        </motion.div>
      </div>
    </AuthLayout>
  );
}
















































// import { useState } from "react";
// import { motion } from "framer-motion";

// import AuthLayout from "../../app/layouts/AuthLayout";

// import { useLogin } from "../../hooks/auth/useLogin"; 

// export default function Login() {
//   const { handleLogin } = useLogin();

//   const [form, setForm] = useState({
//     email: "",
//     password: "",
//   });

//   return (
//     <AuthLayout>
//       <div className="min-h-[75vh] flex items-center justify-center px-4">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="w-full max-w-md rounded-3xl p-6 bg-white/70 backdrop-blur-2xl border border-white/30 shadow-2xl"
//         >
//           <div className="text-center mb-6">
//             <h2 className="text-2xl font-bold">
//               Welcome Back 👋
//             </h2>

//             <p className="text-sm text-gray-500 mt-1">
//               Sign in to continue your dashboard
//             </p>
//           </div>

//           <form
//             onSubmit={(e) => {
//               e.preventDefault();

//               handleLogin(
//                 form.email,
//                 form.password
//               );
//             }}
//             className="space-y-4"
//           >
//             <input
//               type="email"
//               placeholder="Email address"
//               value={form.email}
//               onChange={(e) =>
//                 setForm({
//                   ...form,
//                   email: e.target.value,
//                 })
//               }
//               className="w-full p-3 rounded-xl border"
//             />

//             <input
//               type="password"
//               placeholder="Password"
//               value={form.password}
//               onChange={(e) =>
//                 setForm({
//                   ...form,
//                   password: e.target.value,
//                 })
//               }
//               className="w-full p-3 rounded-xl border"
//             />

//             <button
//               type="submit"
//               className="w-full py-3 rounded-xl bg-black text-white"
//             >
//               Login
//             </button>
//           </form>
//         </motion.div>
//       </div>
//     </AuthLayout>
//   );
// }


