

import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import { Button } from "../ui/Button";
import { useAuthStore } from "../../store/auth.store";

interface Props {
open: boolean;
onClose: () => void;
businessId: string;
onCreate: (payload: any) => Promise<void>;
}

const STATES = [

"Ekiti",
"Lagos",
"Ogun",
"Ondo",
"Osun",
"Oyo",

];

const WEIGHT_RANGES = [
{ label: "0 - 5 kg", min: 0, max: 5 },
{ label: "6 - 10 kg", min: 6, max: 10 },
{ label: "11 - 20 kg", min: 11, max: 20 },
{ label: "21 - 50 kg", min: 21, max: 50 },
{ label: "51 - 100 kg", min: 51, max: 100 },
{ label: "100+ kg", min: 101, max: 999999 },
];

export default function CreateRateModal({
open,
onClose,
businessId,
onCreate,
}: Props) {
const [loading, setLoading] = useState(false);

/* ================= AUTH USER ================= */

const user = useAuthStore((state) => state.user);

const originState =
  typeof user?.businessAddress?.state === "string"
    ? user.businessAddress.state
    : null;

/* ================= DEBUG ================= */

useEffect(() => {
console.log("AUTH USER:", user);
console.log("STORE USER", user);
console.log(
"BUSINESS ADDRESS:",
user?.businessAddress
);
console.log(
"ORIGIN STATE:",
user?.businessAddress?.state
);
}, [user]);

/* ================= FORM ================= */

const [
destinationState,
setDestinationState,
] = useState("");

const [weightPrices, setWeightPrices] =
useState(
WEIGHT_RANGES.map((range) => ({
...range,
price: "",
}))
);

/* ================= RESET ================= */

useEffect(() => {
if (open) {
setDestinationState("");


  setWeightPrices(
    WEIGHT_RANGES.map((range) => ({
      ...range,
      price: "",
    }))
  );
}


}, [open]);

if (!open) return null;

/* ================= SUBMIT ================= */

const handleSubmit = async () => {
  console.log("SUBMIT CLICKED");

  console.log("ORIGIN STATE DEBUG:", {
  user,
  originState,
});

  if (!originState) {
  toast.error("Origin state not found. Please update your profile.");
  return;
}

  if (!onCreate) {
    toast.error("Create handler missing");
    return;
  }

  if (!destinationState) {
    toast.error("Please select destination state.");
    return;
  }

  const hasPrice = weightPrices.some((item) => item.price);

  if (!hasPrice) {
    toast.error("Please enter at least one delivery price.");
    return;
  }

  try {
    setLoading(true);

   const payload = {
  businessId,
  originState,
  destinationState,

  weightRanges: weightPrices
    .filter((item) => item.price)
    .map((item) => ({
      min: item.min,
      max: item.max,
      price: Number(item.price),
    })),
};

    console.log("PAYLOAD:", payload);

    await onCreate(payload);

    toast.success("Shipping rate created successfully.");
    onClose();
  } 

  
  catch (error: any) {
  if (error?.response?.status === 409) {
    toast.error(
      "Shipping rate already exists. Please edit instead."
    );
    return;
  }

  toast.error(
    error?.response?.data?.message ||
      "Failed to create shipping rate."
  );
} 
  
  
   finally {
    setLoading(false);
  }


};

return ( <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4"> <div className="bg-white w-full max-w-2xl rounded-2xl p-6 max-h-[90vh] overflow-y-auto"> <h2 className="text-xl font-semibold mb-6">
Create Delivery Rate </h2>

    <div className="space-y-5">
   

      {/* ================= DESTINATION ================= */}

      <div>
        <label className="block text-sm text-gray-500 mb-1">
          Destination State
        </label>

        <select
          value={destinationState}
          onChange={(e) =>
            setDestinationState(
              e.target.value
            )
          }
          className="w-full border rounded-lg h-11 px-3"
        >
          <option value="">
            Select Destination State
          </option>

          {STATES.map((state) => (
            <option
              key={state}
              value={state}
            >
              {state}
            </option>
          ))}
        </select>
      </div>

      {/* ================= WEIGHT PRICING ================= */}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Delivery Prices By Weight
        </label>

        <div className="space-y-3">
          {weightPrices.map(
            (range, index) => (
              <div
                key={range.label}
                className="grid grid-cols-2 gap-3"
              >
                <input
                  value={range.label}
                  disabled
                  className="w-full border rounded-lg h-11 px-3 bg-gray-100"
                />

                <input
                  type="number"
                  min="0"
                  placeholder="Enter Delivery Price"
                  value={range.price}
                  onChange={(e) => {
                    const updated = [
                      ...weightPrices,
                    ];

                    updated[index].price =
                      e.target.value;

                    setWeightPrices(
                      updated
                    );
                  }}
                  className="w-full border rounded-lg h-11 px-3"
                />
              </div>
            )
          )}
        </div>

        <p className="text-xs text-gray-500 mt-2">
          Fill only the weight
          ranges you want to
          support.
        </p>
      </div>
    </div>

    {/* ================= ACTIONS ================= */}

    <div className="flex justify-end gap-3 mt-8">
      <Button
        onClick={onClose}
        className="!bg-gray-100 !text-gray-700"
      >
        Cancel
      </Button>

      <Button
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading
          ? "Creating..."
          : "Create Rate"}
      </Button>
    </div>
  </div>
</div>


);
}






