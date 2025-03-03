"use server";

import { prisma } from "@/lib/db";
import React from "react";

interface IdeaPageProps {
  params: {
    idea: string;
  };
}

const IdeaPage = async ({ params }: IdeaPageProps) => {
  const { idea } = params;

  const ideaDetails = await prisma.ideas.findUnique({
    where: {
      id: idea,
    },
  });

  if (!ideaDetails) {
    return (
      <div className="flex min-h-screen items-center justify-center text-red-500 text-xl">
        Idea not found!
      </div>
    );
  }

  const descriptionMatch = ideaDetails.response.match(/\*\*1\. Description:\*\*\n([\s\S]+?)\*\*2\./)?.[1]?.trim();
  const implementationMatch = ideaDetails.response.match(/\*\*2\. Implementation:\*\*\n([\s\S]+?)\*\*3\./)?.[1]?.trim();
  const uniquenessMatch = ideaDetails.response.match(/\*\*3\. Uniqueness:\*\*\n([\s\S]+)/)?.[1]?.trim();

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold text-center text-purple-500 mb-8">
        {ideaDetails.title}
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="flex flex-col gap-8">
          <div className="bg-neutral-900 p-6 rounded-xl shadow-lg border border-neutral-700 h-[300px] overflow-y-auto scrollbar-thin">
            <h2 className="text-2xl font-semibold text-purple-400 mb-4">Description</h2>
            <p className="text-neutral-300">{descriptionMatch}</p>
          </div>

          <div className="bg-neutral-900 p-6 rounded-xl shadow-lg border border-neutral-700 h-[300px] overflow-y-auto scrollbar-thin">
            <h2 className="text-2xl font-semibold text-purple-400 mb-4">Uniqueness</h2>
            <p className="text-neutral-300">{uniquenessMatch}</p>
          </div>
        </div>

        <div className="bg-neutral-900 p-6 rounded-xl shadow-lg border border-neutral-700 lg:col-span-2 h-[630px] overflow-y-auto scrollbar-thin">
          <h2 className="text-2xl font-semibold text-purple-400 mb-4">Implementation</h2>
          <p className="text-neutral-300 whitespace-pre-line">{implementationMatch}</p>
        </div>
      </div>
    </div>
  );
};

export default IdeaPage;
