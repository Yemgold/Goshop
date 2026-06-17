

// import { useEffect, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   Store,
//   Bike,
//   Megaphone,
//   X,
// } from "lucide-react";

// import { toast } from "sonner";

// import { partnersService } from "../../services/partners.services";
// import type { BecomePartnerPayload } from "../../types/partners.types";
// import { useQueryClient } from "@tanstack/react-query"; 

// import type {
//   UserRole,
//   PartnerRole,
// } from "../../types/roles";

// /* ================= ROLE TYPES ================= */

// const ALL_ROLES: PartnerRole[] = [
//   "vendor",
//   "rider",
//   "promoter",
// ];

// /* ================= PROPS ================= */

// type Props = {
//   open: boolean;
//   hasBusiness: boolean;
//   existingBusinessName?: string;
//   existingRoles?: UserRole[];
//   mode?: "FULL" | "ROLE_ONLY" | null;
//   onClose: () => void;
// };

// /* ================= UI DATA ================= */

// const roleIcons: Record<PartnerRole, React.ReactNode> = {
//   vendor: <Store size={24} />,
//   rider: <Bike size={24} />,
//   promoter: <Megaphone size={24} />,
// };

// const roleDescriptions: Record<PartnerRole, string> = {
//   vendor:
//     "Sell products and manage your online store.",

//   rider:
//     "Deliver products and earn income flexibly.",

//   promoter:
//     "Promote businesses and earn commissions.",
// };

// export default function UpgradeModal({
//   open,
//   hasBusiness,
//   existingBusinessName,
//   existingRoles = [],
//   onClose,
// }: Props) {

//   const queryClient = useQueryClient();
  
//   /* ================= STATE ================= */

//   const [step, setStep] =
//     useState<1 | 2 | 3>(1);

//   const [selectedRole, setSelectedRole] =
//     useState<PartnerRole | null>(null);

//   const [loading, setLoading] =
//     useState(false);

//   const [form, setForm] = useState({
//     businessName: "",
//     storeName: "",
//     description: "",
//     vehicleType: "",
//     licenseNumber: "",
//     bankName: "",
//     accountNumber: "",
//     accountName: "",
//   });

//   /* ================= EFFECT ================= */

//   useEffect(() => {
//     if (open) {
//       setStep(1);
//       setSelectedRole(null);
//       setLoading(false);
//     }
//   }, [open]);

//   /* ================= RESET ================= */

//   const reset = () => {
//     setStep(1);
//     setSelectedRole(null);
//     setLoading(false);

//     setForm({
//       businessName: "",
//       storeName: "",
//       description: "",
//       vehicleType: "",
//       licenseNumber: "",
//       bankName: "",
//       accountNumber: "",
//       accountName: "",
//     });
//   };

//   const handleClose = () => {
//     reset();
//     onClose();
//   };

//   if (!open) return null;

//   /* ================= FILTER ROLES ================= */

//   const existingPartnerRoles =
//     existingRoles.filter(
//       (role): role is PartnerRole =>
//         role === "vendor" ||
//         role === "rider" ||
//         role === "promoter"
//     );

//   const availableRoles = ALL_ROLES.filter(
//     (role) =>
//       !existingPartnerRoles.includes(role)
//   );

//   /* ================= CLASSES ================= */

//   const inputClass =
//     "w-full h-12 rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500";

//   const textareaClass =
//     "w-full min-h-[120px] rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 resize-none";

//   /* ================= STEPS ================= */

//   const nextStep = () => {
//     if (step === 1 && !selectedRole) {
//       toast.error("Please select a role");
//       return;
//     }

//     setStep((prev) => (prev + 1) as 1 | 2 | 3);
//   };

//   const prevStep = () => {
//     setStep((prev) => (prev - 1) as 1 | 2 | 3);
//   };


//   /* ================= SUBMIT ================= */

// const submitPartner = async () => {
//   if (!selectedRole) return;

//   const finalBusinessName =
//     existingBusinessName?.trim() ||
//     form.businessName.trim();

