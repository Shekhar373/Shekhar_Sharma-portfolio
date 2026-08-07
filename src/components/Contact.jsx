import { Canvas } from '@react-three/fiber'
import React from 'react'
import ImageShare from '../r3f/ImageSphare'

const Contact = () => {
  return (
    <div className='h-screen w-full flex flex-col justify-center items-center'>
      <h1 className='text-[8vw]'>GET IN TOUCH</h1>
      <button className='button-animation text-xl px-8 py-1 rounded-2xl'>Contact</button>
    </div>
  )
}

export default Contact