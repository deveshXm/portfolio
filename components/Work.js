import React from "react";
import FeaturedProject from "./SubComponents/FeaturedProject";
import Projects from "./SubComponents/Projects";

const Work = () => {
  return (
    <div className="h-fit bg-[#1a191d] text-white px-3 md:px-24 sm:px-15 py-10">
      <h1 className="font-semibold text-9xl text-left">My Work</h1>
      <div className="mt-10 space-y-12 mx-5">
      <h6 className=" text-6xl sm:text-8xl lg:text-[10rem] xl:text-[13rem] text-center font-semibold opacity-10">FEATURED</h6> 
        <FeaturedProject/>
        <Projects/>       
      </div>
    </div>
  );
};

export default Work;