// import { useState, useEffect } from "react";
// import { toast } from "react-toastify";

// import { Button } from "../ui/Button";
// import { useAuthStore } from "../../store/auth.store";

// interface Props {
//   open: boolean;
//   onClose: () => void;
//   businessId: string;
//   onCreate: (payload: any) => Promise<void>;
// }

// const STATES = [
//   "Abia",
//   "Adamawa",
//   "Akwa Ibom",
//   "Anambra",
//   "Bauchi",
//   "Bayelsa",
//   "Benue",
//   "Borno",
//   "Cross River",
//   "Delta",
//   "Ebonyi",
//   "Edo",
//   "Ekiti",
//   "Enugu",
//   "FCT",
//   "Gombe",
//   "Imo",
//   "Jigawa",
//   "Kaduna",
//   "Kano",
//   "Katsina",
//   "Kebbi",
//   "Kogi",
//   "Kwara",
//   "Lagos",
//   "Nasarawa",
//   "Niger",
//   "Ogun",
//   "Ondo",
//   "Osun",
//   "Oyo",
//   "Plateau",
//   "Rivers",
//   "Sokoto",
//   "Taraba",
//   "Yobe",
//   "Zamfara",
// ];

// export default function CreateRateModal({
//   open,
//   onClose,
//   businessId,
//   onCreate,
// }: Props) {
//   const [loading, setLoading] = useState(false);

//   /* ================= AUTH USER ================= */

//   const user = useAuthStore(
//     (state) => state.user
//   );

//   const originState =
//     user?.businessAddress?.state || "";

   

//   /* ================= DEBUG ================= */

//   useEffect(() => {
//     console.log("AUTH USER:", user);

//     console.log("STORE USER", user);

//     console.log(
//       "BUSINESS ADDRESS:",
//       user?.businessAddress
//     );

//     console.log(
//       "ORIGIN STATE:",
//       user?.businessAddress?.state
//     );
//   }, [user]);

//   /* ================= FORM ================= */

//   const [
//     destinationState,
//     setDestinationState,
//   ] = useState("");

//   const [minWeight, setMinWeight] =
//     useState("");

//   const [maxWeight, setMaxWeight] =
//     useState("");

//   const [price, setPrice] =
//     useState("");

//   /* ================= RESET ================= */

//   useEffect(() => {
//     if (open) {
//       setDestinationState("");
//       setMinWeight("");
//       setMaxWeight("");
//       setPrice("");
//     }
//   }, [open]);

//   if (!open) return null;

//   /* ================= SUBMIT ================= */

//   const handleSubmit = async () => {
//     if (!originState) {
//       toast.error(
//         "Business origin state not found. Please login again."
//       );
//       return;
//     }

//     if (!destinationState) {
//       toast.error(
//         "Please select destination state."
//       );
//       return;
//     }

//     if (!price) {
//       toast.error(
//         "Please enter delivery price."
//       );
//       return;
//     }

//     try {
//       setLoading(true);

//       const payload = {
//         businessId,
//         originState,

//         priceBreakdown: [
//           {
//             destinationState,

//             weightRanges: [
//               {
//                 min:
//                   Number(minWeight) || 0,

//                 max:
//                   Number(maxWeight) || 0,

