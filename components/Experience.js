import React from "react";
import ExperienceCard from "./SubComponents/ExperienceCard";
import Data from "../data.json";

const Experience = ({scroll}) => {
  return (
    <div ref={scroll} className="bg-[#1a191d] h-fit py-40 flex justify-center text-white">
      <div className="space-y-20">
        <h1 className="text-center text-5xl md:text-7xl lg:text-8xl font-semibold">
          Professional <br /> Experience
        </h1>
        <div className="flex justify-center pt-4">
          <div className="w-fit mx-auto space-y-5 ">
            {Data.Experience.map((item) => (
              <ExperienceCard item={item} key={item.id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experience;
