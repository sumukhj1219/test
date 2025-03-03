"use client"
import { SessionProvider } from 'next-auth/react'
import React from 'react'

interface AuthLayoutProps{
    children: React.ReactNode
}

const DashboardLayout = ({children}:AuthLayoutProps) => {
  return (
    <SessionProvider>
    <div className='max-w-4xl mx-auto bg-primary'>{children}</div>
    </SessionProvider>
  )
}

export default DashboardLayout