import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import PageTransition from "./PageTransition";

export default function Layout() {
  const transition = useRef();
  const page = useRef();

  const location = useLocation();

  useEffect(() => {
    async function animate() {
      await transition.current.play();

      gsap.fromTo(
        page.current,
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
        }
      );
    }

    animate();
  }, [location.pathname]);

  return (
    <>
      <PageTransition ref={transition} />

      <main ref={page}>
        <Outlet />
      </main>
    </>
  );
}