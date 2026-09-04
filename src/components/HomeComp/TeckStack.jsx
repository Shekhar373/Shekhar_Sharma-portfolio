import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import React, { useRef } from "react";
import { div } from "three/tsl";

const TeckStack = () => {
  const pinRef = useRef();
  const parentRef = useRef();

  const stack = [
    {
      title: "React",
      type: "Frontend",
    },
    {
      title: "Next",
      type: "Framwork",
    },
    {
      title: "Typescript",
      type: "Language",
    },
    {
      title: "Javscript",
      type: "Language",
    },
    {
      title: "Tailwind",
      type: "Styling",
    },
    {
      title: "Gsap",
      type: "Animation",
    },
    {
      title: "Motion",
      type: "Animation",
    },
    {
      title: "Three.js",
      type: "3d Animation",
    },
    {
      title: "R3F",
      type: "3d Animation",
    },
    {
      title: "Vercel",
      type: "Hostiong",
    },
    {
      title: "Git-GitHub",
      type: "Version-Control",
    },
  ];

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      gsap.to(pinRef.current, {
        scrollTrigger: {
          trigger: pinRef.current,
          start: "top 5%",
          end: "bottom top",
          // markers: true,
          pin: true,
        },
      });
    });

    return () => mm.revert();
  });

  return (
    <div ref={parentRef} className="h-fit w-full flex flex-col lg:flex-row p-5 lg:p-10 mt-[20vh]">
      <div ref={pinRef} className="h-fit lg:h-[137vh] text-center w-full lg:w-1/2 pt-[5vh]">
        <div className="">
          <h1 className="text-[8vw] lg:text-[6vw] lg:leading-[6vw] tracking-tighter">
            Tech Stack
          </h1>
          <h1 className="text-sm font-light text-center lg:pr-[10vw]">
            These are the primary tools and technologies I use to build
            performant, accessible, and delightful web experiences.
          </h1>
        </div>
      </div>
      <div className="h-full w-full lg:w-1/2 lg:px-10">
        {stack.map((stack) => {
          return (
            <div className="h-[10vh] lg:h-[15vh] w-full border-b border-b-amber-100/30 flex items-center lg:px-5 justify-between">
              <h1 className="text-sm lg:text-xl font-medium">{stack.title}</h1>
              <h1 className="text-[2.5vw] lg:text-xs font-extralight tracking-wider text-white">
                {stack.type}
              </h1>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TeckStack;
