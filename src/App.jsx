import React from "react";
import { Canvas } from "@react-three/fiber";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Work from "./components/Work";
import Starfield from "./r3f/Starfield";
import TeckStack from "./components/TeckStack";
import Projects from "./components/Projects";

const App = () => {
   
  return (
    <div className="relative bg-black">
      <div className="fixed top-0">
        <Navbar />
      </div>
      <div id="hero" className="h-screen w-full fixed top-0">
        <Canvas camera={{ near: 2 }}>
          <Starfield />
        </Canvas>
      </div>

      <div>
        <Hero />
        <Projects />
      </div>
    </div>
  );
};

export default App;
