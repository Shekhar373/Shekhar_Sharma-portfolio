import React from "react";
import PlayGroundHero from "../components/PlayGroundComp/PlayGroundHero";
import GridBackground from "../r3f/GridBackground";
import { Canvas } from "@react-three/fiber";

const PlayGround = () => {
  return (
    <div className="relative ">
      <div className="h-screen w-full fixed top-0">
        <Canvas>
          <GridBackground />
        </Canvas>
      </div>
      <div className="relative z-10">
        <PlayGroundHero />
      </div>
    </div>
  );
};

export default PlayGround;
