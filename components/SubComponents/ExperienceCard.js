import { useState, React, useRef } from "react";

const ExperienceCard = ({ item }) => {
  const [drop, setDrop] = useState(false);
  const contentEl = useRef();

  const handleClick = () => {
    setDrop(!drop);
  };
  return (
    <div className="space-y-4 text-sm md:text-sm mb-4">
      <div
        className={`w-[90vw] md:w-[60vw] transform duration-300 ${
          drop ? "bg-purple-900" : "bg-purple-600"
        } h-12 flex items-center justify-between rounded-md text-white font-medium px-2 sm:px-6 hover:cursor-pointer`}
        onClick={handleClick}
      >
        <div>{item.title}</div>
        <div className="flex items-center space-x-2">
          <div>{item.timeline}</div>
          <div className="hover:text-[#61c4d9] text-center ">
            {drop ? "-" : "+"}
          </div>
        </div>
      </div>
      <div
        ref={contentEl}
        className={`bg-[#241d41] text-white rounded-md w-[90vw] md:w-[60vw] font-normal transition-height ease-in-out overflow-hidden duration-300${
          drop ? "" : ""
        }`}
        style={
          drop ? { height: contentEl.current.scrollHeight } : { height: "0px" }
        }
      >
        <div className="p-4">
          <div>{item.about}</div>
          <div className="flex space-x-2 mt-4">
            {item.stack.map((tech) => (
              <div
                key={tech}
                className="bg-blue-800 font-normal p-2 rounded-full"
              >
                {tech}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceCard;
