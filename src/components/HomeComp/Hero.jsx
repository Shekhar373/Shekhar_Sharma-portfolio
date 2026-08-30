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
      ease:"power1.inOut",
      scrollTrigger:{
        trigger:"#hero",
        start:"top top",
        end:"bottom top",
        pin:true,
        // markers:true,
        scrub:1
      }
    })
  },[])
  return (
    <div id="hero" className="h-screen w-full flex justify-center items-center lg:items-end gap-5 text-center">
      <div className="font-[heading] text-amber-100">
        <h1 ref={textref} className="text-[17vw] lg:text-[11vw] leading-[15vw] lg:leading-[9vw]">SHEKHAR SHARMA</h1>
      </div>
    </div>
  );
};

export default Hero;
