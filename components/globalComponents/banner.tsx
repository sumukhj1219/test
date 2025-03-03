import React from "react";

const HackingBanner = () => {
  return (
    <div className="flex flex-col items-center mt-10 justify-center bg-primary md:text-7xl text-3xl font-handwritten">
      <div className="flex  items-center justify-center">
        <span className="text-orange-500 font-bold underline">STOP</span>
        <span className="text-purple-400 font-bold">SEARCHING</span>
      </div>
      <div className="flex">
        <span className="text-orange-500 font-bold">START</span>
        <span className="text-purple-400 font-bold underline">HACKING</span>
      </div>
    </div>
  );
};

export default HackingBanner;
