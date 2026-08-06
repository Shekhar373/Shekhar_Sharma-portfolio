import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const LenisComponent = () => {
  const lenisRef = useRef(null);
  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    // Only create a single Lenis instance, store it in ref
    lenisRef.current = new Lenis({
      duration: 1.5,
    });

    lenisRef.current.on("scroll", ScrollTrigger.update);

    // Store ticker callback so we can remove it accurately
    const rafCallback = (time) => {
      lenisRef.current?.raf(time * 1000);
    };

    gsap.ticker.add(rafCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(rafCallback);
      lenisRef.current && lenisRef.current.destroy();
    };
  }, []);

  return null;
};

export default LenisComponent;