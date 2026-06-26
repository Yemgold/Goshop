


// src/pages/buyer/BeComeRider.tsx

// import { useState } from "react";
// import { Bike, MapPin, Building2, } from "lucide-react";
// import { BecomeRiderModa}

// export default function BecomeRider() {
 

// const [pickupCenters, setPickupCenters] = useState<any[]>([]);
// const [selectedCenter, setSelectedCenter] = useState<any>(null);
// const [openModal, setOpenModal] = useState(false);




//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     alert("Application submitted successfully.");
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 py-10 px-5">
//       <div className="max-w-3xl mx-auto">

//         {/* Header */}

//         <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl text-white p-8 shadow-lg mb-8">

//           <div className="flex items-center gap-4">

//             <div className="bg-white/20 rounded-full p-4">
//               <Bike size={40} />
//             </div>

//             <div>
//               <h1 className="text-3xl font-bold">
//                 Become a Rider
//               </h1>

//               <p className="text-green-100 mt-2">
//                 Apply to work under a Pickup Center and start earning by delivering customer orders.
//               </p>
//             </div>

//           </div>

//         </div>

//         {/* Form */}

//         <div className="bg-white rounded-2xl shadow-lg p-8">

//           <form
//             onSubmit={handleSubmit}
//             className="space-y-6"
//           >

           

//            {/* Search Pickup Centers */}

// <div className="space-y-5">

//   <h2 className="text-xl font-bold text-gray-800">
//     Find a Pickup Center
//   </h2>

//   <p className="text-gray-500">
//     Search for a pickup center by State, Town or Pickup Center Name.
//   </p>

//   <div className="grid md:grid-cols-3 gap-4">

//     {/* State */}

//     <div>
//       <label className="block mb-2 font-medium">
//         Search by State
//       </label>

//       <input
//         type="text"
//         placeholder="e.g Lagos"
//         className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 outline-none"
//       />
//     </div>

//     {/* Town */}

//     <div>
//       <label className="block mb-2 font-medium">
//         Search by Town
//       </label>

//       <input
//         type="text"
//         placeholder="e.g Lekki"
//         className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 outline-none"
//       />
//     </div>

//     {/* Pickup Center */}

//     <div>
//       <label className="block mb-2 font-medium">
//         Search by Pickup Center Name
//       </label>

//       <input
//         type="text"
//         placeholder="e.g Fast Pickup Hub"
//         className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 outline-none"
//       />
//     </div>

//   </div>

// </div>




//            {/* Search Results */}


//   <div className="flex items-center justify-between mb-4">
//     <div>
//       <h2 className="text-xl font-bold">
//         Available Pickup Centers
//       </h2>

//       <p className="text-sm text-gray-500">
//         Select a pickup center you'd like to work with.
//       </p>
//     </div>

//     <span className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full">
//       3 Centers Found
//     </span>
//   </div>

//   <div className="space-y-5">



// {/* Search Results */}

// <div className="space-y-5">

//   {pickupCenters?.length ? (

//     pickupCenters.map((center: any) => (

//       <div
//         key={center._id}
//         className="border rounded-xl p-5 hover:shadow-lg transition bg-white"
//       >

//         <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-5">

//           <div className="space-y-3">

//             <div className="flex items-center gap-3">

//               <div className="bg-green-100 p-3 rounded-full">
//                 <Building2
//                   className="text-green-600"
//                   size={24}
//                 />
//               </div>

//               <div>

//                 <h3 className="font-bold text-lg">
//                   {center.name}
//                 </h3>

//                 <p className="text-sm text-green-600">
//                   ⭐ {center.rating ?? "New"}
//                 </p>

//               </div>

//             </div>

//             <div className="space-y-2 text-sm text-gray-600">

//               <p className="flex items-center gap-2">
//                 <MapPin size={16} />
//                 {center.town}, {center.state}
//               </p>

//               <p>
//                 📞 {center.phone}
//               </p>

//               <p>
//                 🚚 Active Riders: {center.totalRiders ?? 0}
//               </p>

//             </div>

//           </div>

//           <button
//             type="button"
//             onClick={() => {
//               setSelectedCenter(center);
//               setOpenModal(true);
//             }}
//             className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition"
//           >
//             Apply
//           </button>

//         </div>

//       </div>

//     ))

//   ) : (

//     <div className="bg-white rounded-xl border p-10 text-center">

//       <Building2
//         size={45}
//         className="mx-auto text-gray-300 mb-4"
//       />

//       <h3 className="text-lg font-semibold">
//         No Pickup Centers Found
//       </h3>

//       <p className="text-gray-500 mt-2">
//         Try searching using another State,
//         Town or Pickup Center name.
//       </p>

//     </div>

//   )}

// </div>



//             {/* Information */}

//             <div className="rounded-xl bg-green-50 border border-green-200 p-5">

//               <h3 className="font-semibold text-green-700 mb-3">
//                 Before You Apply
//               </h3>

