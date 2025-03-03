import { BentoGridDemo } from '@/components/globalComponents/bento';
import { HeroScrollDemo } from '@/components/globalComponents/branding';
import { InfiniteMovingCardsDemo } from '@/components/globalComponents/cards';
import React from 'react'

const Page = () => {
  return (
    <>
    <div className="relative flex items-center justify-center mx-auto h-screen w-full ">
      <img 
        className="w-full h-full object-cover"
        src="./cover.jpg"
        alt="cover"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60" />

      <h1 
        className="absolute text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-center text-[#C084FC] 
        drop-shadow-[0_0_15px_#C084FC] px-6 sm:px-0 leading-tight"
      >
        The Ultimate Hub for Hackathons
      </h1>
    </div>
    <HeroScrollDemo />
    <BentoGridDemo />
    <InfiniteMovingCardsDemo />
    </>
    
  );
};

export default Page;
