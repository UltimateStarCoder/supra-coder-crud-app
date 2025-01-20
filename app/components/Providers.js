'use client'

import { SessionProvider } from 'next-auth/react'
import { ErrorBoundary } from 'react-error-boundary'

export default function Providers({ children }) {
  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <SessionProvider>{children}</SessionProvider>
    </ErrorBoundary>
  )
}