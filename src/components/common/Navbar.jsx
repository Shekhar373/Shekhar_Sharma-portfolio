import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex p-5 h-[10vh] mix-blend-difference text-amber-100 w-screen justify-between  items-center">
      <div>
        <Link to="/" className="text-4xl font-[heading]">SH</Link>
      </div>
      <div className="flex gap-2 lg:gap-5 text-sm lg:text-xl">
        <Link to="/work">Projects</Link>
        <Link to="/playground">PlayGround</Link>
        <h3>Contact Us</h3>
      </div>
    </div>
  );
};

export default Navbar;
