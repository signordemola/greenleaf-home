import { prisma } from "@/lib/prisma";


export default async function Home() {
  const users = await prisma.user.findMany();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Greenleaf Home Co. - Connection Test</h1>
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-2">User List ({users.length})</h2>
        {users.length === 0 ? (
          <p className="text-gray-500">No users found in database. Run pnpm prisma db seed.</p>
        ) : (
          <ul className="space-y-2">
            {users.map((user: any) => (
              <li key={user.id} className="border-b pb-2">
                <span className="font-medium">{user.name}</span> - <span className="text-gray-600">{user.email}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}