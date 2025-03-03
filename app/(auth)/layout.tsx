"use client"
import { SessionProvider } from 'next-auth/react'
import React from 'react'

interface AuthLayoutProps{
    children: React.ReactNode
}

const AuthLayout = ({children}:AuthLayoutProps) => {
  return (
    <SessionProvider>
    <div className='flex items-center justify-center mx-auto min-h-scree'>{children}</div>
    </SessionProvider>
  )
}

export default AuthLayout