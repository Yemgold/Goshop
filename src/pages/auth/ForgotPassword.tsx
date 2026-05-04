
import { useState } from "react";
import AuthLayout from "../../app/layouts/AuthLayout";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) return;

    setLoading(true);

    // mock API delay
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 800);
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
              disabled={loading}
              className="w-full py-3 rounded-xl font-medium
                         bg-gradient-to-r from-blue-600 to-indigo-600
                         hover:opacity-90 transition
                         text-white disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>

          </form>
        )}

        {/* BACK TO LOGIN */}
        <p className="text-center text-sm text-white/60">
          Remember your password?{" "}
          <a
            href="/login"
            className="text-white font-medium hover:underline"
          >
            Back to login
          </a>
        </p>

      </div>
    </AuthLayout>
  );
}