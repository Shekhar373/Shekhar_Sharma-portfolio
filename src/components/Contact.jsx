import { Canvas } from '@react-three/fiber'
import React from 'react'
import ImageShare from '../r3f/ImageSphare'

const Contact = () => {
  return (
    <div className='h-screen w-full'>
      <div className='h-screen w-full '>
        <Canvas>
          <ImageShare />
        </Canvas>
      </div>
    </div>
  )
}

export default Contact