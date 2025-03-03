import auth from '@/auth/auth'
import IdeaGenerator from '@/components/dashboardComponent/ideaComponent'
import { redirect } from 'next/navigation'
import React from 'react'

const DashboardPage = async () => {  
  const decoded = await auth() 
  if (!decoded || !decoded.email) {
    return redirect("/login")
  }

  return (
    <div>
        <IdeaGenerator />
    </div>
  )
}

export default DashboardPage
