import { Inter } from 'next/font/google'
import './globals.css'
import Providers from '@/app/components/Providers'
import Navigation from './components/Navigation'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true
})

export const metadata = {
  title: 'Supra Coder',
  description: 'A simple CRUD application for managing inventory'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <Providers>
          <Navigation />
          {children}
        </Providers>
      </body>
    </html>
  )
}