"use server"

import auth from '@/auth/auth'
import { prisma } from '@/lib/db'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'

const MyIdeaComponent = async () => {
    const decoded = await auth()
            // @ts-expect-error
    if (!decoded || !decoded.email) {
        return redirect("/login")
    }

    const user = await prisma.user.findUnique({
        where: {
            // @ts-expect-error
            email: decoded.email,
        },
    })

    if (!user) {
        return redirect("/login")
    }

    const ideas = await prisma.ideas.findMany({
        where: {
            userId: user.id,
        },
    })

    if (!ideas || ideas.length === 0) {
        return <div className="text-center text-gray-300 mt-10">No ideas found</div>
    }

    return (
        <div className="md:max-w-5xl max-w-4xl lg:max-w-7xl mx-auto mt-20 p-6 shadow-purple-500 shadow-lg rounded-xl">
            <h2 className="text-2xl font-bold text-white text-center mb-6">My Ideas</h2>
            <div className="space-y-4">
                {ideas.map((idea) => (
                    <Link 
                        key={idea.id} 
                        href={`/idea/${idea.id}`} 
                        className="block p-4 bg-purple-800 hover:bg-purple-700 transition rounded-lg shadow-md"
                    >
                        <h3 className="text-xl font-semibold text-white">{idea.title}</h3>
                        <p className="text-sm text-purple-300">{idea.theme}</p>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default MyIdeaComponent
