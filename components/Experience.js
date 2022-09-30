import React from "react";
import ExperienceCard from "./SubComponents/ExperienceCard";
import Data from "../data.json";

const Experience = () => {
  return (
    <div className="bg-[#1a191d] min-h-[120vh] h-fit flex pt-10 justify-center text-white">
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
