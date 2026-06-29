


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

    // validation
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phoneNumber ||
      !password ||
      !confirmPassword
    ) {
      toast.error("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    startLoading();


    try {
  console.log("📩 REGISTER FORM DATA:", form);

  const res = await authService.register(form);
  const response = res.data;

  console.log("✅ REGISTER RESPONSE:", response);

  toast.success(
    response?.message || "Registration successful. Check your email."
  );

  // ✅ IMPORTANT: stop loading BEFORE navigation
  stopLoading();

  navigate("/verify-email", {
    state: { email },
  });

} catch (err: any) {
  console.log("❌ REGISTER ERROR:", err?.response?.data);

  toast.error(
    err?.response?.data?.message || "Registration failed"
  );

} finally {
  stopLoading();
  console.log("⏳ Loading finished");
}
    


  };

  return (
    <AuthLayout>
      <div className="space-y-6">

        <div className="text-center">
          <h2 className="text-2xl font-bold text-white">
            Create Account 🚀
          </h2>
          <p className="text-white/60 text-sm mt-1">
            Join the marketplace in seconds
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            name="firstName"
            placeholder="First Name"
            value={form.firstName}
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white"
          />

          <input
            name="lastName"
            placeholder="Last Name"
            value={form.lastName}
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white"
          />

          <input
            name="email"
            type="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white"
          />

          <input
            name="phoneNumber"
            placeholder="Phone Number"
            value={form.phoneNumber}
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white"
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white"
          />

          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white"
          />

          <button
            type="submit"
            className="w-full py-3 rounded-xl font-medium
                       bg-gradient-to-r from-blue-600 to-indigo-600
                       text-white disabled:opacity-60"
          >
            Create Account
          </button>

                    {/* LINKS */}
          <div className="text-center text-sm mt-3 space-y-1">
            <p className="text-gray-500">
              You have an account?{" "}
              <span
                onClick={() => navigate("/login")}
                className="text-black font-medium cursor-pointer hover:underline"
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





// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import AuthLayout from "../../app/layouts/AuthLayout";
// import { toast } from "sonner";
// import { authService } from "../../services/auth.service"; 


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

//   const [loading, setLoading] = useState(false);



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

//     setLoading(true);

//     try {
//       console.log("📩 REGISTER FORM DATA:", form);

//       // ✅ SERVICE LAYER CALL
//       const res = await authService.register(form);

//       const response = res.data;

//       console.log("✅ REGISTER RESPONSE:", response);

//    toast.success(
//   response?.message || "Registration successful. Check your email."
// );

// // 👉 go to check-email page first
// navigate("/check-email", {
//   state: { email },
// });

// // 👉 after few seconds, go to verify page
// setTimeout(() => {
//   navigate("/verify-email", {
//     state: { email },
//   });
// }, 3000); // 3 seconds

//     } catch (err: any) {
//       console.log("❌ REGISTER ERROR:", err?.response?.data);

//       toast.error(
//         err?.response?.data?.message || "Registration failed"
//       );
//     } finally {
//       setLoading(false);
//       console.log("⏳ Loading finished");
//     }
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
//             disabled={loading}
//             className="w-full py-3 rounded-xl font-medium
//                        bg-gradient-to-r from-blue-600 to-indigo-600
//                        text-white disabled:opacity-60"
//           >
//             {loading ? "Creating account..." : "Create Account"}
//           </button>

//         </form>
//       </div>
//     </AuthLayout>
//   );
// }





// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import AuthLayout from "../../app/layouts/AuthLayout";
// import { toast } from "sonner";
// import { authService } from "../../services/auth.service";

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

//   const [loading, setLoading] = useState(false);

//   // ================= SMART INPUT CONTROL =================
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;

//     let newValue = value;

//     // 🔤 ONLY LETTERS (allow space for names like "Mary Ann")
//     if (name === "firstName" || name === "lastName") {
//       newValue = value.replace(/[^a-zA-Z\s]/g, "");
//     }

//     // 📧 EMAIL (allow valid characters only, but not too strict)
//     if (name === "email") {
//       newValue = value
//         .replace(/\s/g, "") // no spaces
//         .replace(/[^a-zA-Z0-9@._+-]/g, ""); // allow valid email chars
//     }

//     // 📞 ONLY NUMBERS
//     if (name === "phoneNumber") {
//       newValue = value.replace(/[^0-9]/g, "");
//     }

//     // 🔐 PASSWORD (prevent leading spaces only)
//     if (name === "password" || name === "confirmPassword") {
//       newValue = value.replace(/^\s+/, "");
//     }

//     setForm((prev) => ({
//       ...prev,
//       [name]: newValue,
//     }));
//   };

//   // ================= VALIDATION HELPERS =================
//   const isEmail = (email: string) =>
//     /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

//   const isPhone = (phone: string) =>
//     /^[0-9]{10,15}$/.test(phone);

//   const strongPassword = (password: string) =>
//     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/.test(password);

//   // ================= SUBMIT =================
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

//     // ================= VALIDATION =================
//     if (
//       !firstName ||
//       !lastName ||
//       !email ||
//       !phoneNumber ||
//       !password ||
//       !confirmPassword
//     ) {
//       return toast.error("Please fill in all fields");
//     }

//     if (!isEmail(email)) {
//       return toast.error("Invalid email address");
//     }

//     if (!isPhone(phoneNumber)) {
//       return toast.error("Invalid phone number");
//     }

//     if (!strongPassword(password)) {
//       return toast.error(
//         "Password must include uppercase, lowercase, and number"
//       );
//     }

//     if (password !== confirmPassword) {
//       return toast.error("Passwords do not match");
//     }

//     // ================= API =================
//     setLoading(true);

//     try {
//       console.log("📩 REGISTER FORM DATA:", form);

//       const res = await authService.register(form);
//       const response = res.data;

//       console.log("✅ REGISTER RESPONSE:", response);

//       toast.success(
//         response?.message ||
//           "Registration successful. Check your email."
//       );

//       navigate("/verify-email", {
//         state: { email },
//       });

//     } catch (err: any) {
//       console.log("❌ REGISTER ERROR:", err?.response?.data);

//       toast.error(
//         err?.response?.data?.message || "Registration failed"
//       );
//     } finally {
//       setLoading(false);
//       console.log("⏳ Loading finished");
//     }
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
//             inputMode="email"
//             autoComplete="email"
//             className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white"
//           />

//           <input
//             name="phoneNumber"
//             placeholder="Phone Number"
//             value={form.phoneNumber}
//             onChange={handleChange}
//             inputMode="numeric"
//             maxLength={15}
//             className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white"
//           />

//           <input
//             name="password"
//             type="password"
//             placeholder="Password"
//             value={form.password}
//             onChange={handleChange}
//             autoComplete="new-password"
//             className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white"
//           />

//           <input
//             name="confirmPassword"
//             type="password"
//             placeholder="Confirm Password"
//             value={form.confirmPassword}
//             onChange={handleChange}
//             autoComplete="new-password"
//             className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white"
//           />

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full py-3 rounded-xl font-medium
//                        bg-gradient-to-r from-blue-600 to-indigo-600
//                        text-white disabled:opacity-60"
//           >
//             {loading ? "Creating account..." : "Create Account"}
//           </button>

//           {/* LINKS */}
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