import React from 'react'
import ProjectCube from '../r3f/ProjectCube'
import { Canvas } from '@react-three/fiber'

const Projects = () => {
  return (
    <div className='h-fit w-full p-5'>
      <h1 className='text-[8vw] font-[heading]'>WORK</h1>
      <div className='h-screen w-full'>
          <Canvas>
              <ProjectCube />
          </Canvas>
      </div>
  </div>
  )
}

export default Projects