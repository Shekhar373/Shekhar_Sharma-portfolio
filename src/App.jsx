import React, { useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Starfield from "./r3f/Starfield";
import Projects from "./components/Projects";
import { ScrollSmoother, ScrollTrigger } from "gsap/all";
import gsap from "gsap";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

const App = () => {
  useEffect(() => {
    gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

    // Prevent double creation
    if (!ScrollSmoother.get()) {
      ScrollSmoother.create({
        smooth: 1.5,
        effects: true,
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
      });
    }

    // Optionally, cleanup could be handled if ScrollSmoother needs disposal on unmount
    // return () => {
    //   const smoother = ScrollSmoother.get();
    //   if (smoother) smoother.kill();
    // };
  }, []);

  return (
    <div className="relative">
      <div className="fixed top-0 z-10 w-full">
        <Navbar />
      </div>
      <div className="h-screen w-full fixed top-0 z-10">
        <Canvas camera={{ near: 2 }}>
          <Starfield />
        </Canvas>
      </div>
      <div id="smooth-wrapper" className="bg-[#000014] text-amber-100">
        <div id="smooth-content">
          <Hero />
          <About />
          <Projects />
          <Contact />
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default App;