//                 price: Number(price),
//               },
//             ],
//           },
//         ],
//       };

//       console.log(
//         "CREATE SHIPPING RATE PAYLOAD:",
//         payload
//       );

//       await onCreate(payload);

//       toast.success(
//         "Shipping rate created successfully."
//       );

//       onClose();
//     } catch (error: any) {
//       console.error(error);

//       toast.error(
//         error?.response?.data?.message ||
//           "Failed to create shipping rate."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
//       <div className="bg-white w-full max-w-lg rounded-2xl p-6">
//         <h2 className="text-xl font-semibold mb-6">
//           Create Delivery Rate
//         </h2>

//         <div className="space-y-4">
//           {/* ================= ORIGIN ================= */}

//           <div>
//             <label className="block text-sm text-gray-500 mb-1">
//               Origin State
//             </label>

//             <input
//               value={originState}
//               disabled
//               placeholder="No state found"
//               className="w-full border rounded-lg h-11 px-3 bg-gray-100 text-gray-700"
//             />
//           </div>

//           {/* ================= DESTINATION ================= */}

//           <div>
//             <label className="block text-sm text-gray-500 mb-1">
//               Destination State
//             </label>

//             <select
//               value={destinationState}
//               onChange={(e) =>
//                 setDestinationState(
//                   e.target.value
//                 )
//               }
//               className="w-full border rounded-lg h-11 px-3"
//             >
//               <option value="">
//                 Select Destination State
//               </option>

//               {STATES.map((state) => (
//                 <option
//                   key={state}
//                   value={state}
//                 >
//                   {state}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* ================= WEIGHT RANGE ================= */}

//           <div className="grid grid-cols-2 gap-3">
//             <div>
//               <label className="block text-sm text-gray-500 mb-1">
//                 Min Weight (kg)
//               </label>

//               <input
//                 type="number"
//                 min="0"
//                 value={minWeight}
//                 onChange={(e) =>
//                   setMinWeight(
//                     e.target.value
//                   )
//                 }
//                 className="w-full border rounded-lg h-11 px-3"
//                 placeholder="0"
//               />
//             </div>

//             <div>
//               <label className="block text-sm text-gray-500 mb-1">
//                 Max Weight (kg)
//               </label>

//               <input
//                 type="number"
//                 min="0"
//                 value={maxWeight}
//                 onChange={(e) =>
//                   setMaxWeight(
//                     e.target.value
//                   )
//                 }
//                 className="w-full border rounded-lg h-11 px-3"
//                 placeholder="5"
//               />
//             </div>
//           </div>

//           {/* ================= PRICE ================= */}

//           <div>
//             <label className="block text-sm text-gray-500 mb-1">
//               Delivery Price (₦)
//             </label>

//             <input
//               type="number"
//               min="0"
//               value={price}
//               onChange={(e) =>
//                 setPrice(e.target.value)
//               }
//               className="w-full border rounded-lg h-11 px-3"
//               placeholder="2000"
//             />
//           </div>
//         </div>

//         {/* ================= ACTIONS ================= */}

//         <div className="flex justify-end gap-3 mt-6">
//           <Button
//             onClick={onClose}
//             className="!bg-gray-100 !text-gray-700"
//           >
//             Cancel
//           </Button>

//           <Button
//             onClick={handleSubmit}
//             disabled={loading}
//           >
//             {loading
//               ? "Creating..."
//               : "Create Rate"}
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }



























// import { useState, useEffect } from "react";
// import { toast } from "react-toastify";

// import { Button } from "../ui/Button";
// import { useAuthStore } from "../../store/auth.store";





// interface Props {
//   open: boolean;
//   onClose: () => void;
//   businessId: string;
//   onCreate: (payload: any) => Promise<void>;
// }

// const STATES = [
//   "Abia","Adamawa","Akwa Ibom","Anambra","Bauchi","Bayelsa","Benue","Borno",
//   "Cross River","Delta","Ebonyi","Edo","Ekiti","Enugu","FCT","Gombe","Imo",
//   "Jigawa","Kaduna","Kano","Katsina","Kebbi","Kogi","Kwara","Lagos","Nasarawa",
//   "Niger","Ogun","Ondo","Osun","Oyo","Plateau","Rivers","Sokoto","Taraba",
//   "Yobe","Zamfara"
// ];

