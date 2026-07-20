import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import React, { useRef } from "react";

const About = () => {
     const leftref = useRef()
     const rightref = useRef()

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    const left = leftref.current
    const right = rightref.current

    const leftRect = left.getBoundingClientRect();
    const rightRect = right.getBoundingClientRect();

    gsap.to(left, {
      x: -leftRect.left,
      duration: 1.5,
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: left,
        start: "top 50%",
        end: "bottom 20%",
        // markers:true,
        toggleActions: "play none none reverse"
        
      },
    });

    gsap.to(right, {
      x: window.innerWidth - rightRect.right,
      duration: 1.5,
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: right,
        start: "top 50%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      },
    });
  });
  return (
    <div className="h-screen w-full px-5">
      <div className="font-[heading] h-1/2 flex gap-3 justify-center text-[5vw] text-amber-100">
        <span ref={leftref} className="left">IMMERSIVE</span>
        <span ref={rightref} className="right">EXPERIANCE</span>
      </div>
      <div className="w-1/2 h1/2 text-3xl font-extralight pr-20">
        <h1>Passionate about merging design and engineering, I craft smooth, interactive experiences with purpose. With a focus on motion, performance, and detail, I help bring digital products to life for forward-thinking brands around the world.</h1>
      </div>
    </div>
  );
};

export default About;
