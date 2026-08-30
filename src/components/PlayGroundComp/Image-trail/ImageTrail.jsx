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

const ImageTrail = () => {
  const containerRef = useRef(null);

  const imageIndex = useRef(0);

  const mouse = useRef({
    x: 0,
    y: 0,
  });

  const smoothMouse = useRef({
    x: 0,
    y: 0,
  });

  const lastPosition = useRef({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const container = containerRef.current;

    let animationFrame;

    const handleMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    const createImage = (x, y, velocityX, velocityY) => {
      const img = document.createElement("img");

      img.src = images[imageIndex.current];

      imageIndex.current =
        (imageIndex.current + 1) % images.length;

      img.className = `
        absolute
        w-[20vw]
        h-[20vh]
        object-cover
        pointer-events-none
        will-change-transform
      `;

      container.appendChild(img);

      const velocity = Math.sqrt(
        velocityX * velocityX +
          velocityY * velocityY
      );

      // Movement direction
      const angle =
        Math.atan2(velocityY, velocityX) *
        (180 / Math.PI);

      // Rotation based on movement
      const rotation = gsap.utils.clamp(
        -20,
        20,
        angle * 0.15
      );

      // Faster movement = bigger image
      const scale = gsap.utils.clamp(
        0.8,
        1.3,
        0.9 + velocity * 0.04
      );

      // Stretch based on horizontal speed
      const skewX = gsap.utils.clamp(
        -15,
        15,
        velocityX * 0.8
      );

      gsap.set(img, {
        xPercent: -50,
        yPercent: -50,

        x,
        y,

        opacity: 0,

        scale: 0.5,

        rotation: 0,

        skewX: 0,
      });

      const tl = gsap.timeline({
        onComplete: () => {
          img.remove();
        },
      });

      tl.to(img, {
        opacity: 1,
        scale,
        rotation,
        skewX,

        duration: 0.35,

        ease: "power3.out",
      })

        .to(
          img,
          {
            x: `+=${velocityX * 8}`,
            y: `+=${velocityY * 8}`,

            scale: scale * 0.85,

            rotation: rotation * 1.5,

            skewX: 0,

            duration: 0.8,

            ease: "power2.out",
          },
          "+=0.05"
        )

        .to(
          img,
          {
            opacity: 0,

            scale: 0.7,

            duration: 0.5,

            ease: "power2.in",
          },
          "-=0.2"
        );
    };

    const animate = () => {
      // Smooth cursor movement
      smoothMouse.current.x = gsap.utils.interpolate(
        smoothMouse.current.x,
        mouse.current.x,
        0.15
      );

      smoothMouse.current.y = gsap.utils.interpolate(
        smoothMouse.current.y,
        mouse.current.y,
        0.15
      );

      const dx =
        smoothMouse.current.x -
        lastPosition.current.x;

      const dy =
        smoothMouse.current.y -
        lastPosition.current.y;

      const distance = Math.sqrt(
        dx * dx + dy * dy
      );

      // Spawn image only after cursor moves enough
      if (distance > 80) {
        createImage(
          smoothMouse.current.x,
          smoothMouse.current.y,
          dx,
          dy
        );

        lastPosition.current.x =
          smoothMouse.current.x;

        lastPosition.current.y =
          smoothMouse.current.y;
      }

      animationFrame =
        requestAnimationFrame(animate);
    };

    window.addEventListener(
      "mousemove",
      handleMouseMove
    );

    animate();

    return () => {
      window.removeEventListener(
        "mousemove",
        handleMouseMove
      );

      cancelAnimationFrame(animationFrame);

      // Remove any remaining images
      container.innerHTML = "";
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="
      bg-black
        fixed
        inset-0
        z-50
        overflow-hidden
        pointer-events-none
      "
    />
  );
};

export default ImageTrail;