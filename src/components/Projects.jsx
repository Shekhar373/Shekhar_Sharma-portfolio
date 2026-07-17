import React from 'react'
import ProjectCube from '../r3f/ProjectCube'
import { Canvas } from '@react-three/fiber'

const Projects = () => {
  return (
    <div className='h-screen w-full bg-black relative z-10'>
      <div className='h-screen w-full'>
          <Canvas>
              <ProjectCube />
          </Canvas>
      </div>
  </div>
  )
}

export default Projects