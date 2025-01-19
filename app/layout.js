import { Inter } from 'next/font/google'
import Link from 'next/link'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Supra Coder CRUD App',
  description: 'A simple CRUD application for managing inventory',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="bg-slate-800 text-white p-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold">Supra Coder</h1>
            <div className="space-x-4">
              <Link href="/" replace>Home</Link>
              <Link href="/inventory" replace>Inventory</Link>
              <Link href="/signup" replace>Sign Up</Link>
              <Link href="/signin" replace>Sign In</Link>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  )
}
