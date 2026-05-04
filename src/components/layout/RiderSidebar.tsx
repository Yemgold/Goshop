
import { ProSidebar } from "./ProSidebar";
import { Truck, MapPin, Wallet } from "lucide-react";

export function RiderSidebar() {
  return (
    <ProSidebar
      title="Rider"
      menu={[
        { label: "Dashboard", path: "/rider/dashboard", icon: <Truck /> },
        { label: "Jobs", path: "/rider/jobs", icon: <MapPin /> },
        { label: "Earnings", path: "/rider/earnings", icon: <Wallet /> },
      ]}
    />
  );
}