//   if (!finalBusinessName) {
//     toast.error("Business name required");
//     return;
//   }

//   setLoading(true);

//     try {
//       /* ================= SAFE PARTNER ROLES ================= */

//       const businessRoles: PartnerRole[] =
//         Array.from(
//           new Set([
//             ...existingPartnerRoles,
//             selectedRole,
//           ])
//         );

//       const baseBusiness = {
//         businessName: finalBusinessName,
//         businessRoles,
//       };

//       let payload: BecomePartnerPayload;

//       /* ================= VENDOR ================= */

//       if (selectedRole === "vendor") {
//         if (!form.storeName.trim()) {
//           toast.error("Store name required");
//           setLoading(false);
//           return;
//         }

//         payload = {
//           role: "vendor",
//           business: baseBusiness,
//           storeName: form.storeName,
//           description: form.description,
//         };

//         await partnersService.partnersBecomeVendor(
//           payload
//         );
//       }

//       /* ================= RIDER ================= */

//       else if (selectedRole === "rider") {
//         if (
//           !form.vehicleType.trim() ||
//           !form.licenseNumber.trim()
//         ) {
//           toast.error(
//             "Please fill rider information"
//           );

//           setLoading(false);
//           return;
//         }

//         payload = {
//           role: "rider",
//           business: baseBusiness,
//           vehicleType: form.vehicleType,
//           licenseNumber: form.licenseNumber,
//           bankName: form.bankName,
//           accountNumber: form.accountNumber,
//           accountName: form.accountName,
//         };

//         await partnersService.partnersBecomeRider(
//           payload
//         );
//       }

//       /* ================= PROMOTER ================= */

//       else {
//         payload = {
//           role: "promoter",
//           business: baseBusiness,
//           bankName: form.bankName,
//           accountNumber: form.accountNumber,
//           accountName: form.accountName,
//         };

//         await partnersService.partnersBecomePromoter(
//           payload
//         );
//       }

//       toast.success("Partner request submitted successfully");

// // refresh frontend state
// await queryClient.invalidateQueries({
//   queryKey: ["me"],
// });

// // optional safety sync
// window.location.reload();

//       handleClose();
//     } catch (err: any) {
//       toast.error(
//         err?.response?.data?.message ||
//           "Submission failed"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };





//   return (
//     <AnimatePresence>
//       {open && (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
//         >
//           <motion.div
//             initial={{
//               opacity: 0,
//               y: 40,
//               scale: 0.95,
//             }}
//             animate={{
//               opacity: 1,
//               y: 0,
//               scale: 1,
//             }}
//             exit={{
//               opacity: 0,
//               y: 20,
//             }}
//             transition={{ duration: 0.25 }}
//             className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden"
//           >
//             {/* ================= HEADER ================= */}

//             <div className="border-b px-8 py-6 flex justify-between items-start">
//               <div>
//                 <h2 className="text-2xl font-bold">
//                   Become a Partner
//                 </h2>

//                 <p className="text-sm text-gray-500">
//                   Unlock vendor, rider &
//                   promoter roles
//                 </p>
//               </div>

//               <button
//                 onClick={handleClose}
//                 className="p-2 rounded-lg hover:bg-gray-100"
//               >
//                 <X />
//               </button>
//             </div>

//             {/* ================= STEP BAR ================= */}

//             <div className="px-8 pt-6 flex gap-2">
//               {[1, 2, 3].map((item) => (
//                 <div
//                   key={item}
//                   className={`h-2 flex-1 rounded-full ${
//                     step >= item
//                       ? "bg-indigo-500"
//                       : "bg-gray-200"
//                   }`}
//                 />
//               ))}
//             </div>

//             {/* ================= CONTENT ================= */}

//             <div className="p-8 max-h-[70vh] overflow-y-auto space-y-6">

//               {/* ================= STEP 1 ================= */}

//               {step === 1 && (
//                 <div className="grid gap-4">

//                   {!hasBusiness && (
//                     <input
//                       className={inputClass}
//                       placeholder="Business Name"
//                       value={form.businessName}
//                       onChange={(e) =>
//                         setForm({
//                           ...form,
//                           businessName:
//                             e.target.value,
//                         })
//                       }
//                     />
//                   )}

