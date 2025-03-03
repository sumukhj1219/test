"use server";
import { prisma } from "@/lib/db";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Hackathons = {
  id: string;
  hackathon_link: string;
  hackathon_name: string;
  website_link: string;
  social: string | null;
  theme: string;
  participants: string;
  date: string;
  lat: number | null;
  long: number | null;
};

const HackathonsListing = async () => {
  const hackathons: Hackathons[] = await prisma.hackathons.findMany();

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-black via-purple-950 to-black px-4 sm:px-6 md:px-8 py-10">
      <h2 className="text-3xl font-extrabold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-pink-400">
        🚀 Upcoming Hackathons
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {hackathons.length > 0 ? (
          hackathons.map((hackathon) => (
            <Card
              key={hackathon.id}
              className="relative bg-white/10 backdrop-blur-lg border border-purple-500 shadow-lg hover:scale-105 transition-transform duration-300 rounded-xl p-4"
            >
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-white">
                  {hackathon.hackathon_name}
                </CardTitle>
                <CardDescription className="text-sm text-purple-300">
                  {hackathon.theme}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-200">
                  📅 <span className="font-semibold">{hackathon.date}</span>
                </p>
                <p className="text-gray-200">
                  👥 Participants:{" "}
                  <span className="font-semibold">{hackathon.participants}</span>
                </p>
                {hackathon.social && (
                  <p className="text-purple-400">
                    🔗{" "}
                    <a
                      href={hackathon.social}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:text-purple-300"
                    >
                      Social
                    </a>
                  </p>
                )}
              </CardContent>
              <CardFooter className="flex flex-col sm:flex-row gap-3 sm:gap-2">
                <Button asChild className="w-full sm:w-auto bg-purple-600 hover:bg-purple-500 text-white font-bold px-4 py-2 rounded-lg">
                  <a href={hackathon.website_link} target="_blank" rel="noopener noreferrer">
                    🌍 Visit Website
                  </a>
                </Button>
                <Button variant="outline" asChild className="w-full sm:w-auto border-purple-500 text-purple-400 hover:text-purple-300 hover:border-purple-300 font-bold px-4 py-2 rounded-lg">
                  <a href={hackathon.hackathon_link} target="_blank" rel="noopener noreferrer">
                    🎟 Apply Now
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <p className="text-center text-gray-300 col-span-full">
            No hackathons available.
          </p>
        )}
      </div>
    </div>
  );
};

export default HackathonsListing;
