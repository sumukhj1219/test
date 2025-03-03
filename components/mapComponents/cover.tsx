import React from 'react';

const CoverVideo = () => {
  return (
    <div className="w-1/2 h-[70vh] mx-auto my-6 hidden  md:block justify-center items-center">
      <video 
        src="./hackathon-finder-cover.mp4" 
        className="w-full h-full object-cover rounded-lg shadow-lg"
        autoPlay 
        loop 
        muted 
        playsInline 
      />
    </div>
  );
};

export default CoverVideo;