//                   {availableRoles.map((role) => (
//                     <button
//                       key={role}
//                       onClick={() =>
//                         setSelectedRole(role)
//                       }
//                       className={`p-5 border rounded-2xl text-left transition ${
//                         selectedRole === role
//                           ? "border-indigo-500 bg-indigo-50"
//                           : "hover:bg-gray-50"
//                       }`}
//                     >
//                       <div className="flex gap-4 items-center">
//                         {roleIcons[role]}

//                         <div>
//                           <p className="font-semibold capitalize">
//                             {role}
//                           </p>

//                           <p className="text-sm text-gray-500">
//                             {
//                               roleDescriptions[
//                                 role
//                               ]
//                             }
//                           </p>
//                         </div>
//                       </div>
//                     </button>
//                   ))}

//                 </div>
//               )}

//               {/* ================= STEP 2 ================= */}

//               {step === 2 && selectedRole && (
//                 <div className="space-y-4">

//                   <h3 className="text-xl font-bold capitalize">
//                     {selectedRole} Setup
//                   </h3>

//                   {/* ===== VENDOR ===== */}

//                   {selectedRole === "vendor" && (
//                     <>
//                       <input
//                         className={inputClass}
//                         placeholder="Store Name"
//                         value={form.storeName}
//                         onChange={(e) =>
//                           setForm({
//                             ...form,
//                             storeName:
//                               e.target.value,
//                           })
//                         }
//                       />

//                       <textarea
//                         className={textareaClass}
//                         placeholder="Description"
//                         value={form.description}
//                         onChange={(e) =>
//                           setForm({
//                             ...form,
//                             description:
//                               e.target.value,
//                           })
//                         }
//                       />
//                     </>
//                   )}

//                   {/* ===== RIDER ===== */}

//                   {selectedRole === "rider" && (
//                     <>
//                       <input
//                         className={inputClass}
//                         placeholder="Vehicle Type"
//                         value={form.vehicleType}
//                         onChange={(e) =>
//                           setForm({
//                             ...form,
//                             vehicleType:
//                               e.target.value,
//                           })
//                         }
//                       />

//                       <input
//                         className={inputClass}
//                         placeholder="License Number"
//                         value={form.licenseNumber}
//                         onChange={(e) =>
//                           setForm({
//                             ...form,
//                             licenseNumber:
//                               e.target.value,
//                           })
//                         }
//                       />
//                     </>
//                   )}

//                   {/* ===== PROMOTER ===== */}

//                   {(selectedRole ===
//                     "promoter" ||
//                     selectedRole ===
//                       "rider") && (
//                     <>
//                       <input
//                         className={inputClass}
//                         placeholder="Bank Name"
//                         value={form.bankName}
//                         onChange={(e) =>
//                           setForm({
//                             ...form,
//                             bankName:
//                               e.target.value,
//                           })
//                         }
//                       />

//                       <input
//                         className={inputClass}
//                         placeholder="Account Number"
//                         value={form.accountNumber}
//                         onChange={(e) =>
//                           setForm({
//                             ...form,
//                             accountNumber:
//                               e.target.value,
//                           })
//                         }
//                       />

//                       <input
//                         className={inputClass}
//                         placeholder="Account Name"
//                         value={form.accountName}
//                         onChange={(e) =>
//                           setForm({
//                             ...form,
//                             accountName:
//                               e.target.value,
//                           })
//                         }
//                       />
//                     </>
//                   )}

//                 </div>
//               )}

//               {/* ================= STEP 3 ================= */}

//               {step === 3 && selectedRole && (
//                 <div className="p-6 bg-gray-50 rounded-2xl space-y-3">

//                   <h3 className="text-xl font-bold">
//                     Review Request
//                   </h3>

//                   <div className="space-y-2 text-sm">

//                     <p>
//                       <span className="font-semibold">
//                         Role:
//                       </span>{" "}
//                       {selectedRole}
//                     </p>

