

import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import AuthLayout from "../../app/layouts/AuthLayout";
import { toast } from "sonner";
import { authService } from "../../services/auth.service";
import { useUIStore } from "../../store/ui.store";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // ✅ token from URL: /reset-password?token=123456
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [success, setSuccess] = useState(false);

  const startLoading = useUIStore((s) => s.startLoading);
  const stopLoading = useUIStore((s) => s.stopLoading);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (!token) {
      toast.error("Invalid or expired reset link");
      return;
    }

    startLoading();

    try {
      console.log("🔐 RESET PASSWORD:", {
        password,
        confirmPassword,
        token,
      });

      const res = await authService.resetPassword({
        password,
        confirmPassword,
        token,
      });

      const data = res.data;

      console.log("✅ RESET RESPONSE:", data);

      toast.success(
        data?.message || "Password reset successful"
      );

      setSuccess(true);

    } catch (err: any) {
      console.log("❌ RESET ERROR:", err?.response?.data);

      toast.error(
        err?.response?.data?.message ||
        "Failed to reset password"
      );

    } finally {
      stopLoading();
    }
  };

  return (
    <AuthLayout>
      <div className="space-y-6">

        {/* HEADER */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white">
            Reset Password
          </h2>

          <p className="text-white/60 text-sm mt-1">
            Create a new secure password for your account
          </p>
        </div>

        {/* SUCCESS STATE */}
        {success ? (
          <div className="text-center space-y-3">
            <div className="text-green-400 font-medium">
              Password reset successful 🎉
            </div>

            <p className="text-white/60 text-sm">
              You can now log in with your new password.
            </p>

            <button
              onClick={() => navigate("/login")}
              className="mt-4 text-white underline text-sm"
            >
              Go to Login →
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* PASSWORD */}
            <input
              type="password"
              placeholder="New password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-xl
                         bg-white/10 backdrop-blur-xl
                         border border-white/20
                         text-white placeholder-white/50
                         outline-none focus:ring-2 focus:ring-blue-500/40 transition"
            />

            {/* CONFIRM PASSWORD */}
            <input
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-3 rounded-xl
                         bg-white/10 backdrop-blur-xl
                         border border-white/20
                         text-white placeholder-white/50
                         outline-none focus:ring-2 focus:ring-blue-500/40 transition"
            />

            {/* HINT */}
            <p className="text-xs text-white/50">
              Use at least 6 characters for better security
            </p>

            {/* BUTTON */}
            <button
              className="w-full py-3 rounded-xl font-medium
                         bg-gradient-to-r from-indigo-600 to-blue-600
                         hover:opacity-90 transition
                         text-white"
            >
              Reset Password
            </button>

          </form>
        )}

      </div>
    </AuthLayout>
  );
}