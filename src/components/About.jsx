import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import React, { useRef } from "react";

const About = () => {
     const leftref = useRef()
     const rightref = useRef()

//   useGSAP(() => {
//     gsap.registerPlugin(ScrollTrigger);

//     const left = leftref.current
//     const right = rightref.current

//     const leftRect = left.getBoundingClientRect();
//     const rightRect = right.getBoundingClientRect();

//     gsap.to(left, {
//       x: -leftRect.left,
//       duration: 0.7,
//       ease: "power3.inOut",
//       scrollTrigger: {
//         trigger: left,
//         start: "top 50%",
//         end: "bottom 20%",
//         // markers:true,
//         toggleActions: "play none none reverse"
        
//       },
//     });

//     gsap.to(right, {
//       x: window.innerWidth - rightRect.right,
//       duration: 0.7,
//       ease: "power3.inOut",
//       scrollTrigger: {
//         trigger: right,
//         start: "top 50%",
//         end: "bottom 20%",
//         toggleActions: "play none none reverse"
//       },
//     });
//   });
  return (
    <div className="h-screen w-full px-5">
      <div className="h-1/2 flex flex-col leading-[6vw] gap-3 justify-center font-extralight text-[7vw] text-amber-100">
        <span ref={leftref} className="left">ENGINEERING IMMERSIVE</span>
        <span ref={rightref} className="right pl-[40vw]">WEB EXPERIANCE</span>
      </div>
    </div>
  );
};

export default About;
