

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// import { Card } from "../../components/ui/Card";
// import { Button } from "../../components/ui/Button";

// export default function RiderDashboard() {
//   const navigate = useNavigate();

//   const [online, setOnline] = useState(true);

//   const [loadingBtn, setLoadingBtn] =
//     useState<string | null>(null);

//   const stats = {
//     trips: 42,
//     earnings: 125000,
//     rating: 4.8,
//     cancellations: 3,
//   };

//   const activeTrip = {
//     from: "Ikeja",
//     to: "Lekki Phase 1",
//     fare: 3500,
//     status: "In Progress",
//   };

//   const upcomingTrips = [
//     {
//       id: 1,
//       from: "Yaba",
//       to: "Victoria Island",
//       time: "2:00 PM",
//     },
//     {
//       id: 2,
//       from: "Surulere",
//       to: "Ajah",
//       time: "4:30 PM",
//     },
//   ];

//   /* ================= NAVIGATION ================= */

//   const handleNavigate = (
//     key: string,
//     path: string
//   ) => {
//     setLoadingBtn(key);

//     setTimeout(() => {
//       navigate(path);
//       setLoadingBtn(null);
//     }, 700);
//   };

//   /* ================= SPINNER ================= */

//   const Spinner = () => (
//     <div
//       className="
//         w-4 h-4
//         border-2
//         border-white
//         border-t-transparent
//         rounded-full
//         animate-spin
//       "
//     />
//   );

//   return (
//     <div className="p-6 max-w-6xl mx-auto space-y-10">

//       {/* ================= QUICK STATUS BAR ================= */}

//       <div
//         className="
//           flex items-center justify-between
//           bg-gray-100
//           p-4
//           rounded-xl
//         "
//       >

//         <p className="text-sm text-gray-700">
//           {online
//             ? "🟢 Online - Ready for trips"
//             : "🔴 Offline"}{" "}
//           • {stats.trips} trips completed
//         </p>

//         <Button
//           onClick={() => setOnline(!online)}
//         >
//           {online
//             ? "Go Offline"
//             : "Go Online"}
//         </Button>

//       </div>

//       {/* ================= QUICK ACTIONS ================= */}

//       <div className="flex gap-3 flex-wrap">

//         <button onClick={() =>handleNavigate(  "jobs",  "/rider/jobs") }
//           className=" px-4 py-2 rounded-xl bg-black text-white flex items-center gap-2">
//           {loadingBtn === "jobs" && (  <Spinner /> )}
//           Jobs
//         </button>

//         <button onClick={() => handleNavigate(  "earnings",  "/rider/earnings")}
//            className=" px-4 py-2 rounded-xl bg-black text-white flex items-center gap-2">
//           {loadingBtn === "earnings" && ( <Spinner /> )}
//           Earnings
//         </button>

//         <button onClick={() => handleNavigate(   "market",   "/buyer/home" )  }
//           className=" px-4 py-2 rounded-xl bg-black text-white flex items-center gap-2">
//           {loadingBtn === "market" && ( <Spinner />)}
//          Visit Market
//         </button>

//       </div>

//       {/* ================= STATS ================= */}

//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

//         <Card className="p-4">

//           <p className="text-sm text-gray-500">
//             Trips
//           </p>

//           <h2 className="text-xl font-bold">
//             {stats.trips}
//           </h2>

//         </Card>

//         <Card className="p-4">

//           <p className="text-sm text-gray-500">
//             Earnings
//           </p>

//           <h2 className="text-xl font-bold">
//             ₦{stats.earnings.toLocaleString()}
//           </h2>

//         </Card>

//         <Card className="p-4">

//           <p className="text-sm text-gray-500">
//             Rating
//           </p>

//           <h2 className="text-xl font-bold">
//             ⭐ {stats.rating}
//           </h2>

//         </Card>

//         <Card className="p-4">

//           <p className="text-sm text-gray-500">
//             Cancellations
//           </p>

//           <h2 className="text-xl font-bold">
//             {stats.cancellations}
//           </h2>

//         </Card>

//       </div>

//       {/* ================= ACTIVE TRIP ================= */}

//       <Section title="Active Trip">

//         {activeTrip ? (
//           <Card className="p-4 space-y-3">

//             <div>

//               <p className="font-semibold text-lg">
//                 {activeTrip.from} →{" "}
//                 {activeTrip.to}
//               </p>

//               <p className="text-sm text-gray-500">
//                 Status: {activeTrip.status}
//               </p>

//             </div>

//             <p className="font-bold text-lg">
//               ₦{activeTrip.fare.toLocaleString()}
//             </p>

//             <div className="flex gap-3">

//               <Button>
//                 Start Trip
//               </Button>

//               <Button variant="danger">
//                 Cancel
//               </Button>

//             </div>

//           </Card>
//         ) : (
//           <p className="text-sm text-gray-500">
//             No active trip at the moment
//           </p>
//         )}

//       </Section>

//       {/* ================= UPCOMING TRIPS ================= */}

//       <Section title="Upcoming Trips">

//         <div className="space-y-3">

//           {upcomingTrips.map((trip) => (
//             <Card
//               key={trip.id}
//               className="
//                 p-4
//                 flex
//                 justify-between
//                 items-center
//               "
//             >

