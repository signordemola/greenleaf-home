import { requireOwner } from "@/lib/dal";

const DashboardPage = async () => {
  const session = await requireOwner();

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-green-800">Owner Dashboard</h1>
      <p className="mt-4">Welcome back, {session.user.name}!</p>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-sm font-medium text-gray-500">Revenue (MTD)</h3>
          <p className="text-2xl font-bold mt-2">$12,450</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-sm font-medium text-gray-500">Active Plans</h3>
          <p className="text-2xl font-bold mt-2">42</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-sm font-medium text-gray-500">Cleans Today</h3>
          <p className="text-2xl font-bold mt-2">5</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