//                     <p>
//                       <span className="font-semibold">
//                         Business:
//                       </span>{" "}
//                       {hasBusiness
//                         ? existingBusinessName
//                         : form.businessName}
//                     </p>

//                   </div>

//                 </div>
//               )}
//             </div>

//             {/* ================= FOOTER ================= */}

//             <div className="border-t px-8 py-5 flex justify-between">

//               {step > 1 ? (
//                 <button
//                   onClick={prevStep}
//                   className="px-5 py-2 border rounded-xl hover:bg-gray-50"
//                 >
//                   Back
//                 </button>
//               ) : (
//                 <div />
//               )}

//               {step < 3 ? (
//                 <button
//                   onClick={nextStep}
//                   className="px-6 py-2 bg-black text-white rounded-xl hover:opacity-90"
//                 >
//                   Continue
//                 </button>
//               ) : (
//                 <button
//                   onClick={submitPartner}
//                   disabled={loading}
//                   className="px-6 py-2 bg-indigo-600 text-white rounded-xl hover:opacity-90 disabled:opacity-50"
//                 >
//                   {loading
//                     ? "Submitting..."
//                     : "Submit"}
//                 </button>
//               )}

//             </div>
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// }



















import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Store,
  Bike,
  Megaphone,
  Building2,
  X,
} from "lucide-react";

import { toast } from "sonner";
import { partnersService } from "../../services/partners.services";
import type { BecomePartnerPayload } from "../../types/partners.types";
import { useQueryClient } from "@tanstack/react-query";

import type { UserRole, PartnerRole } from "../../types/roles";

/* ================= ROLE TYPES ================= */

const ALL_ROLES: PartnerRole[] = [
  "vendor",
  "rider",
  "promoter",
  "pickup_center",
];

/* ================= PROPS ================= */

type Props = {
  open: boolean;
  hasBusiness: boolean;
  existingBusinessName?: string;
  existingRoles?: UserRole[];
  mode?: "FULL" | "ROLE_ONLY" | null;
  onClose: () => void;
};

/* ================= UI DATA ================= */

const roleIcons: Record<PartnerRole, React.ReactNode> = {
  vendor: <Store size={24} />,
  rider: <Bike size={24} />,
  promoter: <Megaphone size={24} />,
  pickup_center: <Building2 size={24} />,
};

const roleDescriptions: Record<PartnerRole, string> = {
  vendor: "Sell products and manage your online store.",
  rider: "Deliver products and earn income flexibly.",
  promoter: "Promote businesses and earn commissions.",
  pickup_center:
    "Operate a registered pickup location for customer order collection.",
};

