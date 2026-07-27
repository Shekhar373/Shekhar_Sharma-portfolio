import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import React, { useRef } from "react";

const About = () => {
  const leftref = useRef();
  const rightref = useRef();
  const sectionRef = useRef()
  gsap.registerPlugin(ScrollTrigger);

    // useGSAP(() => {


    //   gsap.to(leftref.current, {
    //     xPercent:20,
    //     duration: 0.7,
    //     ease: "power3.inOut",
    //     scrollTrigger: {
    //       trigger: sectionRef.current,
    //       start: "top 50%",
    //       end: "bottom 20%",
    //       markers:true,
    //       toggleActions: "play none none reverse"

    //     },
    //   });

    //   gsap.to(rightref.current, {
        
    //     duration: 0.7,
    //     ease: "power3.inOut",
    //     scrollTrigger: {
    //       trigger:sectionRef.current,
    //       start: "top 50%",
    //       end: "bottom 20%",
    //       toggleActions: "play none none reverse"
    //     },
    //   });
    // });
  return (
    <div ref={sectionRef} className="h-[40vh] lg:h-[80vh]  flex flex-col leading-[6vw] p-5 gap-3 justify-center font-extralight text-[7vw] text-amber-100">
      <span ref={leftref} className="left">
        ENGINEERING IMMERSIVE
      </span>
      <span ref={rightref} className="right text-right lg:pl-[40vw]">
        WEB EXPERIANCE
      </span>
    </div>
  );
};

export default About;
