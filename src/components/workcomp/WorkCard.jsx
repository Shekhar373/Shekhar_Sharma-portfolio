import React, { useEffect } from "react";
import { work } from "../../data/project";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";

const WorkCard = () => {
  gsap.registerPlugin(ScrollTrigger);

  useGSAP(() => {
    gsap.utils.toArray(".workcard-main").forEach((section) => {
      const img = section.querySelector(".workcard-img");
      const clip = section.querySelector(".clip-wrapper");
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
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
      });
    });
  }, []);

  return (
    <div className="flex flex-col">
      {work.map((project) => (
        <Link to={`/work/${project.slug}`} key={project.slug}>
          <div className="h-[40vh] lg:h-screen w-full workcard-main overflow-hidden relative">
            <div
              className="absolute z-10 h-[35vh] w-[60vw] bg-black/35
                        backdrop-blur-lg border border-white/10 text-white
                        rounded-none left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-between px-5"
            >
              <div className="text-xs h-full flex flex-col items-end  pt-5">
                <h1>{project.title}</h1>
              </div>
              <img className="h-[30vh] w-[23vw] object-cover" src={project.cover} alt="" />
              <div className="text-xs h-full flex flex-col items-end justify-end pb-5">
                <h2>Web Design</h2>
                <h2>& Development</h2>
                <h2>Animation</h2>
              </div>
            </div>

            <div className="clip-wrapper h-full w-full">
              <img
                className="workcard-img h-screen w-full object-cover"
                src={project.cover}
                alt=""
              />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default WorkCard;
