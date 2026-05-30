




import React from "react";
import { MapPin, Navigation, LocateFixed } from "lucide-react";

const RiderMap: React.FC = () => {
  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold">Live Map</h1>
        <p className="text-sm text-gray-500">
          Track pickup and delivery locations in real time
        </p>
      </div>

      {/* MAP CONTAINER */}
      <div className="relative h-96 bg-gray-100 rounded-3xl flex items-center justify-center text-gray-400">

        {/* Placeholder Map */}
        <div className="text-center space-y-2">
          <LocateFixed className="w-8 h-8 mx-auto text-gray-500" />
          <p>Map integration goes here</p>
          <p className="text-xs text-gray-400">
            (Google Maps / Mapbox / Leaflet)
          </p>
        </div>

        {/* Floating markers (UI mock) */}
        <div className="absolute top-6 left-6 bg-white shadow px-3 py-2 rounded-xl flex items-center gap-2">
          <MapPin className="w-4 h-4 text-green-600" />
          <span className="text-xs">Pickup Point</span>
        </div>

        <div className="absolute bottom-6 right-6 bg-white shadow px-3 py-2 rounded-xl flex items-center gap-2">
          <Navigation className="w-4 h-4 text-red-600" />
          <span className="text-xs">Dropoff Point</span>
        </div>

      </div>

      {/* INFO CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        <div className="p-4 border rounded-2xl">
          <h3 className="font-semibold">Current Status</h3>
          <p className="text-sm text-gray-500 mt-1">
            Waiting for active delivery
          </p>
        </div>

        <div className="p-4 border rounded-2xl">
          <h3 className="font-semibold">ETA</h3>
          <p className="text-sm text-gray-500 mt-1">
            -- minutes
          </p>
        </div>

        <div className="p-4 border rounded-2xl">
          <h3 className="font-semibold">Distance</h3>
          <p className="text-sm text-gray-500 mt-1">
            -- km
          </p>
        </div>

      </div>

    </div>
  );
};

export default RiderMap;