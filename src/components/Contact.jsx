import { Canvas } from '@react-three/fiber'
import React from 'react'
import ImageShare from '../r3f/ImageSphare'

const Contact = () => {
  return (
    <div className='h-screen w-full flex flex-col justify-center items-center gap-5'>
      <h1 className='font-light tracking-widest'>LET'S TALK</h1>
      <h1 className='text-[8vw] leading-[8vw]'>GET IN TOUCH</h1>
      <h1 className='font-light tracking-wider'>Usually free for new ideas, weird experiment and occasional bug hunt.</h1>
      <button className='button-animation text-xl px-8 py-1 rounded-2xl'>Contact</button>
    </div>
  )
}

export default Contact