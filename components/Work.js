import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import ProjectCard from "./SubComponents/ProjectCard";
import Heading from "./SubComponents/Heading";

import Data from "../data.json";

const Work = ({ scroll }) => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);
  return (
    <div className="bg-[url('/images/work-bg.jpg')]  bg-cover bg-no-repeat min-h-screen  h-fit text-white md:px-24 sm:px-15 py-10 " ref={scroll}>
      <div
        className=" px-5 text-5xl md:text-7xl lg:text-8xl font-semibold"
        data-aos="fade-right"
      >
        <Heading title={"My Work"} />
      </div>
      <div className="mt-10 space-y-12 mx-5">
        {Data.Projects.map((item, idx) => (
          <ProjectCard item={item} key={idx} />
        ))}
      </div>
    </div>
  );
};

export default Work;
