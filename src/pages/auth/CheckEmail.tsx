import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AuthLayout from "../../app/layouts/AuthLayout";
import apiClient from "../../api/core/api.client";
import { toast } from "react-hot-toast";

export default function CheckEmail() {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;

  const [loading, setLoading] = useState(false);

  const handleResend = async () => {
    if (!email) {
      toast.error("Email not found. Please register again.");
      navigate("/register");
      return;
    }

    setLoading(true);

    try {
      console.log("📨 RESENDING VERIFICATION EMAIL:", email);

      const res = await apiClient.post(
        "auth/resend-verification",
        { email }
      );

      toast.success(
        res.data?.message || "Verification email sent"
      );
    } catch (err: any) {
      console.log("❌ RESEND ERROR:", err?.response?.data);

      toast.error(
        err?.response?.data?.message ||
          "Failed to resend verification email"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="min-h-[70vh] flex items-center justify-center px-4">

        <div className="w-full max-w-md bg-white/70 backdrop-blur-2xl border border-white/30 rounded-3xl p-6 shadow-xl text-center">

          {/* ICON */}
          <div className="text-5xl mb-4">📩</div>

          {/* TITLE */}
          <h2 className="text-2xl font-bold mb-2">
            Check Your Email
          </h2>

          {/* MESSAGE */}
          <p className="text-gray-600 text-sm mb-6">
            We sent a verification link to your email.
            <br />
            Please check your inbox or spam folder to continue.
          </p>

          {/* EMAIL DISPLAY (optional but helpful) */}
          {email && (
            <p className="text-xs text-gray-500 mb-6">
              {email}
            </p>
          )}

          {/* RESEND BUTTON */}
          <button
            onClick={handleResend}
            disabled={loading}
            className="w-full py-3 rounded-xl bg-black text-white
                       hover:bg-gray-800 transition disabled:opacity-60"
          >
            {loading ? "Sending..." : "Resend Email"}
          </button>

          {/* BACK TO LOGIN */}
          <p
            onClick={() => navigate("/login")}
            className="text-sm text-blue-600 mt-5 cursor-pointer hover:underline"
          >
            Back to Login
          </p>

        </div>
      </div>
    </AuthLayout>
  );
}