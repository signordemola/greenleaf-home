import { prisma } from "@/lib/prisma"

export default async function Home() {
  const [services, clients] = await Promise.all([
    prisma.serviceType.findMany({ include: { tiers: true }, orderBy: { displayOrder: 'asc' } }),
    prisma.client.findMany({ include: { plans: true } })
  ])

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-green-800 text-center">Greenleaf Home Co. Operational Portal</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        <section className="bg-white shadow rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4 text-green-700 border-b pb-2">Available Services</h2>
          <div className="space-y-4">
            {services.map((service) => (
              <div key={service.id} className="border-l-4 border-green-500 pl-4">
                <h3 className="font-bold text-lg">{service.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{service.description}</p>
                <div className="text-xs font-mono bg-gray-100 p-2 rounded">
                  {service.tiers.map(t => (
                    <div key={t.id}>{t.label}: ${t.basePrice / 100}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white shadow rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4 text-green-700 border-b pb-2">Active Clients</h2>
          <div className="space-y-4">
            {clients.map((client) => (
              <div key={client.id} className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-bold">{client.name}</h3>
                <p className="text-sm text-gray-600">{client.address}, {client.zipCode}</p>
                <div className="mt-2 text-xs">
                  {client.plans.map(p => (
                    <div key={p.id} className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {p.frequency} Plan: ${p.recurringPrice / 100}/visit
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}