// export default function CreateRateModal({
//   open,
//   onClose,
//   businessId,
//   onCreate,
// }: Props) {

//   const [loading, setLoading] = useState(false);


//   const originState = useAuthStore(
//   (state) => state.user?.businessAddress?.state
// );

//   const [destinationState, setDestinationState] = useState("");
//   const [minWeight, setMinWeight] = useState("");
//   const [maxWeight, setMaxWeight] = useState("");
//   const [price, setPrice] = useState("");

//   /* ================= RESET ================= */
//   useEffect(() => {
//     if (open) {
//       setDestinationState("");
//       setMinWeight("");
//       setMaxWeight("");
//       setPrice("");
//     }
//   }, [open]);

//   if (!open) return null;

//   const handleSubmit = async () => {
//     if (!originState || !destinationState || !price) {
//       toast.error("Missing required fields");
//       return;
//     }

//     try {
//       setLoading(true);

//       const payload = {
//         businessId,
//         originState, // ✅ AUTO-FILLED
//         priceBreakdown: [
//           {
//             destinationState,
//             weightRanges: [
//               {
//                 min: Number(minWeight) || 0,
//                 max: Number(maxWeight) || 0,
//                 price: Number(price),
//               },
//             ],
//           },
//         ],
//       };

//       await onCreate(payload);

//       toast.success("Shipping rate created");
//       onClose();
//     } catch (error: any) {
//       toast.error(
//         error?.response?.data?.message ||
//           "Failed to create shipping rate"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
//       <div className="bg-white w-full max-w-lg rounded-2xl p-6">

//         <h2 className="text-xl font-semibold mb-6">
//           Create Delivery Rate
//         </h2>

//         <div className="space-y-4">

//           {/* ORIGIN (AUTO) */}
//           <div>
//             <label className="text-sm text-gray-500">
//               Origin State (Auto)
//             </label>

//             <input
//               value={originState || ""}
//               disabled
//               className="w-full border rounded-lg h-11 px-3 bg-gray-100"
//             />
//           </div>

//           {/* DESTINATION */}
//           <select
//             value={destinationState}
//             onChange={(e) =>
//               setDestinationState(e.target.value)
//             }
//             className="w-full border rounded-lg h-11 px-3"
//           >
//             <option value="">
//               Select Destination State
//             </option>

//             {STATES.map((state) => (
//               <option key={state} value={state}>
//                 {state}
//               </option>
//             ))}
//           </select>

//           {/* WEIGHT */}
//           <div className="grid grid-cols-2 gap-3">
//             <input
//               type="number"
//               placeholder="Min Weight (kg)"
//               value={minWeight}
//               onChange={(e) => setMinWeight(e.target.value)}
//               className="border rounded-lg h-11 px-3"
//             />

//             <input
//               type="number"
//               placeholder="Max Weight (kg)"
//               value={maxWeight}
//               onChange={(e) => setMaxWeight(e.target.value)}
//               className="border rounded-lg h-11 px-3"
//             />
//           </div>

//           {/* PRICE */}
//           <input
//             type="number"
//             placeholder="Delivery Price"
//             value={price}
//             onChange={(e) => setPrice(e.target.value)}
//             className="w-full border rounded-lg h-11 px-3"
//           />
//         </div>

//         {/* ACTIONS */}
//         <div className="flex justify-end gap-3 mt-6">
//           <Button
//             onClick={onClose}
//             className="!bg-gray-100 !text-gray-700"
//           >
//             Cancel
//           </Button>

//           <Button onClick={handleSubmit} disabled={loading}>
//             {loading ? "Creating..." : "Create Rate"}
//           </Button>
//         </div>

//       </div>
//     </div>
//   );
// }












// import { useState } from "react";
// import { toast } from "react-toastify";

// import { Button } from "../ui/Button"; 

// interface Props {
//   open: boolean;
//   onClose: () => void;
//   businessId: string;
//   onCreate: (payload: any) => Promise<void>;
// }

