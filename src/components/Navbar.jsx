import React from "react";

const Navbar = () => {
  return (
    <div className="flex p-10 h-[10vh] w-screen justify-between  items-center text-xl">
      <div>
        <h3 className="text-2xl font-medium">SH</h3>
      </div>
      <div className="flex gap-5">
        <h3>Project</h3>
        <h3>Contact Us</h3>
      </div>
    </div>
  );
};

export default Navbar;