export default function UpgradeModal({
  open,
  hasBusiness,
  existingBusinessName,
  existingRoles = [],
  onClose,
}: Props) {
  const queryClient = useQueryClient();

  /* ================= STATE ================= */

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedRole, setSelectedRole] = useState<PartnerRole | null>(null);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    businessName: "",
    storeName: "",
    description: "",
    vehicleType: "",
    licenseNumber: "",
    bankName: "",
    accountNumber: "",
    accountName: "",

    pickupCenterName: "",
    pickupAddress: "",
    pickupState: "",
    contactPhone: "",
  });

  /* ================= EFFECT ================= */

  useEffect(() => {
    if (open) {
      setStep(1);
      setSelectedRole(null);
      setLoading(false);
    }
  }, [open]);

  /* ================= RESET ================= */

  const reset = () => {
    setStep(1);
    setSelectedRole(null);
    setLoading(false);

    setForm({
      businessName: "",
      storeName: "",
      description: "",
      vehicleType: "",
      licenseNumber: "",
      bankName: "",
      accountNumber: "",
      accountName: "",
      pickupCenterName: "",
      pickupAddress: "",
      pickupState: "",
      contactPhone: "",
    });
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  if (!open) return null;

  /* ================= FILTER ROLES ================= */

  const existingPartnerRoles = existingRoles.filter(
    (role): role is PartnerRole =>
      role === "vendor" ||
      role === "rider" ||
      role === "promoter" ||
      role === "pickup_center"
  );

  const availableRoles = ALL_ROLES.filter(
    (role) => !existingPartnerRoles.includes(role)
  );

    /* ================= CLASSES ================= */

  const inputClass =
    "w-full h-12 rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500";

  const textareaClass =
    "w-full min-h-[120px] rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 resize-none";


  /* ================= STEP CONTROL ================= */

  const nextStep = () => {
    if (step === 1 && !selectedRole) {
      toast.error("Please select a role");
      return;
    }
    setStep((prev) => (prev + 1) as 1 | 2 | 3);
  };

  const prevStep = () => {
    setStep((prev) => (prev - 1) as 1 | 2 | 3);
  };

  /* ================= SUBMIT ================= */

  const submitPartner = async () => {
    if (!selectedRole) return;

    const finalBusinessName =
      existingBusinessName?.trim() ||
      form.businessName.trim();

    if (!finalBusinessName) {
      toast.error("Business name required");
      return;
    }

    setLoading(true);

    try {
      const businessRoles: PartnerRole[] = Array.from(
        new Set([...existingPartnerRoles, selectedRole])
      );

      const baseBusiness = {
        businessName: finalBusinessName,
        businessRoles,
      };

      let payload: BecomePartnerPayload;

      /* ================= VENDOR ================= */
      if (selectedRole === "vendor") {
        if (!form.storeName.trim()) {
          toast.error("Store name required");
          setLoading(false);
          return;
        }

        payload = {
          role: "vendor",
          business: baseBusiness,
          storeName: form.storeName,
          description: form.description,
        };

        await partnersService.partnersBecomeVendor(payload);
      }

      /* ================= RIDER ================= */
      else if (selectedRole === "rider") {
        if (!form.vehicleType || !form.licenseNumber) {
          toast.error("Please fill rider information");
          setLoading(false);
          return;
        }

        payload = {
          role: "rider",
          business: baseBusiness,
          vehicleType: form.vehicleType,
          licenseNumber: form.licenseNumber,
          bankName: form.bankName,
          accountNumber: form.accountNumber,
          accountName: form.accountName,
        };

        await partnersService.partnersBecomeRider(payload);
      }

      /* ================= PROMOTER ================= */
      else if (selectedRole === "promoter") {
        payload = {
          role: "promoter",
          business: baseBusiness,
          bankName: form.bankName,
          accountNumber: form.accountNumber,
          accountName: form.accountName,
        };

        await partnersService.partnersBecomePromoter(payload);
      }

      /* ================= PICKUP CENTER (FIXED) ================= */
      else if (selectedRole === "pickup_center") {
        if (!form.pickupCenterName || !form.pickupAddress) {
          toast.error("Pickup center details required");
          setLoading(false);
          return;
        }

        payload = {
          role: "pickup_center",
          business: baseBusiness,
          pickupAddress: form.pickupAddress,
          pickupState: form.pickupState,
          contactPhone: form.contactPhone,
         
        };

        await partnersService.partnersBecomePickupCenter(payload);
      }

      toast.success("Partner request submitted successfully");

      await queryClient.invalidateQueries({ queryKey: ["me"] });
      window.location.reload();

      handleClose();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Submission failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <motion.div
            initial={{
              opacity: 0,
              y: 40,
              scale: 0.95,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 20,
            }}
            transition={{ duration: 0.25 }}
            className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden"
          >
            {/* ================= HEADER ================= */}

            <div className="border-b px-8 py-6 flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold">
                  Become a Partner
                </h2>

                <p className="text-sm text-gray-500">
                  Unlock vendor, rider &
                  promoter roles
                </p>
              </div>

              <button
                onClick={handleClose}
                className="p-2 rounded-lg hover:bg-gray-100"
              >
                <X />
              </button>
            </div>

            {/* ================= STEP BAR ================= */}

            <div className="px-8 pt-6 flex gap-2">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className={`h-2 flex-1 rounded-full ${
                    step >= item
                      ? "bg-indigo-500"
                      : "bg-gray-200"
                  }`}
                />
              ))}
            </div>

            {/* ================= CONTENT ================= */}

            <div className="p-8 max-h-[70vh] overflow-y-auto space-y-6">

              {/* ================= STEP 1 ================= */}

              {step === 1 && (
                <div className="grid gap-4">

                  {!hasBusiness && (
                    <input
                      className={inputClass}
                      placeholder="Business Name"
                      value={form.businessName}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          businessName:
                            e.target.value,
                        })
                      }
                    />
                  )}

                  {availableRoles.map((role) => (
                    <button
                      key={role}
                      onClick={() =>
                        setSelectedRole(role)
                      }
                      className={`p-5 border rounded-2xl text-left transition ${
                        selectedRole === role
                          ? "border-indigo-500 bg-indigo-50"
                          : "hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex gap-4 items-center">
                        {roleIcons[role]}

                        <div>
                          <p className="font-semibold capitalize">
                            {role}
                          </p>

                          <p className="text-sm text-gray-500">
                            {
                              roleDescriptions[
                                role
                              ]
                            }
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}

                </div>
              )}

              {/* ================= STEP 2 ================= */}

              {step === 2 && selectedRole && (
                <div className="space-y-4">

                  <h3 className="text-xl font-bold capitalize">
                    {selectedRole} Setup
                  </h3>

                  {/* ===== VENDOR ===== */}

                  {selectedRole === "vendor" && (
                    <>
                      <input
                        className={inputClass}
                        placeholder="Store Name"
                        value={form.storeName}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            storeName:
                              e.target.value,
                          })
                        }
                      />

                      <textarea
                        className={textareaClass}
                        placeholder="Description"
                        value={form.description}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            description:
                              e.target.value,
                          })
                        }
                      />
                    </>
                  )}

                  {/* ===== RIDER ===== */}

                  {selectedRole === "rider" && (
                    <>
                      <input
                        className={inputClass}
                        placeholder="Vehicle Type"
                        value={form.vehicleType}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            vehicleType:
                              e.target.value,
                          })
                        }
                      />

                      <input
                        className={inputClass}
                        placeholder="License Number"
                        value={form.licenseNumber}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            licenseNumber:
                              e.target.value,
                          })
                        }
                      />
                    </>
                  )}

                  {/* ===== PROMOTER ===== */}

                  {(selectedRole ===
                    "promoter" ||
                    selectedRole ===
                      "rider") && (
                    <>
                      <input
                        className={inputClass}
                        placeholder="Bank Name"
                        value={form.bankName}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            bankName:
                              e.target.value,
                          })
                        }
                      />

                      <input
                        className={inputClass}
                        placeholder="Account Number"
                        value={form.accountNumber}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            accountNumber:
                              e.target.value,
                          })
                        }
                      />

                      <input
                        className={inputClass}
                        placeholder="Account Name"
                        value={form.accountName}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            accountName:
                              e.target.value,
                          })
                        }
                      />
                    </>
                  )}


                  {/* ===== PICKUP CENTER ===== */}
{selectedRole === "pickup_center" && (
  <div className="space-y-4">

    <input
      className={inputClass}
      placeholder="Pickup Center Name"
      value={form.pickupCenterName}
      onChange={(e) =>
        setForm({
          ...form,
          pickupCenterName: e.target.value,
        })
      }
    />

    <textarea
      className={textareaClass}
      placeholder="Pickup Address"
      value={form.pickupAddress}
      onChange={(e) =>
        setForm({
          ...form,
          pickupAddress: e.target.value,
        })
      }
    />

    <input
      className={inputClass}
      placeholder="State / City"
      value={form.pickupState}
      onChange={(e) =>
        setForm({
          ...form,
          pickupState: e.target.value,
        })
      }
    />

    <input
      className={inputClass}
      placeholder="Contact Phone"
      value={form.contactPhone}
      onChange={(e) =>
        setForm({
          ...form,
          contactPhone: e.target.value,
        })
      }
    />

  </div>
)}



                </div>
              )}

             {/* ================= STEP 3 ================= */}

{step === 3 && selectedRole && (
  <div className="p-6 bg-gray-50 rounded-2xl space-y-5">

    <h3 className="text-xl font-bold">
      Review Request
    </h3>

    <div className="space-y-3 text-sm">

      <p>
        <span className="font-semibold">
          Role:
        </span>{" "}
        {selectedRole.replace("_", " ")}
      </p>

      <p>
        <span className="font-semibold">
          Business:
        </span>{" "}
        {hasBusiness
          ? existingBusinessName
          : form.businessName}
      </p>

      {/* ================= VENDOR ================= */}

      {selectedRole === "vendor" && (
        <>
          <p>
            <span className="font-semibold">
              Store Name:
            </span>{" "}
            {form.storeName || "-"}
          </p>

          <p>
            <span className="font-semibold">
              Description:
            </span>{" "}
            {form.description || "-"}
          </p>
        </>
      )}

      {/* ================= RIDER ================= */}

      {selectedRole === "rider" && (
        <>
          <p>
            <span className="font-semibold">
              Vehicle Type:
            </span>{" "}
            {form.vehicleType || "-"}
          </p>

          <p>
            <span className="font-semibold">
              License Number:
            </span>{" "}
            {form.licenseNumber || "-"}
          </p>

          <p>
            <span className="font-semibold">
              Bank Name:
            </span>{" "}
            {form.bankName || "-"}
          </p>

          <p>
            <span className="font-semibold">
              Account Number:
            </span>{" "}
            {form.accountNumber || "-"}
          </p>

          <p>
            <span className="font-semibold">
              Account Name:
            </span>{" "}
            {form.accountName || "-"}
          </p>
        </>
      )}

      {/* ================= PROMOTER ================= */}

      {selectedRole === "promoter" && (
        <>
          <p>
            <span className="font-semibold">
              Bank Name:
            </span>{" "}
            {form.bankName || "-"}
          </p>

          <p>
            <span className="font-semibold">
              Account Number:
            </span>{" "}
            {form.accountNumber || "-"}
          </p>

          <p>
            <span className="font-semibold">
              Account Name:
            </span>{" "}
            {form.accountName || "-"}
          </p>
        </>
      )}

      {/* ================= PICKUP CENTER ================= */}

      {selectedRole === "pickup_center" && (
        <>
          <p>
            <span className="font-semibold">
              Pickup Address:
            </span>{" "}
            {form.pickupAddress || "-"}
          </p>

          <p>
            <span className="font-semibold">
              Pickup State:
            </span>{" "}
            {form.pickupState || "-"}
          </p>

          <p>
            <span className="font-semibold">
              Contact Phone:
            </span>{" "}
            {form.contactPhone || "-"}
          </p>

          <p>
            <span className="font-semibold">
              Bank Name:
            </span>{" "}
            {form.bankName || "-"}
          </p>

          <p>
            <span className="font-semibold">
              Account Number:
            </span>{" "}
            {form.accountNumber || "-"}
          </p>

          <p>
            <span className="font-semibold">
              Account Name:
            </span>{" "}
            {form.accountName || "-"}
          </p>
        </>
      )}

    </div>

  </div>
)}



            </div>

            {/* ================= FOOTER ================= */}

            <div className="border-t px-8 py-5 flex justify-between">

              {step > 1 ? (
                <button
                  onClick={prevStep}
                  className="px-5 py-2 border rounded-xl hover:bg-gray-50"
                >
                  Back
                </button>
              ) : (
                <div />
              )}

              {step < 3 ? (
                <button
                  onClick={nextStep}
                  className="px-6 py-2 bg-black text-white rounded-xl hover:opacity-90"
                >
                  Continue
                </button>
              ) : (
                <button
                  onClick={submitPartner}
                  disabled={loading}
                  className="px-6 py-2 bg-indigo-600 text-white rounded-xl hover:opacity-90 disabled:opacity-50"
                >
                  {loading
                    ? "Submitting..."
                    : "Submit"}
                </button>
              )}

            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

