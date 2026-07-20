import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import React, { useRef } from "react";

const Hero = () => {
  const textref = useRef()
  useGSAP(()=>{
  gsap.registerPlugin(ScrollTrigger)

    gsap.to(textref.current,{
      scale:0.2,
      scrollTrigger:{
        trigger:".hero",
        start:"top top",
        end:"bottom top",
        // pin:true,
        // markers:true,
        scrub:1
      }
    })
  })
  return (
    <div className="hero h-screen relative w-full flex justify-center items-end gap-5 text-center">
      <div className="font-[heading] text-amber-100">
        <h1 ref={textref} className="text-[11vw] leading-[9vw]">SHEKHAR SHARMA</h1>
      </div>
    </div>
  );
};

export default Hero;
