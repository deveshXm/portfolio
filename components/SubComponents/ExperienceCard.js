import { useState, React, useRef } from "react";

const ExperienceCard = ({ item }) => {
  const [drop, setDrop] = useState(false);
  const contentEl = useRef();

  const handleClick = () => {
    setDrop(!drop);
  };
  return (
    <div className="space-y-4 text-xs md:text-sm mb-4 font-poppins transition duration-300 ">
      <div
        className={`w-[90vw] md:w-[60vw] transform duration-300 ${
          drop ? "bg-pink border-pink border-2" : "bg-grey border-2 border-white"
        } h-12 flex items-center justify-between rounded-md text-white font-medium px-2 sm:px-6 hover:cursor-pointer`}
        onClick={handleClick}
      >
        <div>{item.title}</div>
        <div className="flex items-center space-x-2">
          <div>{item.timeline}</div>
          <div className="text-center border-2 rounded-full px-2">
            {drop ? "~" : "+"}
          </div>
        </div>
      </div>
      <div
        ref={contentEl}
        className={` text-white bg-grey bg-opacity-80 rounded-md w-[90vw] md:w-[60vw] font-normal  transition-all ease-in-out overflow-hidden duration-300 border-2 border-white ${
          drop ? "" : "border-0"
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
                className="bg-lightblue text-black font-normal p-2 rounded-full"
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
