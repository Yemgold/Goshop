


// // hooks/useUpgradePartner.ts

// import { useEffect, useState } from "react";
// import { toast } from "sonner";
// import { partnersService } from "../services/partners.services";

// import type { PartnerRole } from "../types/roles";

// const ALL_ROLES: PartnerRole[] = ["vendor", "rider", "promoter"];

// export function useUpgradePartner(open: boolean, existingRoles: PartnerRole[] = []) {
//   const [step, setStep] = useState<1 | 2 | 3>(1);
//   const [selectedRole, setSelectedRole] = useState<PartnerRole | null>(null);
//   const [loading, setLoading] = useState(false);

//   const [businessName, setBusinessName] = useState("");

//   const [form, setForm] = useState({
//     storeName: "",
//     description: "",
//     vehicleType: "",
//     licenseNumber: "",
//     bankName: "",
//     accountNumber: "",
//     accountName: "",
//   });

//   const existing = new Set(existingRoles);
//   const availableRoles = ALL_ROLES.filter(r => !existing.has(r));

//   /* ================= FETCH BUSINESS ================= */

//   const fetchBusiness = async () => {
//     try {
//       const res = await partnersService.getPartnerStatus ();
//       setBusinessName(res?.businessName || "");
//     } catch {
//       setBusinessName("");
//     }
//   };

//   /* ================= RESET ================= */

//   const reset = () => {
//     setStep(1);
//     setSelectedRole(null);
//     setLoading(false);
//     setForm({
//       storeName: "",
//       description: "",
//       vehicleType: "",
//       licenseNumber: "",
//       bankName: "",
//       accountNumber: "",
//       accountName: "",
//     });
//   };

//   /* ================= OPEN EFFECT ================= */

//   useEffect(() => {
//     if (!open) return;

//     reset();
//     fetchBusiness();
//   }, [open]);

//   /* ================= STEP FLOW ================= */

//   const next = () => {
//     if (step === 1 && !selectedRole) {
//       toast.error("Select a role");
//       return;
//     }
//     setStep(s => (s + 1) as 1 | 2 | 3);
//   };

//   const back = () => setStep(s => (s - 1) as 1 | 2 | 3);

//   /* ================= SUBMIT ================= */

//   const submit = async () => {
//     if (!selectedRole) return;

//     const baseBusiness = {
//       businessName,
//       businessRoles: Array.from(new Set([...existing, selectedRole])),
//     };

//     try {
//       setLoading(true);

//       if (selectedRole === "vendor") {
//         await partnersService.becomeVendor({
//           role: "vendor",
//           business: baseBusiness,
//           storeName: form.storeName,
//           description: form.description,
//         });
//       }

//       if (selectedRole === "rider") {
//         await partnersService.becomeRider({
//           role: "rider",
//           business: baseBusiness,
//           ...form,
//         });
//       }

//       if (selectedRole === "promoter") {
//         await partnersService.becomePromoter({
//           role: "promoter",
//           business: baseBusiness,
//           ...form,
//         });
//       }

//       toast.success("Submitted successfully");
//     } catch (e: any) {
//       toast.error(e?.message || "Failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return {
//     step,
//     selectedRole,
//     setSelectedRole,

//     form,
//     setForm,

//     businessName,
//     setBusinessName,

//     availableRoles,

//     next,
//     back,
//     submit,
//     loading,
//   };
// }