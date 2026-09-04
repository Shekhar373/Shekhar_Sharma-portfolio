import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import SplitText from "gsap/SplitText";

const AboutMe = () => {
  const textRef = useRef();
  const parentRef = useRef()

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger, SplitText);

    // Split the text into words using GSAP SplitText
    const split = new SplitText(textRef.current, { type: "chars, words" });

    // Animate the words
    gsap.from(split.chars, {
      opacity: 0.05,
      stagger:0.1,
      scrollTrigger: {
        trigger: parentRef.current,
        start: "top 60%",
        end: "top -10%",
        // pin:true,
        scrub:true,
        // markers: true,
      },
    });

    // Cleanup split text
    return () => {
      split.revert();
    };
  }, []);

  return (
    <div ref={parentRef} className="h-[80vh] lg:h-screen w-full flex justify-center items-center lg:my-[20vh] p-10">
      <h1
          ref={textRef}
          className="lg:leading-tight text-xl  text-center lg:text-5xl overflow-hidden lg:px-[10vw]"
        >
          I’m a frontend developer who enjoys turning creative ideas into interactive web experiences. I love experimenting with animation, 3D, and WebGL to build websites that feel different, engaging, and fun to explore.
        </h1>
    </div>
  );
};

export default AboutMe;
