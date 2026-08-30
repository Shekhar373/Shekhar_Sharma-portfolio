import React from "react";
import GridBackground from "../r3f/GridBackground";
import { Canvas } from "@react-three/fiber";
import PlayGroundVideos from "../components/PlayGroundComp/PlayGroundHero/PlayGroundVideos";
import Footer from "../components/HomeComp/Footer";
import PlayGroundHero from "../components/PlayGroundComp/PlayGroundHero/PlayGroundHero";

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
      <div>
      <PlayGroundVideos />
      </div>
      <Footer />
    </div>
  );
};

export default PlayGround;
