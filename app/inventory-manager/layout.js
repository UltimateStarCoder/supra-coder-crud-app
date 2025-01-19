import { Inter } from 'next/font/google'
import Link from 'next/link'
import { SessionProvider } from '../providers'

const inter = Inter({ subsets: ['latin'] })


export default function InventoryLayout({ children }) {
    return (
        <div className={inter.className}>
            <SessionProvider>
            <nav className="bg-slate-800 text-white p-4">
                <div className="flex justify-between items-center max-w-7xl mx-auto">
                    <h1 className="text-xl font-bold">Inventory Manager</h1>
                    <div className="space-x-4">
                        <Link href="/" replace>Home</Link>
                        <Link href="/inventory-manager" replace>My Items</Link>
                        <Link href="/inventory-manager/add" replace>Add Item</Link>
                    </div>
                </div>
            </nav>
            </SessionProvider>
            <main className="max-w-7xl mx-auto">
                {children}
            </main>
        </div>
    )
}
