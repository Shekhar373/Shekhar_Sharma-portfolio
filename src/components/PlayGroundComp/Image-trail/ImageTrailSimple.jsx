import { useEffect, useRef } from "react";
import gsap from "gsap";

const images = [
    "/projects/newhew-studio/image-1.png",
    "/projects/newhew-studio/image-2.png",
    "/projects/newhew-studio/image-3.png",
    "/projects/newhew-studio/image-4.png",
    "/projects/echo-studio/image-1.webp",
    "/projects/echo-studio/image-2.webp",
    "/projects/echo-studio/image-3.webp",
    "/projects/newhew-studio/image-4.png",
];

const ImageTrailSimple = () => {
  const containerRef = useRef(null);
  const imageIndex = useRef(0);

  const lastX = useRef(0);
  const lastY = useRef(0);

  const lastTime = useRef(0);
  const lastSpawnX = useRef(0);
  const lastSpawnY = useRef(0);

  useEffect(() => {
    const container = containerRef.current;

    const handleMove = (e) => {
      const now = performance.now();

      const x = e.clientX;
      const y = e.clientY;

      const dx = x - lastX.current;
      const dy = y - lastY.current;

      const distance = Math.sqrt(dx * dx + dy * dy);

      // Don't create images too close together
      if (distance < 80) return;

      // Calculate velocity
      const deltaTime = Math.max(now - lastTime.current, 1);
      const velocity = distance / deltaTime;

      // Direction-based rotation
      const angle = Math.atan2(dy, dx) * (180 / Math.PI);

      createImage(x, y, angle, velocity);

      lastX.current = x;
      lastY.current = y;

      lastTime.current = now;
      lastSpawnX.current = x;
      lastSpawnY.current = y;
    };

    const createImage = (x, y, angle, velocity) => {
      const img = document.createElement("img");

      img.src = images[imageIndex.current];

      imageIndex.current =
        (imageIndex.current + 1) % images.length;

      img.className = `
        absolute
        w-[180px]
        h-[230px]
        object-cover
        pointer-events-none
        -translate-x-1/2
        -translate-y-1/2
      `;

      container.appendChild(img);

      // Limit rotation
      const rotation = gsap.utils.clamp(-25, 25, angle * 0.25);

      // Velocity affects scale
      const scale = gsap.utils.clamp(
        0.8,
        1.25,
        0.8 + velocity * 0.15
      );

      gsap.set(img, {
        x,
        y,
        rotation,
        scale: 0.5,
        opacity: 0,
      });

      const tl = gsap.timeline({
        onComplete: () => {
          img.remove();
        },
      });

      tl.to(img, {
        scale,
        opacity: 1,
        duration: 0.2,
        ease: "power3.out",
      }).to(
        img,
        {
          scale: 0.7,
          opacity: 0,
          duration: 0.8,
          ease: "power2.inOut",
        },
        "+=0.15"
      );
    };

    window.addEventListener("mousemove", handleMove);

    return () => {
      window.removeEventListener("mousemove", handleMove);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 overflow-hidden pointer-events-none z-50"
    />
  );
};

export default ImageTrailSimple;