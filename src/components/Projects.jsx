import React from 'react'
import ProjectCube from '../r3f/ProjectCube'
import { Canvas } from '@react-three/fiber'

const Projects = () => {
  return (
    <div className='h-screen w-full'>
        <div className='h-screen w-full flex absolute text-zinc-400'>
            <div className='h-full w-1/2 flex pr-[10vw] justify-center items-center'>
            <div className='flex flex-col gap-5'>
            <h1 className='text-4xl tracking-wider'>Skills</h1>
            <div className='text-2xl tracking-wider'>
                <h2>React js</h2>
                <h2>Tailwind css</h2>
                <h2>GSAP</h2>
                <h2>Lenis</h2>
            </div>
            </div>
            </div>
            <div className='h-full w-1/2'></div>
        </div>
      <div className='h-screen w-full'>
          <Canvas>
              <ProjectCube />
          </Canvas>
      </div>
  </div>
  )
}

export default Projects