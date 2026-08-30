import React from "react";
import { Canvas } from "@react-three/fiber";
import Hero from "../components/HomeComp/Hero";
import Navbar from "../components/common/Navbar";
import Starfield from "../r3f/Starfield";
import Projects from "../components/HomeComp/Projects";
import About from "../components/HomeComp/About";
import Contact from "../components/HomeComp/Contact";
import Footer from "../components/HomeComp/Footer";
import AboutMe from "../components/HomeComp/AboutMe";
import Services from "../components/HomeComp/Services";
import TeckStack from "../components/HomeComp/TeckStack";

const Home = () => {
  return (
    <div className="bg-[#000014] overflow-x-hidden">
        
      <div id="stars" className="h-screen w-full fixed top-0 z-0">
        <Canvas camera={{ near: 2 }}>
          <Starfield />
        </Canvas>
      </div>
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <Hero />
          {/* <About /> */}
          <AboutMe />
          <Projects />
          <Services />
          <TeckStack />
          <Contact />
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Home;
