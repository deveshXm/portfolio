import React, { useEffect } from "react";
import FeaturedProject from "./SubComponents/FeaturedProject";
import Projects from "./SubComponents/Projects";
import AOS from "aos";
import "aos/dist/aos.css";

const Work = ({ scroll }) => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);
  return (
    <div
      className="h-fit bg-[#1a191d] text-white md:px-24 sm:px-15 py-10 "
      ref={scroll}
    >
      <h1
        className=" px-5 text-5xl md:text-7xl lg:text-8xl font-semibold"
        data-aos="fade-right"
      >
        My Work
      </h1>
      <div className="mt-10 space-y-12 mx-5">
        <div data-aos="fade-up">
          <h1 className="text-center text-5xl md:text-7xl lg:text-8xl font-semibold opacity-25">
            FEATURED
          </h1>
        </div>
        <div data-aos = "fade-up">
          <FeaturedProject />
        </div>
        <div data-aos = "fade-up">
          <Projects />
        </div>
      </div>
    </div>
  );
};

export default Work;
