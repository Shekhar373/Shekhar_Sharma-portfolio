import { Canvas } from '@react-three/fiber'
import React from 'react'
import Textr3f from './Textr3f'

const Text = () => {
  return (
    <div className='h-screen w-screen bg-black text-white'>
       <Canvas
        dpr={[1, 2]}
        gl={{
          antialias: true,
          preserveDrawingBuffer: true,
        }}
        camera={{
          fov: 55,
          near: 0.1,
          far: 200,
        }}
      >
        <Textr3f />
      </Canvas>
    </div>
  )
}

export default Text