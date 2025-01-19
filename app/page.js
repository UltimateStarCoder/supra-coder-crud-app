import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-200 p-4">
      <h1 className="text-4xl font-bold mb-6 text-black">Welcome to Supra Coder</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link href="/inventory" className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Manage Your Inventory</h2>
          <p className="text-gray-600">Track and manage your items with ease.</p>
        </Link>
        <Link href="/dashboard" className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">User Dashboard</h2>
          <p className="text-gray-600">View and manage your personal inventory.</p>
        </Link>
      </div>
    </main>
  )
}
