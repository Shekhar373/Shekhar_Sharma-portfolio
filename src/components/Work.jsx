import { Canvas } from '@react-three/fiber'
import React from 'react'
import WorkFlag from '../r3f/WorkFlag'

const Work = () => {
  return (
    <div className='h-fit w-full relative z-10'>
      <h1 className='text-[6vw] text-center p-10'>Project</h1>
        <div className='h-screen w-full'>
            <Canvas>
                <WorkFlag />
            </Canvas>
        </div>
    </div>
  )
}

export default Work