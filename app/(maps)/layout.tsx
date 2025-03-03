import React from 'react'

interface MapLayoutProps {
  children: React.ReactNode
}

const MapLayout = ({ children }: MapLayoutProps) => {
  return (
    <div className='bg-gradient-to-br from-black via-purple-950 to-black text-white px-8 pt-24 min-h-screen'>
      {children}
    </div>
  )
}

export default MapLayout;
