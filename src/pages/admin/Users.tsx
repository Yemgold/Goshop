

import { SectionCard } from "../../components/ui/SectionCard";

const users = [
  {
    id: 1,
    name: "John Doe",
    email: "john@test.com",
    role: "Vendor",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@test.com",
    role: "Rider",
  },
];

export default function Users() {
  return (
    <SectionCard title="All Users">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3">
                Name
              </th>

              <th className="text-left py-3">
                Email
              </th>

              <th className="text-left py-3">
                Role
              </th>

              <th className="text-left py-3">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="border-b"
              >
                <td className="py-4">
                  {user.name}
                </td>

                <td className="py-4">
                  {user.email}
                </td>

                <td className="py-4">
                  {user.role}
                </td>

                <td className="py-4">
                  <div className="flex gap-2">
                    <button
                      className="
                        px-3
                        py-1
                        rounded-lg
                        bg-black
                        text-white
                      "
                    >
                      Edit
                    </button>

                    <button
                      className="
                        px-3
                        py-1
                        rounded-lg
                        bg-red-500
                        text-white
                      "
                    >
                      Suspend
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionCard>
  );
}