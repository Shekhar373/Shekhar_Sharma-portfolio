import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const experiments = [
  {
    id: 1,
    src: "https://public-assets.content-platform.envatousercontent.com/426a4069-5ffa-4de9-9e74-c5f866913fec/41aaceb5-20dd-48ac-8685-ad2024e28a53/426a4069-5ffa-4de9-9e74-c5f866913fec/preview_540p_crf22_higher_quality.mp4",
    top: "5%",
    left: "8%",
    width: "clamp(220px, 32vw, 420px)",
    y: -250,
    x: 40,
    // rotate: -3,
  },
  {
    id: 2,
    src: "https://pub-8ca9b5847fbb4d4fb97b3497fb9521d5.r2.dev/videos_hero/001.mp4",
    top: "12%",
    left: "62%",
    width: "clamp(180px, 20vw, 320px)",
    y: 180,
    x: -30,
    // rotate: 4,
  },
  {
    id: 3,
    src: "https://pub-8ca9b5847fbb4d4fb97b3497fb9521d5.r2.dev/videos_hero/026.mp4",
    top: "28%",
    left: "28%",
    width: "clamp(250px, 34vw, 520px)",
    height:"50vh",
    y: -350,
    x: -50,
    // rotate: 2,
  },
  {
    id: 4,
    src: "https://public-assets.content-platform.envatousercontent.com/426a4069-5ffa-4de9-9e74-c5f866913fec/41aaceb5-20dd-48ac-8685-ad2024e28a53/426a4069-5ffa-4de9-9e74-c5f866913fec/preview_540p_crf22_higher_quality.mp4",
    top: "43%",
    left: "5%",
    width: "clamp(180px, 30vw, 340px)",
    height:"50vh",
    y: 250,
    x: 50,
    // rotate: -5,
  },
  {
    id: 5,
    src: "https://pub-8ca9b5847fbb4d4fb97b3497fb9521d5.r2.dev/video_OPTIM/099.mp4",
    top: "55%",
    left: "63%",
    width: "clamp(230px, 30vw, 480px)",
    y: -3
    // rotate: 3,
  },
  {
    id: 6,
    src: "https://pub-8ca9b5847fbb4d4fb97b3497fb9521d5.r2.dev/video_OPTIM/111.mp4",
    top: "62%",
    left: "15%",
    width: "clamp(200px, 25vw, 400px)",
    y: 200,
    x: 60,
    // rotate: -4,
  },
  {
    id: 7,
    src: "https://pub-8ca9b5847fbb4d4fb97b3497fb9521d5.r2.dev/video_OPTIM/112.mp4",
    top: "85%",
    left: "68%",
    width: "clamp(180px, 22vw, 350px)",
    y: -250,
    x: -30,
    // rotate: 5,
  },
];

export default function PlayGroundVideos() {
  const container = useRef(null);
  // Each video needs its own ref for clipPath animation
  const videoRefs = useRef([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Animate movement as before
      experiments.forEach((experiment) => {
        const element = `.experiment-${experiment.id}`;
        gsap.fromTo(
          element,
          {
            x: 0,
            y: 0,
            // rotation: 0,
          },
          {
            x: experiment.x,
            y: experiment.y,
            // rotation: experiment.rotate,
            ease: "none",
            scrollTrigger: {
              trigger: container.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          }
        );
      });

      // Now, animate all video clipPath reveals
      videoRefs.current.forEach((video, idx) => {
        if (video) {
          gsap.fromTo(
            video,
            {
              clipPath: "inset(0% 0% 100% 0%)"
            },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              ease: "power4.out",
              duration:1,
              scrollTrigger: {
                trigger: video,
                start: "top 65%",
                // markers:true,
            //     end: "bottom 30%",
            //     scrub: 1
              }
            }
          );
        }
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={container}
      className="relative min-h-[400vh] w-full overflow-hidden"
    >
      {/* Title
      <div className="sticky top-0 z-10 flex h-screen items-center justify-center pointer-events-none">
        <h1 className="text-[12vw] font-bold uppercase tracking-tighter text-white">
          Playground
        </h1>
      </div> */}

      {/* Videos */}
      {experiments.map((experiment, idx) => (
        <div
          key={experiment.id}
          className={`experiment-${experiment.id} absolute will-change-transform`}
          style={{
            top: experiment.top,
            left: experiment.left,
            width: experiment.width,
            height: experiment.height,
          }}
        >
          <div  className="group relative overflow-hidden">
            <video
              ref={el => videoRefs.current[idx] = el}
              src={experiment.src}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              style={{
                // Ensure initial state for non-JS users, but JS/GSAP will set clipPath
                clipPath: "inset(100% 0% 0% 0%)"
              }}
              className="aspect-video h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />

            {/* Experiment number */}
            {/* <div className="absolute left-3 top-3 text-xs text-white">
              0{experiment.id}
            </div> */}

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/20" />
          </div>
        </div>
      ))}
    </section>
  );
}