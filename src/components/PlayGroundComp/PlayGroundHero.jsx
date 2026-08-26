import React from "react";
import PlayGroundVideos from "./PlayGroundVideos";

const PlayGroundHero = () => {
  return (
    <div className="h-screen w-full text-center flex flex-col items-center justify-center px-10">
      <div className="flex flex-col gap-10">
        <h1 className="text-[#7d7d7a] text-sm tracking-widest font-light">
          A WORKBENCH FOR SIDE PROJECTS — EST. WHENEVER I GET BORED
        </h1>
        <h1 className="font-[heading]  text-[8vw] leading-[6vw]">
          THINGS I BUILD <br /> WHEN{" "}
          <span className="text-[8vw] leading-[4vw] font-[playground-heading]">I'M</span> NOT{" "}
          <br /> <span className="text-[#d75d16]">BUILDING WEBSITES</span>
        </h1>
        <h1 className="text-[#7d7d7a] text-sm tracking-widest font-light">
          Weekend tools, half-finished experiments, and the occasional thing{" "}
          <br /> that actually shipped. Mostly built between 11pm and whenever
          the <br /> coffee runs out.
        </h1>
      </div>
    </div>
  );
};

export default PlayGroundHero;
