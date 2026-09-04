import React, {
  forwardRef,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
  useCallback,
  useEffect,
} from "react";
import gsap from "gsap";

// Responsive cube grid breakpoints
const breakpoints = [
  // Order matters: largest to smallest
  { min: 1024, cols: 10, rows: 5 }, // Desktop, 10x5
  { min: 768, cols: 7, rows: 5 },   // Tablet, 7x5
  { min: 480, cols: 5, rows: 7 },   // Large mobile, 5x7
  { min: 0,    cols: 3, rows: 8 },   // Smallest, 3x8
];

// Utility to get the grid config for a given width
const getGridConfig = (width) => {
  for (const bp of breakpoints) {
    if (width >= bp.min) {
      return { cols: bp.cols, rows: bp.rows };
    }
  }
  return { cols: 3, rows: 8 }; // fallback
};

const PageTransition = forwardRef((_, ref) => {
  const containerRef = useRef(null);
  const cubeRefs = useRef([]);
  const [grid, setGrid] = useState(() => getGridConfig(typeof window !== "undefined" ? window.innerWidth : 1024));

  // Responsive handler
  const updateGrid = useCallback(() => {
    setGrid(getGridConfig(window.innerWidth));
  }, []);

  // Listen for resize events
  useEffect(() => {
    updateGrid(); // Set on mount
    window.addEventListener("resize", updateGrid);
    return () => window.removeEventListener("resize", updateGrid);
  }, [updateGrid]);

  // Set initial gsap state any time the grid changes
  useLayoutEffect(() => {
    gsap.set(containerRef.current, {
      autoAlpha: 0,
    });

    gsap.set(cubeRefs.current, {
      opacity: 0,
      transformOrigin: "center",
    });
  }, [grid]);

  // Animate
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
            amount: Math.max(0.2, Math.min(0.5, (grid.cols * grid.rows) * 0.006)),
          },
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
            amount: Math.max(0.2, Math.min(0.5, (grid.cols * grid.rows) * 0.006)),
          },
          ease: "power3.inOut",
        });

        tl.set(containerRef.current, {
          autoAlpha: 0,
        });
      });
    },
  }), [grid]);

  // Cubes CSS grid style
  const gridStyle = {
    display: "grid",
    gridTemplateColumns: `repeat(${grid.cols}, 1fr)`,
    gridTemplateRows: `repeat(${grid.rows}, 1fr)`,
    width: "100vw",
    height: "100vh",
    pointerEvents: "none",
    position: "fixed",
    inset: 0,
    zIndex: 999,
  };

  return (
    <div
      ref={containerRef}
      style={gridStyle}
      aria-hidden="true"
    >
      {Array.from({ length: grid.cols * grid.rows }).map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            cubeRefs.current[i] = el;
          }}
          className="bg-amber-100"
          style={{
            width: "100%",
            height: "100%",
            minWidth: 0,
            minHeight: 0,
          }}
        />
      ))}
    </div>
  );
});

export default PageTransition;
