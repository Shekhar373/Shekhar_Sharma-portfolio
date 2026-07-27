import React from "react";
import ProjectCube from "../r3f/ProjectCube";
import { Canvas } from "@react-three/fiber";

const Projects = () => {
  return (
    <div className="h-fit w-full p-5 flex flex-col justify-center items-center">
      <h1 className="text-[12vw] lg:text-[8vw] font-[heading] pb-[10vh]">WORK</h1>
      <div className="h-[80vh] w-full lg:w-[40vw] cursor-pointer">
        <Canvas>
          <ProjectCube />
        </Canvas>
      </div>
    </div>
  );
};

export default Projects;
