"use server"
import auth from '@/auth/auth'
import { prisma } from '@/lib/db'
import React from 'react'

const MyIdeaComponent = async() => {
    const decoded = await auth()
    const email = decoded?.email
    const user = await prisma.user.findUnique({
       where:{
            email: email
       },
    })
    const ideas = await prisma.ideas.findMany({
        where:{
            userId: user?.id
        }
    })
    console.log( ideas)
    if(ideas === null){
        return <span>No ideas found</span>
    }
    return (
    <div className='max-w-7xl'>
        {
             ideas.map((idea)=>{
                <div >{idea.theme}</div>
            })
        }
    </div>
  )
}

export default MyIdeaComponent