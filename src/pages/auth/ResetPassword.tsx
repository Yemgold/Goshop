

import { useState } from "react";
import AuthLayout from "../../app/layouts/AuthLayout";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 800);
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

            <a
              href="/login"
              className="inline-block mt-3 text-white font-medium hover:underline"
            >
              Go to Login →
            </a>
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

            {/* PASSWORD HINT */}
            <p className="text-xs text-white/50">
              Use at least 6 characters for better security
            </p>

            {/* ERROR */}
            {error && (
              <p className="text-red-400 text-sm">{error}</p>
            )}

            {/* BUTTON */}
            <button
              disabled={loading}
              className="w-full py-3 rounded-xl font-medium
                         bg-gradient-to-r from-indigo-600 to-blue-600
                         hover:opacity-90 transition
                         text-white disabled:opacity-50"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>

          </form>
        )}

      </div>
    </AuthLayout>
  );
}