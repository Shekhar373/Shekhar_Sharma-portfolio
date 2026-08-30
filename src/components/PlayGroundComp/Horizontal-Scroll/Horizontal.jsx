import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const sections = [
  {
    title: "HELLO",
    text: "Welcome to my horizontal world.",
  },
  {
    title: "WORK",
    text: "A collection of creative experiments.",
  },
  {
    title: "PLAY",
    text: "Interactive experiences and experiments.",
  },
  {
    title: "ABOUT",
    text: "Creative developer exploring the web.",
  },
  {
    title: "END",
    text: "Thanks for scrolling.",
  },
];

const Horizontal = () => {
  const container = useRef(null);
  const track = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray(".panel");

      gsap.to(track.current, {
        xPercent: -100 * (panels.length - 1),
        ease: "none",

        scrollTrigger: {
          trigger: container.current,
          pin: true,
          scrub: 1,

          end: () =>
            `+=${window.innerWidth * (panels.length - 1)}`,
        },
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <main
      ref={container}
      className="relative h-screen overflow-hidden bg-black"
    >
      <div
        ref={track}
        className="flex h-screen w-max"
      >
        {sections.map((section, index) => (
          <section
            key={index}
            className="panel flex h-screen w-screen shrink-0 flex-col items-center justify-center border-r border-white/20 px-10 text-white"
          >
            <span className="mb-6 text-sm text-white/40">
              0{index + 1}
            </span>

            <h1 className="text-[15vw] font-bold leading-none">
              {section.title}
            </h1>

            <p className="mt-8 max-w-md text-center text-lg text-white/60">
              {section.text}
            </p>
          </section>
        ))}
      </div>
    </main>
  );
};

export default Horizontal;