// const STATES = [
//   "Abia",
//   "Adamawa",
//   "Akwa Ibom",
//   "Anambra",
//   "Bauchi",
//   "Bayelsa",
//   "Benue",
//   "Borno",
//   "Cross River",
//   "Delta",
//   "Ebonyi",
//   "Edo",
//   "Ekiti",
//   "Enugu",
//   "FCT",
//   "Gombe",
//   "Imo",
//   "Jigawa",
//   "Kaduna",
//   "Kano",
//   "Katsina",
//   "Kebbi",
//   "Kogi",
//   "Kwara",
//   "Lagos",
//   "Nasarawa",
//   "Niger",
//   "Ogun",
//   "Ondo",
//   "Osun",
//   "Oyo",
//   "Plateau",
//   "Rivers",
//   "Sokoto",
//   "Taraba",
//   "Yobe",
//   "Zamfara",
// ];

// export default function CreateRateModal({
//   open,
//   onClose,
//   businessId,
//   onCreate,
// }: Props) {
//   const [loading, setLoading] =
//     useState(false);

//   const [originState, setOriginState] =
//     useState("");

//   const [
//     destinationState,
//     setDestinationState,
//   ] = useState("");

//   const [minWeight, setMinWeight] =
//     useState("");

//   const [maxWeight, setMaxWeight] =
//     useState("");

//   const [price, setPrice] =
//     useState("");

//   if (!open) return null;

//   const handleSubmit = async () => {
//     if (
//       !originState ||
//       !destinationState ||
//       !price
//     ) {
//       toast.error(
//         "Please complete all fields"
//       );
//       return;
//     }

//     try {
//       setLoading(true);

//       const payload = {
//         businessId,
//         originState,

//         priceBreakdown: [
//           {
//             destinationState,

//             weightRanges: [
//               {
//                 min:
//                   Number(minWeight) || 0,

//                 max:
//                   Number(maxWeight) || 0,

//                 price: Number(price),
//               },
//             ],
//           },
//         ],
//       };

//       await onCreate(payload);

//       toast.success(
//         "Shipping rate created"
//       );

//       onClose();
//     } catch (error: any) {
//       toast.error(
//         error?.response?.data?.message ||
//           "Failed to create shipping rate"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">

//       <div className="bg-white w-full max-w-lg rounded-2xl p-6">

//         <h2 className="text-xl font-semibold mb-6">
//           Create Delivery Rate
//         </h2>

//         <div className="space-y-4">

//           {/* Origin */}
//           <select
//             value={originState}
//             onChange={(e) =>
//               setOriginState(
//                 e.target.value
//               )
//             }
//             className="w-full border rounded-lg h-11 px-3"
//           >
//             <option value="">
//               Select Origin State
//             </option>

//             {STATES.map((state) => (
//               <option
//                 key={state}
//                 value={state}
//               >
//                 {state}
//               </option>
//             ))}
//           </select>

//           {/* Destination */}
//           <select
//             value={destinationState}
//             onChange={(e) =>
//               setDestinationState(
//                 e.target.value
//               )
//             }
//             className="w-full border rounded-lg h-11 px-3"
//           >
//             <option value="">
//               Select Destination State
//             </option>

//             {STATES.map((state) => (
//               <option
//                 key={state}
//                 value={state}
//               >
//                 {state}
//               </option>
//             ))}
//           </select>

//           {/* Weight */}

//           <div className="grid grid-cols-2 gap-3">

//             <input
//               type="number"
//               placeholder="Min Weight (kg)"
//               value={minWeight}
//               onChange={(e) =>
//                 setMinWeight(
//                   e.target.value
//                 )
//               }
//               className="border rounded-lg h-11 px-3"
//             />

//             <input
//               type="number"
//               placeholder="Max Weight (kg)"
//               value={maxWeight}
//               onChange={(e) =>
//                 setMaxWeight(
//                   e.target.value
//                 )
//               }
//               className="border rounded-lg h-11 px-3"
//             />

//           </div>

//           {/* Price */}

//           <input
//             type="number"
//             placeholder="Delivery Price"
//             value={price}
//             onChange={(e) =>
//               setPrice(e.target.value)
//             }
//             className="w-full border rounded-lg h-11 px-3"
//           />

//         </div>

//         {/* Footer */}

//         <div className="flex justify-end gap-3 mt-6">

//           <Button
//             onClick={onClose}
//             className="!bg-gray-100 !text-gray-700"
//           >
//             Cancel
//           </Button>

//           <Button
//             onClick={handleSubmit}
//             disabled={loading}
//           >
//             {loading
//               ? "Creating..."
//               : "Create Rate"}
//           </Button>

//         </div>

//       </div>

//     </div>
//   );
// }