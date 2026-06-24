import React from "react";

const Hero = () => {
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center gap-5 text-center">
      <h1 className="text-[6vw] leading-[6vw]">
        Hi, I'm Shekhar a <br /> <span className="bg-linear-to-t from-zinc-800 via-zinc-500 to-white bg-clip-text text-transparent">Creative Developer</span>
      </h1>
      <h1>
        I bring value to web development projects by merging <br /> texhnical
        expertise with Creative and Aesthetics
      </h1>
      <button className="relative group px-8 py-2 rounded-full text-white font-medium overflow-hidden">
        <span className="relative z-10">Get In Touch</span>
      </button>
      
    </div>
  );
};

export default Hero;
