import auth from '@/auth/auth'
import CoverVideo from '@/components/mapComponents/cover'
import HackathonsListing from '@/components/mapComponents/hackathons'
import MapComponent from '@/components/mapComponents/map'
import { redirect } from 'next/navigation'
import React from 'react'

const MapPage = () => {
  const decoded = auth()
  if(!decoded?.email || !decoded){
    return redirect("/login")
  }
  return (
    <div>
      <div className='flex mt-10'>
      <MapComponent />
      <CoverVideo />
      </div>
        <HackathonsListing />
    </div>
  )
}

export default MapPage