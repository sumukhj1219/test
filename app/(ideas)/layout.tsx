import React from 'react'

interface LayoutProps{
    children:React.ReactNode
}

const Layout = ({children}:LayoutProps) => {
  return (
    <div className='max-w-7xl flex items-center justify-center mx-auto min-h-screen'>
        {children}
    </div>
  )
}

export default Layout