import React from "react";
import Data from "../../data.json";
import ProjectCard from "./ProjectCard";

const Projects = () => {
  const myloader = ({ src }) => {
    return src;
  };
  return (
    <div className=" rounded-lg lg:flex space-y-10 lg:space-y-0 lg:space-x-10 mx-5 lg:mx-0">
      {Data.Projects.map((item) => (
        <ProjectCard item={item} key={item.id} />
      ))}
    </div>
  );
};

export default Projects;
