import React from "react";

const Result = ({ livelink }) => {
  return (
    <div className="h-[60vh] max-md:pt-[20vh] lg:h-screen w-full flex flex-col lg:flex-row items-center p-4 md:p-8 lg:p-10 gap-10 lg:gap-0">
      <div className="h-auto lg:h-[40vh] w-full lg:w-1/2 flex items-start lg:items-center mb-6 lg:mb-0">
        <h1 className="text-2xl md:text-3xl font-bold">RESULTS</h1>
      </div>
      <div className="h-auto lg:h-[40vh] w-full lg:w-1/2 flex flex-col gap-8 md:gap-14 lg:gap-20 justify-center">
        <h1 className="text-xs sm:text-sm md:text-base">
          The site elevated Alaska's positioning in a competitive industry where
          first impressions define whether a brand gets the call. A director-led
          experience that communicates creative authority before a single reel
          plays.
        </h1>
        <div className="flex flex-col sm:flex-row gap-2">
          <button
            className="w-full sm:w-auto min-w-40 px-4 py-2 cursor-pointer bg-black text-white rounded-lg"
            onClick={() => window.open(livelink, "_blank")}
          >
            VIEW LIVE SITE
          </button>
          <button className="w-full sm:w-auto min-w-40 px-4 py-2 border bg-black text-white rounded-lg">
            START A PROJECT
          </button>
        </div>
      </div>
    </div>
  );
};

export default Result;
