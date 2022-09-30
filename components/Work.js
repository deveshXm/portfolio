import React from "react";
import FeaturedProject from "./SubComponents/FeaturedProject";
import Projects from "./SubComponents/Projects";

const Work = ({scroll}) => {
  return (
    <div className="h-fit bg-[#1a191d] text-white md:px-24 sm:px-15 py-10 " ref ={scroll}>
      <h1 className=" px-5 text-5xl md:text-7xl lg:text-8xl font-semibold">
          My Work
        </h1>
      <div className="mt-10 space-y-12 mx-5">
      <h1 className="text-center text-5xl md:text-7xl lg:text-8xl font-semibold opacity-25">
          FEATURED
        </h1>
        <FeaturedProject/>
        <Projects/>       
      </div>
    </div>
  );
};

export default Work;
