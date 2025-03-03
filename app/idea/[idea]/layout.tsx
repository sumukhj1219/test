import React from 'react'

interface IdeaPageLayoutProps{
    children : React.ReactNode
}

const IdeaPageLayout = ({children}:IdeaPageLayoutProps) => {
  return (
    <div>
        {children}
    </div>
  )
}

export default IdeaPageLayout