import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const images = [
  "https://framerusercontent.com/images/nUOFtL4GaXuxDUtYcldRriWIA.jpg?scale-down-to=2048&width=3680&height=2760",
  "https://framerusercontent.com/images/XeQ2h13KxLuhsc8dxrPvrCo1U.jpg?scale-down-to=2048&width=5000&height=3750",
  "https://framerusercontent.com/images/0sAomQtmBe6xnVwRWYeIDfgDs.jpg?scale-down-to=2048&width=3680&height=2760",
  "https://framerusercontent.com/images/7OONZVo3yVeY2VyTXZiNx9MXIkg.jpg?scale-down-to=2048&width=3680&height=2760",
  "https://framerusercontent.com/images/Ee6DB9MNUKlgtPB8nYOdEYZ8i1M.png?scale-down-to=2048&width=3955&height=2966.jpg",
  "https://i.pinimg.com/1200x/fc/d1/a8/fcd1a89545d70bfa91916bb1f92386b3.jpg",
];

const useResponsiveGallery = (trackRef, wrapperRef) => {
  useEffect(() => {
    const wrapper = wrapperRef.current;
    const track = trackRef.current;
    if (!wrapper || !track) return;

    let currentX = 0;
    let startX = 0;
    let isDragging = false;
    let velocity = 0;
    let lastX = 0;
    let singleWidth = track.scrollWidth / 2;

    // Recalculate on resize for responsiveness
    const recalcWidth = () => {
      if (track) {
        singleWidth = track.scrollWidth / 2;
        currentX = 0;
        gsap.set(track, { x: currentX });
      }
    };

    window.addEventListener("resize", recalcWidth);

    const wrap = () => {
      if (currentX <= -singleWidth) currentX += singleWidth;
      if (currentX >= 0) currentX -= singleWidth;

      gsap.set(track, {
        x: currentX,
      });
    };

    const onDown = (e) => {
      isDragging = true;
      startX =
        e.type === "touchstart"
          ? e.touches[0].clientX
          : e.clientX;
      lastX = startX;

      gsap.killTweensOf(track);
      wrapper.style.cursor = "grabbing";
    };

    const onMove = (e) => {
      if (!isDragging) return;
      const x =
        e.type === "touchmove"
          ? e.touches[0].clientX
          : e.clientX;
      const delta = x - startX;

      velocity = x - lastX;
      lastX = x;

      currentX += delta;
      startX = x;

      wrap();
    };

    const onUp = () => {
      if (!isDragging) return;
      isDragging = false;
      wrapper.style.cursor = "grab";

      gsap.to(
        {},
        {
          duration: 2,
          ease: "power3.out",
          onUpdate() {
            currentX += velocity;
            velocity *= 0.95;

            wrap();

            if (Math.abs(velocity) < 0.3) {
              this.kill();
            }
          },
        }
      );
    };

    wrapper.addEventListener("mousedown", onDown);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);

    wrapper.addEventListener("touchstart", onDown, { passive: false });
    window.addEventListener("touchmove", onMove, { passive: false });
    window.addEventListener("touchend", onUp);

    return () => {
      window.removeEventListener("resize", recalcWidth);
      wrapper.removeEventListener("mousedown", onDown);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);

      wrapper.removeEventListener("touchstart", onDown);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onUp);
    };
  }, [trackRef, wrapperRef]);
};

const ImageGallery = () => {
  const wrapperRef = useRef(null);
  const trackRef = useRef(null);

  useResponsiveGallery(trackRef, wrapperRef);

  // Responsive aspect for gallery height
  // Heights per breakpoint & widths per breakpoint
  // h-[40vw] on xs, h-[45vw] on sm, h-[55vh] on md, h-[60vh] on lg, h-[70vh] on xl
  // w-[90vw] on xs, w-[80vw] on sm+, w-[50vw] on lg, w-[40vw] on xl+
  // Use clamp to help, but use Tailwind for classnames

  return (
    <section className="w-full overflow-hidden py-8 sm:py-16 md:py-20">
      <div
        ref={wrapperRef}
        className="overflow-hidden cursor-grab select-none active:cursor-grabbing"
      >
        <div
          ref={trackRef}
          className="flex w-max gap-2 items-center"
        >
          {[...images, ...images].map((src, index) => (
            <div
              key={index}
              className="
                shrink-0 overflow-hidden rounded-lg
                h-[60vw]
                lg:h-[90vh] w-[80vw]
                transition-all duration-300
              "
            >
              <img
                src={src}
                alt=""
                draggable={false}
                className="h-full w-full object-cover pointer-events-none"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImageGallery;
