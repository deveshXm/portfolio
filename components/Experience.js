import React from "react";
import ExperienceCard from "./SubComponents/ExperienceCard";

const Experience = () => {
  return (
    <div className="bg-[#1a191d] h-screen flex items-center justify-center">
      <div className="w-fit mx-auto space-y-5">
        <ExperienceCard/>
        <ExperienceCard/>
      </div>
    </div>
  );
};

export default Experience;
