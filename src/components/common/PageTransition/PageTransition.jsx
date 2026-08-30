import React, {
  forwardRef,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
} from "react";
import gsap from "gsap";

const PageTransition = forwardRef((_, ref) => {
  const containerRef = useRef(null);
  const cubeRefs = useRef([]);

  useLayoutEffect(() => {
    gsap.set(containerRef.current, {
      autoAlpha: 0,
    });

    gsap.set(cubeRefs.current, {
      opacity: 0,
      transformOrigin: "center",
    });
  }, []);

  useImperativeHandle(ref, () => ({
    cover: () => {
      return new Promise((resolve) => {
        const tl = gsap.timeline({
          onComplete: resolve,
        });

        tl.set(containerRef.current, {
          autoAlpha: 1,
        });

        tl.to(cubeRefs.current, {
          opacity: 1,
          stagger: {
            from: "random",
            amount: 0.3,
          },
          // duration: 0.45,
          ease: "power3.inOut",
        });
      });
    },

    reveal: () => {
      return new Promise((resolve) => {
        const tl = gsap.timeline({
          onComplete: resolve,
        });

        tl.to(cubeRefs.current, {
          opacity: 0,
          stagger: {
            from: "random",
            amount: 0.3,
          },
          // duration: 0.45,
          ease: "power3.inOut",
        });

        tl.set(containerRef.current, {
          autoAlpha: 0,
        });
      });
    },
  }));

  return (
    <div
      ref={containerRef}
      className="
        pointer-events-none
        fixed
        inset-0
        z-999
        grid
        grid-cols-10
        grid-rows-5
      "
    >
      {Array.from({ length: 50 }).map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            cubeRefs.current[i] = el;
          }}
          className="bg-amber-100"
        />
      ))}
    </div>
  );
});

export default PageTransition;
