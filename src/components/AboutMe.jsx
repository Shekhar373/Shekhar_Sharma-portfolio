import React from "react";

const AboutMe = () => {
  // Text content to display
  const text =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor in, dignissimos, laudantium at natus voluptatibus libero molestias facere dicta quam culpa reiciendis. Reiciendis ipsa totam ea, suscipit accusantium delectus sint.";

  return (
    <div
      className="h-[120vh] w-full flex text-[3vw] font-extralight p-5 relative z-10"
    >
      <div className="h-full w-[60vw] flex items-center">
        <h1
          className="uppercase leading-[4vw] overflow-hidden"
          aria-label={text}
        >
          {text}
        </h1>
      </div>
      <div className="h-full w-[40vw]"></div>
    </div>
  );
};

export default AboutMe;
