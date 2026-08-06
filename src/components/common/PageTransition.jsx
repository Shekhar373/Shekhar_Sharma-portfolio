import { useRef, useImperativeHandle, forwardRef } from "react";
import gsap from "gsap";

const PageTransition = forwardRef((props, ref) => {
  const top = useRef();
  const bottom = useRef();

  useImperativeHandle(ref, () => ({
    play: () => {
      return new Promise((resolve) => {
        gsap.set([top.current, bottom.current], {
          yPercent: (i) => (i === 0 ? -100 : 100),
        });

        const tl = gsap.timeline({
          onComplete: resolve,
        });

        tl.to(top.current, {
          yPercent: 0,
          duration: 0.55,
          ease: "power4.inOut",
        })
          .to(
            bottom.current,
            {
              yPercent: 0,
              duration: 0.55,
              ease: "power4.inOut",
            },
            "<"
          )
          .to(
            [top.current, bottom.current],
            {
              yPercent: (i) => (i === 0 ? 100 : -100),
              duration: 0.55,
              ease: "power4.inOut",
              delay: 0.15,
            }
          );
      });
    },
  }));

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      <div
        ref={top}
        className="absolute top-0 left-0 h-1/2 w-full bg-black"
      />

      <div
        ref={bottom}
        className="absolute bottom-0 left-0 h-1/2 w-full bg-black"
      />
    </div>
  );
});

export default PageTransition;