//               <ul className="list-disc ml-5 space-y-2 text-sm text-gray-700">

//                 <li>
//                   You must have a verified account.
//                 </li>

//                 <li>
//                   The Pickup Center will review your application.
//                 </li>

//                 <li>
//                   Once approved, Rider access will automatically be added to your account.
//                 </li>

//                 <li>
//                   You can switch between your Buyer Dashboard and Rider Dashboard anytime.
//                 </li>

//               </ul>

//             </div>

           

//           </form>

//         </div>

//       </div>
//     </div>
//   );
// }






import { useState } from "react";
import { Bike, MapPin, Building2 } from "lucide-react";
import BecomeRiderModal from "../../components/partner/BecomeRiderModal";

export default function BecomeRider() {
  const [filters, setFilters] = useState({
    state: "",
    town: "",
    name: "",
  });

  const [pickupCenters] = useState<any[]>([
    {
      _id: "1",
      name: "FastLink Pickup Center",
      state: "Lagos",
      town: "Ikeja",
      phone: "08045678901",
      rating: 4.9,
      totalRiders: 28,
    },
    {
      _id: "2",
      name: "Express Pickup Hub",
      state: "Lagos",
      town: "Lekki",
      phone: "08123456789",
      rating: 4.8,
      totalRiders: 16,
    },
    {
      _id: "3",
      name: "Swift Riders Depot",
      state: "Lagos",
      town: "Yaba",
      phone: "07034567890",
      rating: 4.7,
      totalRiders: 11,
    },
  ]);

  const [selectedCenter, setSelectedCenter] = useState<any>(null);
  const [openModal, setOpenModal] = useState(false);

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const filteredCenters = pickupCenters.filter((center) => {
    return (
      center.state
        .toLowerCase()
        .includes(filters.state.toLowerCase()) &&
      center.town
        .toLowerCase()
        .includes(filters.town.toLowerCase()) &&
      center.name
        .toLowerCase()
        .includes(filters.name.toLowerCase())
    );
  });

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-5">
      <div className="max-w-6xl mx-auto">

        {/* Header */}

        <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl text-white p-8 shadow-lg mb-8">

          <div className="flex items-center gap-4">

            <div className="bg-white/20 rounded-full p-4">
              <Bike size={40} />
            </div>

            <div>
              <h1 className="text-3xl font-bold">
                Become a Rider
              </h1>

              <p className="text-green-100 mt-2">
                Search for a Pickup Center and submit your rider application.
              </p>
            </div>

          </div>

        </div>

        {/* Search */}

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">

          <h2 className="text-xl font-bold mb-2">
            Search Pickup Centers
          </h2>

          <p className="text-gray-500 mb-6">
            Search by State, Town or Pickup Center Name.
          </p>

          <div className="grid md:grid-cols-3 gap-4">

            <input
              name="state"
              value={filters.state}
              onChange={handleFilterChange}
              placeholder="State"
              className="border rounded-lg px-4 py-3"
            />

            <input
              name="town"
              value={filters.town}
              onChange={handleFilterChange}
              placeholder="Town"
              className="border rounded-lg px-4 py-3"
            />

            <input
              name="name"
              value={filters.name}
              onChange={handleFilterChange}
              placeholder="Pickup Center Name"
              className="border rounded-lg px-4 py-3"
            />

          </div>

        </div>

        {/* Results */}

        <div className="flex justify-between items-center mb-6">

          <div>

            <h2 className="text-2xl font-bold">
              Available Pickup Centers
            </h2>

            <p className="text-gray-500">
              Select the Pickup Center you want to join.
            </p>

          </div>

          <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm">
            {filteredCenters.length} Found
          </span>

        </div>

        <div className="space-y-5">

          {filteredCenters.length ? (

            filteredCenters.map((center) => (

              <div
                key={center._id}
                className="border rounded-xl p-6 bg-white hover:shadow-lg transition"
              >

                <div className="flex flex-col md:flex-row justify-between gap-5">

                  <div>

                    <div className="flex items-center gap-3 mb-4">

                      <div className="bg-green-100 p-3 rounded-full">
                        <Building2
                          className="text-green-600"
                          size={24}
                        />
                      </div>

                      <div>

                        <h3 className="font-bold text-lg">
                          {center.name}
                        </h3>

                        <p className="text-green-600">
                          ⭐ {center.rating}
                        </p>

                      </div>

                    </div>

                    <div className="space-y-2 text-gray-600">

                      <p className="flex items-center gap-2">
                        <MapPin size={16} />
                        {center.town}, {center.state}
                      </p>

                      <p>📞 {center.phone}</p>

                      <p>
                        🚚 Active Riders: {center.totalRiders}
                      </p>

                    </div>

                  </div>

                  <button
                    onClick={() => {
                      setSelectedCenter(center);
                      setOpenModal(true);
                    }}
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold"
                  >
                    Apply
                  </button>

                </div>

              </div>

            ))

          ) : (

            <div className="bg-white rounded-xl p-10 text-center border">

              <Building2
                size={50}
                className="mx-auto text-gray-300 mb-4"
              />

              <h3 className="font-bold text-lg">
                No Pickup Centers Found
              </h3>

              <p className="text-gray-500 mt-2">
                Try another search.
              </p>

            </div>

          )}

        </div>

        {/* Information */}

        <div className="mt-8 bg-green-50 border border-green-200 rounded-xl p-6">

          <h3 className="font-bold text-green-700 mb-3">
            Before You Apply
          </h3>

          <ul className="list-disc ml-5 space-y-2 text-sm">

            <li>You must have a verified account.</li>

            <li>Your application will be reviewed.</li>

            <li>When approved, Rider access is added automatically.</li>

            <li>You can switch between Buyer and Rider dashboards.</li>

          </ul>

        </div>

      </div>

      {/* Modal */}

      <BecomeRiderModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        pickupCenter={selectedCenter}
      />

    </div>
  );
}





























