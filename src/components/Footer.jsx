import React from 'react'

const Footer = () => {
  return (
    <div className="lg:h-[120vh] bg-black text-white w-full relative z-10 p-5 overflow-hidden flex flex-col">
      {/* Title */}
      <div className="h-[15vh] md:h-[25vh] w-full flex items-center">
        <h1 className="text-[7vw] md:text-[4vw] font-extralight border-animate w-fit">
          LET'S WORK TOGETHER
        </h1>
      </div>

      {/* Grids: Stacking on mobile, flex on large screens */}
      <div className="flex flex-col md:flex-row w-full flex-1 md:justify-between items-start md:items-end gap-8 md:gap-0 ">
        {/* Left side: Navigation Links */}
        <div className="w-full md:w-auto flex flex-col gap-4 md:gap-5 text-3xl sm:text-4xl md:text-5xl font-extralight">
          <h1 className="opacity-65 hover:opacity-100 transition-all cursor-pointer">HOME</h1>
          <h1 className="opacity-65 hover:opacity-100 transition-all cursor-pointer">WORK</h1>
          <h1 className="opacity-65 hover:opacity-100 transition-all cursor-pointer">SERVICES</h1>
          <h1 className="opacity-65 hover:opacity-100 transition-all cursor-pointer">ABOUT ME</h1>
        </div>

        {/* Middle: Contact */}
        <div className="w-full md:w-auto flex flex-col gap-7 md:gap-35 text-base sm:text-lg md:text-xl font-extralight">
          <div className="flex flex-col gap-2">
            <h1 className="opacity-65 hover:opacity-100 transition-all cursor-pointer break-all">
              SHEKHAR24102004@GMAIL.COM
            </h1>
            <h1 className="opacity-65 hover:opacity-100 transition-all cursor-pointer">
              QUICK CHAT
            </h1>
            <h1 className="opacity-65">TIME</h1>
          </div>
          <h1 className="opacity-65 hover:opacity-100 transition-all cursor-pointer hidden md:block">
            BACK TO TOP
          </h1>
        </div>

        {/* Right: Socials */}
        <div className="w-full md:w-auto flex flex-row md:flex-col gap-5 md:gap-2 text-base sm:text-lg md:text-xl">
          <h1 className="opacity-65 hover:opacity-100 transition-all cursor-pointer">
            INSTAGRAM
          </h1>
          <h1 className="opacity-65 hover:opacity-100 transition-all cursor-pointer">
            LINKEDIN
          </h1>
          {/* Show BACK TO TOP on mobile at the end of socials */}
          <h1 className="opacity-65 hover:opacity-100 transition-all cursor-pointer md:hidden mt-4">
            BACK TO TOP
          </h1>
        </div>
      </div>
    </div>
  )
}

export default Footer