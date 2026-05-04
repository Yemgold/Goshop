
export function TopBar() {
  return (
    <div className="flex justify-between items-center mb-4">

      <h1 className="text-xl font-bold">Dashboard</h1>

      <div className="flex gap-3 items-center">

        <button className="px-3 py-1 bg-gray-200 rounded">
          Notifications
        </button>

        <div className="w-8 h-8 rounded-full bg-black" />

      </div>

    </div>
  );
}