import React from "react";
import ProjectCube from "../r3f/ProjectCube";
import { Canvas } from "@react-three/fiber";
import { Link } from "react-router-dom";

const Projects = () => {
  return (
    <div className="h-fit w-full flex flex-col justify-center items-center">
      <h1 className="text-[12vw] lg:text-[8vw] font-[heading] pb-[10vh]">
        WORK
      </h1>
      <Link to="/work">
        <div className="h-[80vh] w-full lg:w-[40vw] flex cursor-pointer">
          <Canvas>
            <ProjectCube />
          </Canvas>
        </div>
      </Link>
    </div>
  );
};

export default Projects;
