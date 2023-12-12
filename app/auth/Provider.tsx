'use client'

import { SessionProvider } from 'next-auth/react';

interface LayoutChildren {
    children: React.ReactNode
}

const AuthProvider = ({children}: LayoutChildren) => {
  return (
    <SessionProvider>{children}</SessionProvider>
  )
}
export default AuthProvider
