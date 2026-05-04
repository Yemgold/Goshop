import { useState } from "react";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";

export default function RiderDashboard() {
  const [online, setOnline] = useState(true);

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
    { id: 1, from: "Yaba", to: "Victoria Island", time: "2:00 PM" },
    { id: 2, from: "Surulere", to: "Ajah", time: "4:30 PM" },
  ];

  const pendingTrips = upcomingTrips.length;

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-10">

      {/* ================= HERO SECTION ================= */}
      <div className="bg-gradient-to-r from-black to-gray-800 text-white p-6 rounded-xl">

        <h1 className="text-2xl font-bold">
          Rider Dashboard 🚴‍♂️
        </h1>

        <p className="text-sm text-gray-300 mt-1">
          {online ? "Online - Ready for trips" : "Offline"} • {stats.trips} trips completed • {pendingTrips} upcoming
        </p>

        <div className="flex gap-3 mt-4 flex-wrap">

          <Button
            onClick={() => setOnline(!online)}
          >
            {online ? "Go Offline" : "Go Online"}
          </Button>

          <Button>
            Earnings
          </Button>

          <Button>
            Rating
          </Button>

        </div>

      </div>

      {/* ================= STATS ================= */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

        <Card className="p-4">
          <p className="text-sm text-gray-500">Trips</p>
          <h2 className="text-xl font-bold">{stats.trips}</h2>
        </Card>

        <Card className="p-4">
          <p className="text-sm text-gray-500">Earnings</p>
          <h2 className="text-xl font-bold">
            ₦{stats.earnings.toLocaleString()}
          </h2>
        </Card>

        <Card className="p-4">
          <p className="text-sm text-gray-500">Rating</p>
          <h2 className="text-xl font-bold">
            ⭐ {stats.rating}
          </h2>
        </Card>

        <Card className="p-4">
          <p className="text-sm text-gray-500">Cancellations</p>
          <h2 className="text-xl font-bold">{stats.cancellations}</h2>
        </Card>

      </div>

      {/* ================= ACTIVE TRIP ================= */}
      <Section title="Active Trip">

        {activeTrip ? (
          <Card className="p-4 space-y-3">

            <div>
              <p className="font-semibold text-lg">
                {activeTrip.from} → {activeTrip.to}
              </p>

              <p className="text-sm text-gray-500">
                Status: {activeTrip.status}
              </p>
            </div>

            <p className="font-bold text-lg">
              ₦{activeTrip.fare.toLocaleString()}
            </p>

            <div className="flex gap-3">

              <Button>
                Start Trip
              </Button>

              <Button variant="danger">
                Cancel
              </Button>

            </div>

          </Card>
        ) : (
          <p className="text-sm text-gray-500">
            No active trip at the moment
          </p>
        )}

      </Section>

      {/* ================= UPCOMING TRIPS ================= */}
      <Section title="Upcoming Trips">

        <div className="space-y-3">

          {upcomingTrips.map((trip) => (
            <Card
              key={trip.id}
              className="p-4 flex justify-between items-center"
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

      </Section>

    </div>
  );
}

/* ================= SECTION COMPONENT ================= */
function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold">{title}</h2>
      {children}
    </div>
  );
}