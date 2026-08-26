import gsap from "gsap";
import React, { useRef } from "react";

const Services = () => {
  const imageRefs = useRef([]);

  // Service items
  const services = [
    {
      heading: "FRONTEND DEVELOPMENT",
      description:
        "Building fast, responsive, modern websites with clean code and seamless user experiences.",
    },
    {
      heading: "CREATIVE PORTFOLIO",
      description:
        "Designing visually striking portfolios that showcase your work, personality, and creative digital presence.",
    },
    {
      heading: "INTERACTIVE ANIMATION",
      description:
        "Creating engaging animations and interactions that make websites feel dynamic, immersive, and memorable.",
    },
    {
      heading: "3D EXPERIENCE",
      description:
        "Developing immersive 3D web experiences using WebGL, Three.js, and interactive visual elements. ",
    },
  ];

  // Ensure the refs array matches the services array
  imageRefs.current = services.map(
    (_, i) => imageRefs.current[i] || React.createRef(),
  );

  return (
    <>
    <div className="h-fit w-full p-5 lg:mb-10">
        <h1 className="text-[12vw] lg:text-[8vw] font-[heading] font-light">SERVICES</h1>
    </div>
      <div className="lg:h-fit w-full flex flex-col justify-center relative z-20">
        {services.map((service, idx) => (
          <div
            key={idx}
            onMouseEnter={() =>
              gsap.to(imageRefs.current[idx].current, {
                clipPath: "inset(0% 0% 0% 0%)",
                duration: 0.8,
                ease: "power4.out",
              })
            }
            onMouseLeave={() =>
              gsap.to(imageRefs.current[idx].current, {
                clipPath: "inset(100% 0% 0% 0%)",
                duration: 0.8,
                ease: "power4.out",
              })
            }
            className="h-fit lg:h-[25vh]l w-full flex flex-col max-md:gap-3 lg:flex-row p-5 relative"
          >
            <div
              ref={imageRefs.current[idx]}
              className="absolute inset-0 overflow-hidden bg-amber-100"
              style={{ clipPath: "inset(100% 0 0 0)" }}
            >
              {/* <img
                src="https://i.pinimg.com/736x/e6/41/0b/e6410b54136be46bcefae0b0cfdaca50.jpg"
                className="h-full w-full object-cover"
                alt=""
              /> */}
            </div>
            <div className="h-full w-full lg:w-3/4 text-[6vw] lg:text-[3vw] font-light flex ">
              <h1 className="mix-blend-difference">{service.heading}</h1>
            </div>
            <div className="h-full w-full lg:w-1/4 max-md:text-xs font-medium flex items-center">
              <h1 className="mix-blend-difference font-light">{service.description}</h1>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Services;
