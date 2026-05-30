


import { SectionCard } from "../../components/ui/SectionCard";

export default function Settings() {
  return (
    <SectionCard title="Admin Settings">
      <div className="space-y-4">

        <button className="w-full p-3 bg-black text-white rounded-xl">
          System Settings
        </button>

        <button className="w-full p-3 bg-black text-white rounded-xl">
          Role Permissions
        </button>

        <button className="w-full p-3 bg-black text-white rounded-xl">
          Security Settings
        </button>

        <button className="w-full p-3 bg-black text-white rounded-xl">
          Payment Configuration
        </button>

      </div>
    </SectionCard>
  );
}