import React from "react";
import { Link } from "react-router-dom";
import TransitionLink from "./PageTransition/TransitionLink";

const Navbar = () => {
  return (
    <div className="flex p-5 h-[10vh] fixed top-0 z-50 mix-blend-difference text-amber-100 w-screen justify-between  items-center">
      <div>
        <TransitionLink to="/" className="text-4xl font-[heading]">SS</TransitionLink>
      </div>
      <div className="flex gap-2 lg:gap-3 text-sm lg:text-sm">
        <TransitionLink to="/work">Projects</TransitionLink>
        <TransitionLink to="/playground">PlayGround</TransitionLink>
        <h3>Contact Us</h3>
      </div>
    </div>
  );
};

export default Navbar;