// // src/pages/buyer/BeComeRider.tsx

// import { useState } from "react";
// import { Bike, MapPin, Building2, Send } from "lucide-react";

// export default function BecomeRider() {
//   const [form, setForm] = useState({
//     pickupCenterId: "",
//     message: "",
//   });

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     setForm({
//       ...form,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     console.log(form);

//     // TODO
//     // Call Apply Rider API

//     alert("Application submitted successfully.");
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 py-10 px-5">
//       <div className="max-w-3xl mx-auto">

//         {/* Header */}

//         <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl text-white p-8 shadow-lg mb-8">

//           <div className="flex items-center gap-4">

//             <div className="bg-white/20 rounded-full p-4">
//               <Bike size={40} />
//             </div>

//             <div>
//               <h1 className="text-3xl font-bold">
//                 Become a Rider
//               </h1>

//               <p className="text-green-100 mt-2">
//                 Apply to work under a Pickup Center and start earning by delivering customer orders.
//               </p>
//             </div>

//           </div>

//         </div>

//         {/* Form */}

//         <div className="bg-white rounded-2xl shadow-lg p-8">

//           <form
//             onSubmit={handleSubmit}
//             className="space-y-6"
//           >

//             {/* Pickup Center */}

//             <div>

//               <label className="block font-semibold mb-2">
//                 Pickup Center ID
//               </label>

//               <input
//                 type="text"
//                 name="pickupCenterId"
//                 value={form.pickupCenterId}
//                 onChange={handleChange}
//                 placeholder="Enter Pickup Center ID"
//                 className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 outline-none"
//                 required
//               />

//             </div>

//             {/* Preview Card */}

//             <div className="border rounded-xl p-5 bg-gray-50">

//               <div className="flex items-center gap-3 mb-3">

//                 <Building2 className="text-green-600" />

//                 <div>
//                   <h3 className="font-bold">
//                     Pickup Center Information
//                   </h3>

//                   <p className="text-sm text-gray-500">
//                     This section will automatically display after a valid Pickup Center ID is entered.
//                   </p>

//                 </div>

//               </div>

//               <div className="space-y-2 text-sm">

//                 <p>
//                   <strong>Name:</strong> —
//                 </p>

//                 <p>
//                   <strong>Phone:</strong> —
//                 </p>

//                 <p className="flex items-center gap-2">
//                   <MapPin size={16} />
//                   —
//                 </p>

//               </div>

//             </div>

//             {/* Message */}

//             <div>

//               <label className="block font-semibold mb-2">
//                 Why do you want to become a rider?
//               </label>

//               <textarea
//                 rows={5}
//                 name="message"
//                 value={form.message}
//                 onChange={handleChange}
//                 placeholder="Tell the pickup center why you would like to join..."
//                 className="w-full border rounded-lg px-4 py-3 resize-none focus:ring-2 focus:ring-green-500 outline-none"
//               />

//             </div>

//             {/* Information */}

//             <div className="rounded-xl bg-green-50 border border-green-200 p-5">

//               <h3 className="font-semibold text-green-700 mb-3">
//                 Before You Apply
//               </h3>

//               <ul className="list-disc ml-5 space-y-2 text-sm text-gray-700">

//                 <li>
//                   You must have a verified account.
//                 </li>

//                 <li>
//                   The Pickup Center will review your application.
//                 </li>

//                 <li>
//                   Once approved, Rider access will automatically be added to your account.
//                 </li>

//                 <li>
//                   You can switch between your Buyer Dashboard and Rider Dashboard anytime.
//                 </li>

//               </ul>

//             </div>

//             {/* Button */}

//             <button
//               type="submit"
//               className="w-full bg-green-600 hover:bg-green-700 text-white rounded-lg py-4 font-semibold flex justify-center items-center gap-2 transition"
//             >
//               <Send size={18} />
//               Submit Rider Application
//             </button>

//           </form>

//         </div>

//       </div>
//     </div>
//   );
// }