import React from "react";
import PlayGroundVideos from "./PlayGroundVideos";

const PlayGroundHero = () => {
  return (
    <div className="h-screen w-full text-center flex flex-col items-center justify-center px-10">
      <div className="flex flex-col gap-10">
        <h1 className="text-[#7d7d7a] text-xs  lg:text-sm tracking-widest font-light">
          A WORKBENCH FOR SIDE PROJECTS — EST. WHENEVER I GET BORED
        </h1>
        <h1 className="font-[heading] text-[10vw] lg:text-[8vw] leading-[8vw] lg:leading-[6vw]">
          THINGS I BUILD <br /> WHEN{" "}
          <span className="text-[7vw] leading-[4vw] font-[font]">I'M</span> NOT{" "}
          <br /> <span className="text-[#d75d16]">BUILDING WEBSITES</span>
        </h1>
        <h1 className="text-[#7d7d7a] text-xs lg:text-sm tracking-widest font-light px-[5vw] lg:px-[20vw]">
          Weekend tools, half-finished experiments, and the occasional thing{" "}
         that actually shipped. Mostly built between 11pm and whenever
          the coffee runs out.
        </h1>
      </div>
    </div>
  );
};

export default PlayGroundHero;
