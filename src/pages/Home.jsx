import React from "react";
import { Canvas } from "@react-three/fiber";
import Hero from "../components/Hero";
import Navbar from "../components/common/Navbar";
import Starfield from "../r3f/Starfield";
import Projects from "../components/Projects";
import About from "../components/About";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import AboutMe from "../components/AboutMe";
import Services from "../components/Services";

const Home = () => {
  return (
    <div className="bg-[#000014] text-amber-100 overflow-x-hidden">
        
      <div className="h-screen w-full fixed top-0 z-0">
        <Canvas camera={{ near: 2 }}>
          <Starfield />
        </Canvas>
      </div>
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <Hero />
          <About />
          <Projects />
          <AboutMe />
          <Services />
          <Contact />
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Home;
