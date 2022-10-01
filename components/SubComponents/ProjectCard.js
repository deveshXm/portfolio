import React from "react";
import Image from "next/image";

const ProjectCard = ({ item }) => {
  return (
    <div className="bg-[#201f23] rounded-lg hover:bg-[#512dbf] transition duration-300 hover:cursor-pointer">
      <a href={item.link}>
        <img src={item.image} alt="image" />
        <div className="text-lg font-normal py-4 text-center">
          <p>{item.title}</p>
        </div>
      </a>
    </div>
  );
};

export default ProjectCard;
