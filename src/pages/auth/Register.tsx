


// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import AuthLayout from "../../app/layouts/AuthLayout";
// import { toast } from "sonner";
// import { authService } from "../../services/auth.service";
// import { useUIStore } from "../../store/ui.store"; 

// export default function Register() {
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     phoneNumber: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const startLoading = useUIStore.getState().startLoading;
//   const stopLoading = useUIStore.getState().stopLoading;

  

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setForm((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const {
//       firstName,
//       lastName,
//       email,
//       phoneNumber,
//       password,
//       confirmPassword,
//     } = form;

//     // validation
//     if (
//       !firstName ||
//       !lastName ||
//       !email ||
//       !phoneNumber ||
//       !password ||
//       !confirmPassword
//     ) {
//       toast.error("Please fill in all fields");
//       return;
//     }

//     if (password !== confirmPassword) {
//       toast.error("Passwords do not match");
//       return;
//     }

//     startLoading();


//     try {
//   console.log("📩 REGISTER FORM DATA:", form);

//   const res = await authService.register(form);
//   const response = res.data;

//   console.log("✅ REGISTER RESPONSE:", response);

//   toast.success(
//     response?.message || "Registration successful. Check your email."
//   );

//   // ✅ IMPORTANT: stop loading BEFORE navigation
//   stopLoading();

//   navigate("/verify-email", {
//     state: { email },
//   });

// } catch (err: any) {
//   console.log("❌ REGISTER ERROR:", err?.response?.data);

//   toast.error(
//     err?.response?.data?.message || "Registration failed"
//   );

// } finally {
//   stopLoading();
//   console.log("⏳ Loading finished");
// }
    


//   };

//   return (
//     <AuthLayout>
//       <div className="space-y-6">

//         <div className="text-center">
//           <h2 className="text-2xl font-bold text-white">
//             Create Account 🚀
//           </h2>
//           <p className="text-white/60 text-sm mt-1">
//             Join the marketplace in seconds
//           </p>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-4">

//           <input
//             name="firstName"
//             placeholder="First Name"
//             value={form.firstName}
//             onChange={handleChange}
//             className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white"
//           />

//           <input
//             name="lastName"
//             placeholder="Last Name"
//             value={form.lastName}
//             onChange={handleChange}
//             className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white"
//           />

//           <input
//             name="email"
//             type="email"
//             placeholder="Email Address"
//             value={form.email}
//             onChange={handleChange}
//             className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white"
//           />

//           <input
//             name="phoneNumber"
//             placeholder="Phone Number"
//             value={form.phoneNumber}
//             onChange={handleChange}
//             className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white"
//           />

//           <input
//             name="password"
//             type="password"
//             placeholder="Password"
//             value={form.password}
//             onChange={handleChange}
//             className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white"
//           />

//           <input
//             name="confirmPassword"
//             type="password"
//             placeholder="Confirm Password"
//             value={form.confirmPassword}
//             onChange={handleChange}
//             className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white"
//           />

//           <button
//             type="submit"
//             className="w-full py-3 rounded-xl font-medium
//                        bg-gradient-to-r from-blue-600 to-indigo-600
//                        text-white disabled:opacity-60"
//           >
//             Create Account
//           </button>

//                     {/* LINKS */}
//           <div className="text-center text-sm mt-3 space-y-1">
//             <p className="text-gray-500">
//               You have an account?{" "}
//               <span
//                 onClick={() => navigate("/login")}
//                 className="text-black font-medium cursor-pointer hover:underline"
//               >
//                 Login
//               </span>
//             </p>
//           </div>


//         </form>
//       </div>
//     </AuthLayout>
//   );
// }














import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../app/layouts/AuthLayout";
import { toast } from "sonner";
import { authService } from "../../services/auth.service";
import { useUIStore } from "../../store/ui.store";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const startLoading = useUIStore.getState().startLoading;
  const stopLoading = useUIStore.getState().stopLoading;

  const [showPasswordRequirements, setShowPasswordRequirements] =
    useState(false);

  /* ===========================
     PASSWORD CHECKS
  =========================== */

  const password = form.password;

  const checks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /\d/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
      confirmPassword,
    } = form;

    // ===========================
    // EMPTY FIELDS
    // ===========================

    if (
      !firstName ||
      !lastName ||
      !email ||
      !phoneNumber ||
      !password ||
      !confirmPassword
    ) {
      toast.error("Please fill in all fields.");
      return;
    }

    // ===========================
    // PASSWORD MATCH
    // ===========================

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    // ===========================
    // PASSWORD VALIDATION
    // ===========================

    if (!checks.length) {
      toast.error("Password must be at least 8 characters.");
      return;
    }

    if (!checks.uppercase) {
      toast.error("Password must contain an uppercase letter.");
      return;
    }

    if (!checks.lowercase) {
      toast.error("Password must contain a lowercase letter.");
      return;
    }

    if (!checks.number) {
      toast.error("Password must contain at least one number.");
      return;
    }

    if (!checks.special) {
      toast.error(
        "Password must contain at least one special character."
      );
      return;
    }

    startLoading();

    try {
      console.log("REGISTER DATA:", form);

      const res = await authService.register(form);

      const response = res.data;

      console.log("REGISTER RESPONSE:", response);

      toast.success(
        response?.message ||
          "Registration successful. Check your email."
      );

      stopLoading();

      navigate("/verify-email", {
        state: {
          email,
        },
      });
    } catch (err: any) {
      console.log(err?.response?.data);

      toast.error(
        err?.response?.data?.message ||
          "Registration failed."
      );
    } finally {
      stopLoading();
    }
  };

  return (
  <AuthLayout>
    <div className="space-y-6">

      {/* ================= HEADER ================= */}

      <div className="text-center">
        <h2 className="text-2xl font-bold text-white">
          Create Account 🚀
        </h2>

        <p className="text-white/60 text-sm mt-1">
          Join the marketplace in seconds
        </p>
      </div>

      {/* ================= FORM ================= */}

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >

        {/* First Name */}

        <input
          name="firstName"
          placeholder="First Name"
          value={form.firstName}
          onChange={handleChange}
          className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/50 outline-none focus:border-blue-400"
        />

        {/* Last Name */}

        <input
          name="lastName"
          placeholder="Last Name"
          value={form.lastName}
          onChange={handleChange}
          className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/50 outline-none focus:border-blue-400"
        />

        {/* Email */}

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/50 outline-none focus:border-blue-400"
        />

        {/* Phone */}

        <input
          name="phoneNumber"
          placeholder="Phone Number"
          value={form.phoneNumber}
          onChange={handleChange}
          className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/50 outline-none focus:border-blue-400"
        />

        {/* PASSWORD */}

        <div>

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            onFocus={() =>
              setShowPasswordRequirements(true)
            }
            className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/50 outline-none focus:border-blue-400"
          />

          {showPasswordRequirements && (

            <div className="mt-3 rounded-xl border border-white/20 bg-white/10 backdrop-blur-md p-4">

              <h4 className="text-white font-semibold mb-3">
                Password Requirements
              </h4>

              <div className="space-y-2 text-sm">

                <div
                  className={`flex items-center gap-2 ${
                    checks.length
                      ? "text-green-400"
                      : "text-gray-300"
                  }`}
                >
                  <span>
                    {checks.length ? "✅" : "⭕"}
                  </span>

                  <span>
                    At least 8 characters
                  </span>
                </div>

                <div
                  className={`flex items-center gap-2 ${
                    checks.uppercase
                      ? "text-green-400"
                      : "text-gray-300"
                  }`}
                >
                  <span>
                    {checks.uppercase ? "✅" : "⭕"}
                  </span>

                  <span>
                    One uppercase letter
                  </span>
                </div>

                <div
                  className={`flex items-center gap-2 ${
                    checks.lowercase
                      ? "text-green-400"
                      : "text-gray-300"
                  }`}
                >
                  <span>
                    {checks.lowercase ? "✅" : "⭕"}
                  </span>

                  <span>
                    One lowercase letter
                  </span>
                </div>

                <div
                  className={`flex items-center gap-2 ${
                    checks.number
                      ? "text-green-400"
                      : "text-gray-300"
                  }`}
                >
                  <span>
                    {checks.number ? "✅" : "⭕"}
                  </span>

                  <span>
                    One number
                  </span>
                </div>

                <div
                  className={`flex items-center gap-2 ${
                    checks.special
                      ? "text-green-400"
                      : "text-gray-300"
                  }`}
                >
                  <span>
                    {checks.special ? "✅" : "⭕"}
                  </span>

                  <span>
                    One special character
                  </span>
                </div>

              </div>

            </div>

          )}

        </div>

        {/* CONFIRM PASSWORD */}

        <input
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={handleChange}
          onFocus={() =>
            setShowPasswordRequirements(false)
          }
          className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/50 outline-none focus:border-blue-400"
        />

        {/* BUTTON */}

        <button
          type="submit"
          className="w-full py-3 rounded-xl font-medium bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 text-white"
        >
          Create Account
        </button>

        {/* LOGIN */}

        <div className="text-center pt-3">

          <p className="text-gray-400 text-sm">

            Already have an account?

            <span
              onClick={() => navigate("/login")}
              className="ml-2 text-blue-400 cursor-pointer hover:underline"
            >
              Login
            </span>

          </p>

        </div>

      </form>

    </div>
  </AuthLayout>
);
}