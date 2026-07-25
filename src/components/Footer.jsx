import React from 'react'

const Footer = () => {
  return (
    <div className='h-[120vh] bg-black text-white w-full relative z-10 p-5 overflow-hidden'>
      <div className='h-[40vh] w-full'>
        <h1 className='text-[5vw] font-extralight'>LET'S WORK TOGETHER</h1>
      </div>
      <div className='h-[80vh] w-full flex justify-between items-end pb-15'>
        <div className='text-5xl font-extralight flex flex-col gap-5'>
        <h1>HOME</h1>
        <h1>WORK</h1>
        <h1>SERVICES</h1>
        <h1>ABOUT ME</h1>
        </div>
        <div className='text-lg font-extralight flex flex-col gap-35'>
          <div>
          <h1>SHEKHAR24102004@GMAIL.COM</h1>
          <h1>QUICK CHAT</h1>
          <h1>TIME</h1>
          </div>
          <h1>BACK TO TOP</h1>
        </div>
        <div>
          <h1>INSTAGRAM</h1>
          <h1>LINKEDIN</h1>
        </div>
      </div>
    </div>
  )
}

export default Footer