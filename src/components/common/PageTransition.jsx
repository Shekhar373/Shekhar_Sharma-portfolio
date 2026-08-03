import React, { useRef, useEffect } from "react"
import gsap from "gsap"
import { useLocation } from "react-router-dom"


const PageTransition = (props) => {
  const panelsRef = useRef([])
  const pageRef = useRef(null)
  const NUM_PANELS = 7
  const currentPath = useLocation()

  useEffect(() => {
    const tl = gsap.timeline()

    tl.to(panelsRef.current, {
      clipPath: "inset(0% 0% 0% 0%)",
      stagger: {from:"end", amount:0.4},
      ease: "power3.inOut"
    })

    tl.to(panelsRef.current, {
      clipPath: "inset(0% 0% 100% 0%)",
      stagger: {from:"end", amount:0.4},
      ease: "power3.inOut"
    })

    gsap.from(pageRef.current,{
      opacity:0,
      delay:1
    })
  }, [currentPath])

  return (
    <div >
      <div className="fixed top-0 left-0 z-50 pointer-events-none w-full h-screen flex flex-col">
        {[...Array(NUM_PANELS)].map((_, i) => (
          <div
            key={i}
            ref={el => panelsRef.current[i] = el}
            className="page-transition-panel w-full"
            style={{
              height: `calc(${100 / NUM_PANELS}% + 1px)`,
              marginTop: "-1px",
              background: "#FEF3C6",
              clipPath: "inset(100% 0% 0% 0%)"
            }}
          />
        ))}
      </div>

      <div ref={pageRef}>
        {props.children}
      </div>
    </div>
  )
}

export default PageTransition