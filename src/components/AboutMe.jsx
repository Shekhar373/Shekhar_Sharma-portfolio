import React from "react";

const AboutMe = () => {
  return (
    <div className="h-[150vh] flex flex-col justify-center">
      <div className="h-screen w-full flex flex-col lg:flex-row  font-extralight relative z-10">
      <div className="h-[50vh] lg:h-full p-10 w-full lg:w-[60vw] flex items-center">
        <h1 className="uppercase lg:leading-[4vw] text-[6vw] lg:text-[3vw] overflow-hidden">
          Hi there, my name is Shekhar Sharma. I am a creative developer
          delivering high performance web solutions to businesses worldwide. My
          workflow is built on transparent communication and well defined
          requirements, ensuring a seamless process and exceptional results for
          every project.
        </h1>
      </div>
      <div className="h-[50vh] lg:h-full w-full lg:w-[40vw] pr-10">
        <img
          className="h-full lg:h-[90vh] w-full"
          src="https://www.roshan-sahu.com/images/dp-home.jpg"
          alt=""
        />
      </div>
    </div>
    </div>
  );
};

export default AboutMe;
