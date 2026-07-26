import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import React from "react";

const Contact = () => {
  gsap.registerPlugin(ScrollTrigger, SplitText);

  useGSAP(() => {
    const headings = [
      {
        selector: ".talk-heading-1",
        start: "top 80%",
        end: "top 20%",
        scrub: 1,
      },
      {
        selector: ".talk-heading-2",
        start: "top 90%",
        end: "top 40%",
        scrub: 3,
      },
    ];

    headings.forEach(({ selector, start, end, scrub }) => {
      const split = SplitText.create(selector, {
        type: "chars",
        mask: "chars",
      });
      gsap.from(split.chars, {
        y: -170,
        stagger: {
          amount: 0.5,
          from: "center",
        },
        scrollTrigger: {
          trigger: selector,
          start,
          end,
          scrub,
        },
      });
    });
  });
  return (
    //     {/* <button className="relative group px-8 py-2 rounded-full text-white font-medium overflow-hidden">
    //     <span className="">Get In Touch</span>
    //   </button>  */}

    <div className="  h-[60vh] md:h-[120vh] w-full  flex flex-col justify-center items-center md:leading-20 lg:leading-28">
      <div className=" text-xl">
        <h1>LET'S START THE COVERSATION</h1>
      </div>
      <div className="talk-heading-1 text-[13vw] md:text-[8vw] tracking-tighter">
        <h1>GREAT DESIGN</h1>
      </div>
      <div className=" tracking-[2vw] text-xl">
        <h1>STARTS WITH</h1>
      </div>
      <div className="talk-heading-2 text-[13vw] md:text-[8vw] whitespace-nowrap tracking-tighter">
        <h1>GREATE COLLABERATION</h1>
      </div>
    </div>
  );
};

export default Contact;
