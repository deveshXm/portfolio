import React from "react";

const ProjectCard = ({item}) => {
  const myloader = ({ src }) => {
    return src;
  };

  return (
    <div className="bg-[#201f23] rounded-lg hover:bg-[#512dbf] transition duration-300 hover:cursor-pointer">
        <img
          loader={myloader}
          src={item.image}
          alt="image"
        />
      <div className="text-lg font-normal py-4 text-center">
        <p>{item.title}</p>
      </div>
    </div>
  );
};

export default ProjectCard;
