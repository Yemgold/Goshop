// import { useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import AuthLayout from "../../app/layouts/AuthLayout";
// import apiClient from "../../api/core/api.client";
// import { toast } from "sonner"; 


// export default function VerifyEmail() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   // ✅ email from register page
//   const email = location.state?.email;

//   const [otp, setOtp] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [resending, setResending] = useState(false);

//   // 🚨 protect route
//   if (!email) {
//     toast.error("Session expired. Please register again.");
//     navigate("/register", { replace: true });
//   }

//   // ✅ VERIFY OTP
//   const handleVerify = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!otp) {
//       toast.error("Please enter verification code");
//       return;
//     }

//     setLoading(true);

//     try {
//       const res = await apiClient.get(`auth/email-verification/${otp}`);

//       const data = res.data;
//        console.log("data:", data)
//       toast.success(
//         data?.message 
//       );

//       navigate("/login", { replace: true });

//     } catch (err: any) {
//       toast.error(
//         err?.response?.data?.message || "Verification failed"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ RESEND OTP
//   const handleResend = async () => {
//     setResending(true);

//     try {
//       const res = await apiClient.post(
//         "auth/resend-verification",
//         { email }
//       );

//       toast.success(
//         res.data?.message || "Verification email sent"
//       );
//     } catch (err: any) {
//       toast.error(
//         err?.response?.data?.message || "Failed to resend email"
//       );
//     } finally {
//       setResending(false);
//     }
//   };

//   return (
//     <AuthLayout>
//       <div className="min-h-[70vh] flex items-center justify-center px-4">

//         <div className="w-full max-w-md bg-white/70 backdrop-blur-2xl border border-white/30 rounded-3xl p-6 shadow-xl">

//           {/* HEADER */}
//           <div className="text-center mb-6">
//             <h2 className="text-2xl font-bold">
//               Verify Your Email 📩
//             </h2>

//             <p className="text-sm text-gray-500 mt-1">
//               Enter the 6-digit code sent to your email
//             </p>

//             {email && (
//               <p className="text-xs text-gray-400 mt-2">
//                 {email}
//               </p>
//             )}
//           </div>

//           <form onSubmit={handleVerify} className="space-y-4">

//             {/* OTP ONLY */}
//             <input
//               type="text"
//               placeholder="Enter 6-digit code"
//               value={otp}
//               onChange={(e) => setOtp(e.target.value)}
//               maxLength={6}
//               className="w-full p-3 rounded-xl border border-gray-200 bg-white/70 text-center tracking-widest"
//             />

//             {/* VERIFY BUTTON */}
//             <button
//               disabled={loading}
//               className="w-full py-3 rounded-xl bg-black text-white font-medium
//                          hover:bg-gray-800 transition disabled:opacity-60"
//             >
//               {loading ? "Verifying..." : "Verify Email"}
//             </button>

//           </form>

//           {/* RESEND */}
//           <div className="text-center mt-4">
//             <button
//               onClick={handleResend}
//               disabled={resending}
//               className="text-blue-600 hover:underline text-sm"
//             >
//               {resending ? "Sending..." : "Resend code"}
//             </button>
//           </div>

//         </div>
//       </div>
//     </AuthLayout>
//   );
// }




// import { useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import AuthLayout from "../../app/layouts/AuthLayout";
// import { authService } from "../../services/auth.service";
// import { toast } from "sonner";

// import { useUIStore } from "../../store/ui.store"; // Add for Spinner

// export default function VerifyEmail() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const email = location.state?.email;

//   const [otp, setOtp] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [resending, setResending] = useState(false);

//   // 🚨 protect route
//   if (!email) {
//     toast.error("Session expired. Please register again.");
//     navigate("/register", { replace: true });
//   }

//   // ✅ VERIFY EMAIL (OTP = TOKEN)
//   const handleVerify = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!otp) {
//       toast.error("Please enter verification code");
//       return;
//     }

//     setLoading(true);

//     try {
//       console.log("🔐 VERIFY TOKEN (OTP):", otp);

//       const res = await authService.verifyEmail(otp);

//       const data = res.data;

//       console.log("✅ VERIFY RESPONSE:", data);

//       toast.success(
//         data?.message || "Email verified successfully"
//       );

//       navigate("/login", { replace: true });

//     } catch (err: any) {
//       console.log("❌ VERIFY ERROR:", err?.response?.data);

//       toast.error(
//         err?.response?.data?.message || "Verification failed"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ RESEND EMAIL (still via service layer)
//   const handleResend = async () => {
//     setResending(true);

//     try {
//       const res = await authService.resendVerification(email);

//       toast.success(
//         res.data?.message || "Verification email sent"
//       );

