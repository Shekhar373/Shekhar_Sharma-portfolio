import React from "react";
import { work } from "../../data/project";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import TransitionLink from "../common/PageTransition/TransitionLink";

const WorkCard = () => {
  gsap.registerPlugin(ScrollTrigger);

  useGSAP(() => {
    gsap.utils.toArray(".workcard-main").forEach((section) => {
      const img = section.querySelector(".workcard-img");
      const mm = gsap.matchMedia();

      // Desktop animation
      mm.add("(min-width: 1024px)", () => {
        if (img) {
          gsap.fromTo(
            img,
            { scale: 1, yPercent: -30 },
            {
              scale: 1,
              yPercent: 30,
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            },
          );
        }
      });

      // Mobile animation (subtle, turn off or use different params if desired)
      mm.add("(max-width: 1023px)", () => {
        if (img) {
          gsap.fromTo(
            img,
            { scale: 1, yPercent: -10 },
            {
              scale: 1,
              yPercent: 10,
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            },
          );
        }
      });
    });
  }, []);

  return (
    <div className="flex flex-col gap-8">
      {work.map((project) => (
        <TransitionLink to={`/work/${project.slug}`} key={project.slug}>
          <div className={`
              workcard-main
              relative
              overflow-hidden
              w-full
              min-h-[300px]
              h-[45vh]
              sm:h-[36vh]
              md:h-[40vh]
              lg:h-screen
              rounded-lg
              transition-shadow
              duration-300
              shadow-lg
              cursor-pointer
              mb-8
          `}>
            {/* Overlay card */}
            <div className={`
              absolute z-10
              flex flex-col
              sm:flex-row
              items-center sm:items-stretch
              justify-between
              px-3 sm:px-5
              py-3
              gap-3
              bg-black/40
              backdrop-blur-lg
              border border-white/10
              text-white
              left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
              rounded-lg
              w-[85vw] sm:w-[85vw] md:w-[70vw] lg:w-[60vw] 2xl:w-[50vw]
              h-auto sm:h-[80%] lg:h-[35vh]
              max-w-[95vw]
              shadow-md
              `}
              style={{
                minHeight: "160px",
                maxWidth: "98vw",
              }}
            >
              {/* Title */}
              <div className="flex-1 flex flex-col justify-center items-center sm:items-start text-xs sm:text-base font-semibold pt-1 sm:pt-5">
                <h1 className="text-center sm:text-left text-[4vw] sm:text-xl md:text-2xl lg:text-3xl tracking-tight leading-none mb-1 max-w-[80vw] sm:max-w-none">{project.title}</h1>
              </div>
              {/* Project Thumb */}
              <div className="flex justify-center items-center flex-shrink-0">
                <img
                  className="workcard-thumb h-[18vw] w-[26vw] sm:h-[20vh] sm:w-[17vw] md:h-[25vh] md:w-[20vw] lg:h-[30vh] lg:w-[23vw] rounded-md object-cover shadow-md"
                  src={project.cover}
                  alt={project.title + " cover"}
                />
              </div>
              {/* Services */}
              <div className="flex-1 flex flex-col justify-end items-center sm:items-end text-[2.8vw] sm:text-xs md:text-sm font-light pb-1 sm:pb-5">
                <h2 className="whitespace-nowrap">Web Design</h2>
                <h2 className="whitespace-nowrap">& Development</h2>
                <h2 className="whitespace-nowrap">Animation</h2>
              </div>
            </div>
            {/* Main background image */}
            <div className="clip-wrapper h-full w-full">
              <img
                className="workcard-img h-full w-full object-cover object-center"
                src={project.cover}
                alt={project.title + " background"}
                draggable={false}
                style={{
                  userSelect: "none",
                }}
              />
            </div>
          </div>
        </TransitionLink>
      ))}
    </div>
  );
};

export default WorkCard;
