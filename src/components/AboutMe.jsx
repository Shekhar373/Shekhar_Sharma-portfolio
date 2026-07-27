import React from "react";

const AboutMe = () => {

  return (
    <div className="h-[120vh] w-full  flex flex-col lg:flex-row text-[6vw] lg:text-[3vw] font-extralight p-5 relative z-10">
      <div className="h-[50vh] lg:h-full w-full lg:w-[60vw] flex items-center">
        <h1 className="uppercase lg:leading-[4vw] overflow-hidden">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor in,
          dignissimos, laudantium at natus voluptatibus libero molestias facere
          dicta quam culpa reiciendis. Reiciendis ipsa totam ea, suscipit
          accusantium delectus sint.
        </h1>
      </div>
      <div className="h-[50vh] lg:h-full w-full lg:w-[40vw]">
        <img className="h-full w-full" src="https://www.roshan-sahu.com/images/dp-home.jpg" alt="" />
      </div>
    </div>
  );
};

export default AboutMe;