//               <div>

//                 <p className="font-medium">
//                   {trip.from} → {trip.to}
//                 </p>

//                 <p className="text-sm text-gray-500">
//                   {trip.time}
//                 </p>

//               </div>

//               <Button variant="outline">
//                 View
//               </Button>

//             </Card>
//           ))}

//         </div>

//       </Section>

//     </div>
//   );
// }

// /* ================= SECTION COMPONENT ================= */

// function Section({
//   title,
//   children,
// }: {
//   title: string;
//   children: React.ReactNode;
// }) {
//   return (
//     <div className="space-y-3">

//       <h2 className="text-lg font-semibold">
//         {title}
//       </h2>

//       {children}

//     </div>
//   );
// }







import { useState } from "react";


import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { SectionCard } from "../../components/ui/SectionCard";
import { DashboardGrid } from "../../components/ui/DashboardGrid";
import { StatCard } from "../../components/ui/StatCard";

export default function RiderDashboard() {
  

  const [online, setOnline] = useState(true);

 

  /* ================= MOCK DATA ================= */

  const stats = {
    trips: 42,
    earnings: 125000,
    rating: 4.8,
    cancellations: 3,
  };

  const activeTrip = {
    from: "Ikeja",
    to: "Lekki Phase 1",
    fare: 3500,
    status: "In Progress",
  };

  const upcomingTrips = [
    {
      id: 1,
      from: "Yaba",
      to: "Victoria Island",
      time: "2:00 PM",
    },
    {
      id: 2,
      from: "Surulere",
      to: "Ajah",
      time: "4:30 PM",
    },
  ];

  



  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8">

      {/* ================= STATUS BAR ================= */}

      <div
        className="
          flex items-center justify-between
          bg-gray-100
          p-4
          rounded-2xl
        "
      >

        <p className="text-sm text-gray-700">
          {online
            ? "🟢 Online - Ready for trips"
            : "🔴 Offline"}{" "}
          • {stats.trips} trips completed
        </p>

        <Button
          onClick={() => setOnline(!online)}
        >
          {online
            ? "Go Offline"
            : "Go Online"}
        </Button>

      </div>

      {/* ================= RIDER HERO ================= */}

      <SectionCard title="Rider Hub">

        <div className="flex flex-col md:flex-row gap-6">

        
        
          {/* ================= IMAGE ================= */}

    <div className="w-full md:flex-1">

    <div className="relative rounded-3xl overflow-hidden shadow-xl">
            
     <img src="/images/rider.png" alt="Rider" className=" w-full h-64 md:h-80 object-cover  "/>

              
                      {/* OVERLAY */}

              <div className="absolute inset-0 bg-black/40" />

                       {/* CONTENT */}

              <div className=" absolute  bottom-0  left-0  p-6 " >

              <p className="text-sm text-white/80 mb-1">
                  Rider Dashboard
                </p>

                <h1 className="text-3xl font-bold">
                  Ready for Deliveries 🚴
                </h1>

                <p
                  className="
                    text-sm
                    text-white/90
                    mt-2
                    max-w-md
                  "
                >
                  Manage trips, track earnings,
                  accept jobs and stay active
                  on the road.
                </p>

              </div>

            </div>

          </div>

                

        </div>

      </SectionCard>

      {/* ================= STATS ================= */}

      <DashboardGrid>

        <StatCard
          title="Trips"
          value={stats.trips}
        />

        <StatCard
          title="Earnings"
          value={`₦${stats.earnings.toLocaleString()}`}
        />

        <StatCard
          title="Rating"
          value={`⭐ ${stats.rating}`}
        />

        <StatCard
          title="Cancellations"
          value={stats.cancellations}
        />

      </DashboardGrid>

      {/* ================= ACTIVE TRIP ================= */}

      <SectionCard title="Active Trip">

        {activeTrip ? (
          <div className="space-y-4">

            <div
              className="
                flex
                justify-between
                items-start
              "
            >

              <div>

                <p className="font-semibold text-lg">
                  {activeTrip.from} →{" "}
                  {activeTrip.to}
                </p>

                <p className="text-sm text-gray-500">
                  Status: {activeTrip.status}
                </p>

              </div>

              <div className="text-right">

                <p className="text-xl font-bold">
                  ₦
                  {activeTrip.fare.toLocaleString()}
                </p>

              </div>

            </div>

            <div className="flex gap-3">

              <Button>
                Start Trip
              </Button>

              <Button variant="danger">
                Cancel
              </Button>

            </div>

          </div>
        ) : (
          <p className="text-sm text-gray-500">
            No active trip at the moment
          </p>
        )}

      </SectionCard>

      {/* ================= UPCOMING TRIPS ================= */}

      <SectionCard title="Upcoming Trips">

        <div className="space-y-3">

          {upcomingTrips.map((trip) => (
            <Card
              key={trip.id}
              className="
                p-4
                flex
                justify-between
                items-center
              "
            >

              <div>

                <p className="font-medium">
                  {trip.from} → {trip.to}
                </p>

                <p className="text-sm text-gray-500">
                  {trip.time}
                </p>

              </div>

              <Button variant="outline">
                View
              </Button>

            </Card>
          ))}

        </div>

      </SectionCard>

    </div>
  );
}