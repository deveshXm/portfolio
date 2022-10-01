import React from "react";
import Data from "../../data.json";
import ProjectCard from "./ProjectCard";

const FeaturedProject = () => {
  const myloader = ({ src }) => {
    return src;
  };
  return (
    <div className="border-gray-200 border-2 border-opacity-20 p-10  space-y-10 xl:space-x-10 lg:flex ">
      <ProjectCard item={Data.Featured[0]} />
      <div className="flex items-center md:py-10">
        <div className="h-fit sm:ml-10 ">
          <div className="space-y-4 font-roboto text-sm xl:text-md text-center sm:text-left font-normal">
            <div dangerouslySetInnerHTML={{ __html: Data.Featured[0].about }} />
          </div>
          <div className="flex justify-center mt-10">
            <a href={Data.Featured[0].link}>
              <button className="py-2 px-4 bg-violet-600 rounded-md font-semibold hover:bg-white hover:text-violet-600 transition duration-300 ease-in-out">
                View Project
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProject;
