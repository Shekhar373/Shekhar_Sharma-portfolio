import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { Link } from "react-router-dom";
import TransitionLink from "../common/PageTransition/TransitionLink";

const Projects = () => {
  const outerRef = useRef(null);
  const containerRef = useRef(null);

  gsap.registerPlugin(ScrollTrigger);

  const pinProject = [
    {
      id: 1,
      title: "Project 1",
      slug: "new-hew-studio",
      name: "New Hew Studio",
      image: "/projects/newhew-studio/new-cover.webp",
    },
    {
      id: 2,
      title: "Project 2",
      slug: "echo-studio",
      name: "Echo Studio",
      image: "/projects/echo-studio/cover-image.png",
    },
  ];

  // Store refs for each project image and view-text
  const imgRefs = useRef([]);
  const viewTextRefs = useRef([]);

  // Clean up arrays on rerender
  imgRefs.current = [];
  viewTextRefs.current = [];
  const setImgRef = (ref, idx) => {
    imgRefs.current[idx] = ref;
  };
  const setViewTextRef = (ref, idx) => {
    viewTextRefs.current[idx] = ref;
  };

  useLayoutEffect(() => {
    let ctx;
    const outer = outerRef.current;
    const inner = containerRef.current;

    if (outer && inner) {
      ctx = gsap.context(() => {
        gsap.to(inner, {
          x: () => `-${inner.scrollWidth - outer.offsetWidth}px`,
          ease: "none",
          scrollTrigger: {
            trigger: outer,
            start: "top top",
            end: () => `+=${inner.scrollWidth - outer.offsetWidth}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            // markers: true,
            invalidateOnRefresh: true,
          },
        });

        ScrollTrigger.refresh();
      }, outer);
    }

    // Animate view-text following cursor on image hover
    imgRefs.current.forEach((img, idx) => {
      const viewText = viewTextRefs.current[idx];

      if (img && viewText) {
        const handleMouseMove = (e) => {
          const rect = img.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;

          gsap.to(viewText, {
            x: x,
            y: y,
            ease: "expo.out",
            duration: 1,
          });
        };

        const handleMouseEnter = () => {
          gsap.set(viewText, { opacity: 1, pointerEvents: "none" });
        };

        const handleMouseLeave = () => {
          gsap.to(viewText, { opacity: 0, duration: 0.3, ease: "power1.in" });
        };

        img.addEventListener("mousemove", handleMouseMove);
        img.addEventListener("mouseenter", handleMouseEnter);
        img.addEventListener("mouseleave", handleMouseLeave);

        // Initialize view-text hidden
        gsap.set(viewText, { opacity: 0 });

        // Cleanup function for this img/viewText pair
        return () => {
          img.removeEventListener("mousemove", handleMouseMove);
          img.removeEventListener("mouseenter", handleMouseEnter);
          img.removeEventListener("mouseleave", handleMouseLeave);
        };
      }
    });

    // GSAP context clean
    return () => {
      if (ctx) ctx.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div
      ref={outerRef}
      className="relative w-full h-screen overflow-hidden text-white "
      style={{ position: "relative" }}
    >
      <div ref={containerRef} className="flex flex-row h-screen w-[250vw]">
        <div className="h-full w-[50vw]  flex flex-col gap-10 justify-center items-end ">
         <h1 className="text-[5vw] tracking-tighter leading-[5vw]">
         Selected Work <br /> & Exploration
         </h1>
         <h1 className="text-xl text-white/50">View All Projects</h1>

        </div>
        {pinProject.map((project, idx) => (
          <div
            key={project.id}
            className="w-screen h-screen relative flex items-center justify-center shrink-0"
          >
            {/* <div className="absolute z-20 flex flex-col gap-5 lg:gap-10 top-[15vh] lg:top-[24vh] left-[18vw] mix-blend-difference pointer-events-none select-none">
              <h1 className="text-md lg:text-2xl text-white ">{project.title}</h1>
              <h1 className="text-[15vw] lg:text-[7.5vw] w-[20vw] leading-[13vw] lg:leading-[7vw] text-white">
                {project.name}
              </h1>
            </div> */}
            <TransitionLink to={`/work/${project.slug}`} key={project.slug} className="relative z-10">
              <img
                ref={(ref) => setImgRef(ref, idx)}
                src={project.image}
                alt={project.title}
                className="w-[70vw] h-[20vh] lg:w-[40vw] lg:h-[50vh] rounded-lg shadow-lg object-cover"
                draggable={false}
                style={{ userSelect: "none" }}
              />
              {/* The view-text will be positioned absolutely over the Link */}
              <div className="h-[10vh] lg:h-[15vh] w-[70vw] lg:w-[40vw] p-2 flex flex-col justify-between">
                <h1 className="text-4xl">{project.name}</h1>
                <div className=" flex">
                  <h1 className="w-[60%] text-xs">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse, vero.</h1>
                  <h1 className="w-[40%] text-end">Explore Project</h1>
                </div>
              </div>
              <h5
                ref={(ref) => setViewTextRef(ref, idx)}
                className="view-text text-[0.5vw] border px-2 py-1 rounded-2xl bg-white absolute text-black pointer-events-none transition-opacity duration-150 z-20"
                style={{
                  top: 0,
                  left: 0,
                  transform: "translate(-50%, -50%)",
                  opacity: 0,
                  pointerEvents: "none",
                }}
              >
                VIEW PROJECT
              </h5>
            </TransitionLink>
          </div>
        ))}

        {/* <div className="w-screen h-screen flex items-center justify-center flex-shrink-0 bg-black">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white opacity-20 text-center px-4">
            More Projects Coming Soon
          </h1>
        </div> */}
   
      </div>
    </div>
  );
};

export default Projects;