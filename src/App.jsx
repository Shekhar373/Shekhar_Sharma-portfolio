import React from "react";
import { Canvas } from "@react-three/fiber";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Work from "./components/Work";
import Starfield from "./r3f/Starfield";
import TeckStack from "./components/TeckStack";

const App = () => {
  
  return (
    <div className="relative">
      <div className="fixed top-0">
        <Navbar />
      </div>
      <div className="h-screen w-full bg-black fixed top-0 -z-10">
        <Canvas camera={{ near: 3 }}>
          <Starfield />
        </Canvas>
      </div>

      <div>
        <Hero />
        <Work />
        <TeckStack />
      </div>
    </div>
  );
};

export default App;
