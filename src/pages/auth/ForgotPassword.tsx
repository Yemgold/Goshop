


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../app/layouts/AuthLayout";
import { toast } from "sonner";
import { authService } from "../../services/auth.service";
import { useUIStore } from "../../store/ui.store";

export default function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const startLoading = useUIStore((s) => s.startLoading);
  const stopLoading = useUIStore((s) => s.stopLoading);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    startLoading();

    try {
      console.log("📩 FORGOT PASSWORD:", email);

      const res = await authService.forgotPassword({ email });
      const data = res.data;

      console.log("✅ FORGOT PASSWORD RESPONSE:", data);

      toast.success(
        data?.message || "Reset link sent successfully"
      );

      setSent(true);

    } catch (err: any) {
      console.log("❌ FORGOT PASSWORD ERROR:", err?.response?.data);

      toast.error(
        err?.response?.data?.message ||
        "Failed to send reset link"
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
            Forgot Password
          </h2>

          <p className="text-white/60 text-sm mt-1">
            Enter your email to receive a reset link
          </p>
        </div>

        {/* SUCCESS STATE */}
        {sent ? (
          <div className="text-center space-y-3">
            <div className="text-green-400 text-sm">
              Reset link sent successfully 🎉
            </div>

            <p className="text-white/60 text-sm">
              Check your email inbox and follow the instructions.
            </p>

            <button
              onClick={() => navigate("/login")}
              className="mt-4 text-white underline text-sm"
            >
              Back to login
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* EMAIL INPUT */}
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-xl
                         bg-white/10 backdrop-blur-xl
                         border border-white/20
                         text-white placeholder-white/50
                         outline-none focus:ring-2 focus:ring-blue-500/40 transition"
            />

            {/* BUTTON */}
            <button
              className="w-full py-3 rounded-xl font-medium
                         bg-gradient-to-r from-blue-600 to-indigo-600
                         hover:opacity-90 transition
                         text-white"
            >
              Send Reset Link
            </button>

          </form>
        )}

        {/* BACK TO LOGIN */}
        {!sent && (
          <p className="text-center text-sm text-white/60">
            Remember your password?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-white font-medium cursor-pointer hover:underline"
            >
              Back to login
            </span>
          </p>
        )}

      </div>
    </AuthLayout>
  );
}