//     } catch (err: any) {
//       console.log("❌ RESEND ERROR:", err?.response?.data);

//       toast.error(
//         err?.response?.data?.message || "Failed to resend email"
//       );
//     } finally {
//       setResending(false);
//     }
//   };

//   return (
//     <AuthLayout>
//       <div className="min-h-[70vh] flex items-center justify-center px-4">

//         <div className="w-full max-w-md bg-white/70 backdrop-blur-2xl border border-white/30 rounded-3xl p-6 shadow-xl">

//           {/* HEADER */}
//           <div className="text-center mb-6">
//             <h2 className="text-2xl font-bold">
//               Verify Your Email 📩
//             </h2>

//             <p className="text-sm text-gray-500 mt-1">
//               Enter the 6-digit code sent to your email
//             </p>

//             {email && (
//               <p className="text-xs text-gray-400 mt-2">
//                 {email}
//               </p>
//             )}
//           </div>

//           <form onSubmit={handleVerify} className="space-y-4">

//             <input
//               type="text"
//               placeholder="Enter 6-digit code"
//               value={otp}
//               onChange={(e) => setOtp(e.target.value)}
//               maxLength={6}
//               className="w-full p-3 rounded-xl border border-gray-200 bg-white/70 text-center tracking-widest"
//             />

//             <button
//               disabled={loading}
//               className="w-full py-3 rounded-xl bg-black text-white font-medium
//                          hover:bg-gray-800 transition disabled:opacity-60"
//             >
//               {loading ? "Verifying..." : "Verify Email"}
//             </button>

//           </form>

//           {/* RESEND */}
//           <div className="text-center mt-4">
//             <button
//               onClick={handleResend}
//               disabled={resending}
//               className="text-blue-600 hover:underline text-sm"
//             >
//               {resending ? "Sending..." : "Resend code"}
//             </button>
//           </div>

//         </div>
//       </div>
//     </AuthLayout>
//   );
// }


import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AuthLayout from "../../app/layouts/AuthLayout";
import { authService } from "../../services/auth.service";
import { toast } from "sonner";
import { useUIStore } from "../../store/ui.store";

export default function VerifyEmail() {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;

  const [otp, setOtp] = useState("");

  const startLoading = useUIStore((s) => s.startLoading);
  const stopLoading = useUIStore((s) => s.stopLoading);

  // 🚨 protect route
  if (!email) {
    toast.error("Session expired. Please register again.");
    navigate("/register", { replace: true });
  }

  // ✅ VERIFY EMAIL
  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!otp) {
      toast.error("Please enter verification code");
      return;
    }

    startLoading();

    try {
      console.log("🔐 VERIFY TOKEN (OTP):", otp);

      const res = await authService.verifyEmail(otp);
      const data = res.data;

      console.log("✅ VERIFY RESPONSE:", data);

      toast.success(data?.message || "Email verified successfully");

      stopLoading();
      navigate("/login", { replace: true });

    } catch (err: any) {
      console.log("❌ VERIFY ERROR:", err?.response?.data);

      toast.error(
        err?.response?.data?.message || "Verification failed"
      );

    } finally {
      stopLoading();
    }
  };

  // ✅ RESEND EMAIL
  const handleResend = async () => {
    startLoading();

    try {
      const res = await authService.resendVerification(email);

      toast.success(
        res.data?.message || "Verification email sent"
      );

    } catch (err: any) {
      console.log("❌ RESEND ERROR:", err?.response?.data);

      toast.error(
        err?.response?.data?.message || "Failed to resend email"
      );

    } finally {
      stopLoading();
    }
  };

  return (
    <AuthLayout>
      <div className="min-h-[70vh] flex items-center justify-center px-4">

        <div className="w-full max-w-md bg-white/70 backdrop-blur-2xl border border-white/30 rounded-3xl p-6 shadow-xl">

          {/* HEADER */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold">
              Verify Your Email 📩
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Enter the 6-digit code sent to your email
            </p>

            {email && (
              <p className="text-xs text-gray-400 mt-2">
                {email}
              </p>
            )}
          </div>

          <form onSubmit={handleVerify} className="space-y-4">

            <input
              type="text"
              placeholder="Enter 6-digit code"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength={6}
              className="w-full p-3 rounded-xl border border-gray-200 bg-white/70 text-center tracking-widest"
            />

            <button
              className="w-full py-3 rounded-xl bg-black text-white font-medium
                         hover:bg-gray-800 transition"
            >
              Verify Email
            </button>

          </form>

          {/* RESEND */}
          <div className="text-center mt-4">
            <button
              onClick={handleResend}
              className="text-blue-600 hover:underline text-sm"
            >
              Resend code
            </button>
          </div>

        </div>
      </div>
    </AuthLayout>
  );
}