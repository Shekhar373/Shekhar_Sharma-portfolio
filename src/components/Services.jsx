import gsap from "gsap";
import React, { useRef } from "react";

const Services = () => {
  const imageRefs = useRef([]);

  // Service items
  const services = [
    {
      heading: "FRONTEND DEVELOPMENT",
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Soluta quos quibusdam minus beatae distinctio incidunt officiis sit id mollitia vitae.",
    },
    {
      heading: "CREATIVE PORTFOLIO",
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Soluta quos quibusdam minus beatae distinctio incidunt officiis sit id mollitia vitae.",
    },
    {
      heading: "INTERACTIVE ANIMATION",
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Soluta quos quibusdam minus beatae distinctio incidunt officiis sit id mollitia vitae.",
    },
    {
      heading: "3D EXPERIENCE",
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Soluta quos quibusdam minus beatae distinctio incidunt officiis sit id mollitia vitae.",
    },
  ];

  // Ensure the refs array matches the services array
  imageRefs.current = services.map(
    (_, i) => imageRefs.current[i] || React.createRef(),
  );

  return (
    <>
    <div className="h-fit w-full p-5 ">
        <h1 className="text-[8vw] font-[heading] font-light">SERVICES</h1>
    </div>
      <div className="h-[120vh] w-full flex flex-col justify-center relative z-20">
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
            className="h-[25vh]l w-full flex p-5 relative"
          >
            <div
              ref={imageRefs.current[idx]}
              className="absolute inset-0 overflow-hidden"
              style={{ clipPath: "inset(100% 0 0 0)" }}
            >
              {/* <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQR-IkmqKTAmHeqXqOoeV3ztlrnjXL2strt4Mm2UYp1AQ&s=10" className="h-full w-full object-cover" alt="" /> */}
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWKyXCw3pd94z7r9e4LmZP4Jbw6QapEw5tFKEVgu5Lyw&s=10"
                className="h-full w-full object-cover"
                alt=""
              />
            </div>
            <div className="h-full w-3/4 text-[3vw] font-light flex ">
              <h1 className="mix-blend-difference">{service.heading}</h1>
            </div>
            <div className="h-full w-1/4 font-medium flex items-center">
              <h1 className="mix-blend-difference">{service.description}</h1>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Services;
